import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screensDir = path.join(__dirname, "../artifacts/trading-app/src/screens");

// Admin nav paths by label
const ADMIN_NAV_PATHS = {
  "Dashboard": "/admin/dashboard",
  "Students": "/admin/students",
  "Faculty": "/admin/faculty",
  "Batches": "/admin/batches",
  "Courses": "/admin/courses",
  "Schedule": "/admin/live",
  "Notifications": "/admin/notifications",
  "Certificates": "/admin/certificates",
  "Reports": "/admin/reports",
  "Assignments": "/admin/assignments",
  "Quiz": "/admin/quiz/results",
  "Quiz Builder": "/admin/quiz/builder",
  "Attendance": "/admin/attendance",
  "Live Classes": "/admin/live",
};

// Faculty nav paths by label
const FACULTY_NAV_PATHS = {
  "Dashboard": "/faculty/dashboard",
  "My Batches": "/faculty/dashboard",
  "Upload Lecture": "/faculty/upload",
  "Create Quiz": "/faculty/quiz",
  "Assignments": "/faculty/assignment",
  "Live Session": "/faculty/live",
  "Attendance": "/faculty/attendance",
  "Progress": "/faculty/progress",
  "Notifications": "/faculty/dashboard",
  "Student Progress": "/faculty/progress",
};

// Student nav paths by label
const STUDENT_NAV_PATHS = {
  "Home": "/home",
  "Courses": "/course",
  "Schedule": "/schedule",
  "Progress": "/progress",
  "Profile": "/profile",
};

function isAdminScreen(filename) {
  return filename.startsWith("Admin") || filename === "StudentManagement" || filename === "BatchCourseManagement";
}

function isFacultyScreen(filename) {
  return filename.startsWith("Faculty");
}

function isStudentScreen(filename) {
  return !isAdminScreen(filename) && !isFacultyScreen(filename);
}

function getNavPaths(filename) {
  if (isAdminScreen(filename)) return ADMIN_NAV_PATHS;
  if (isFacultyScreen(filename)) return FACULTY_NAV_PATHS;
  return STUDENT_NAV_PATHS;
}

function addNavigation(filename, content) {
  const name = filename.replace(".tsx", "");

  // Skip already-navigated screens
  if (content.includes("useLocation")) {
    console.log(`  SKIP (already has useLocation): ${filename}`);
    return content;
  }

  let modified = content;

  // 1. Add wouter import after the last import line
  const importBlock = 'import { useLocation } from "wouter";';
  // Find the last import statement
  const lastImportMatch = modified.match(/^import .+;?\s*$/gm);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    const lastIdx = modified.lastIndexOf(lastImport);
    const insertAt = lastIdx + lastImport.length;
    modified = modified.slice(0, insertAt) + "\n" + importBlock + modified.slice(insertAt);
  }

  // 2. Add useLocation hook inside the export function
  // Find `export function XxxScreen() {` or `export function Xxx() {`
  const fnMatch = modified.match(/export function \w+\(\)\s*\{/);
  if (fnMatch) {
    const fnIdx = modified.indexOf(fnMatch[0]) + fnMatch[0].length;
    const hookLine = "\n  const [, navigate] = useLocation();";
    modified = modified.slice(0, fnIdx) + hookLine + modified.slice(fnIdx);
  }

  // 3. Add paths to navItems - for admin/faculty screens
  const navPaths = getNavPaths(name);

  if (isAdminScreen(name) || isFacultyScreen(name)) {
    // Replace navItems objects to add path property
    // Pattern: { icon: XxxIcon, label: "Dashboard", active: true }
    // Or: { icon: XxxIcon, label: "Dashboard" }
    modified = modified.replace(
      /\{\s*icon:\s*(\w+),\s*label:\s*"([^"]+)"(,\s*active:\s*\w+)?\s*\}/g,
      (match, icon, label, activeStr) => {
        const p = navPaths[label];
        const pathStr = p ? `, path: "${p}"` : "";
        const activeOut = activeStr || "";
        return `{ icon: ${icon}, label: "${label}"${activeOut}${pathStr} }`;
      }
    );

    // 4. Add onClick to sidebar nav button rendering
    // Pattern for admin: button key={item.label} className="w-full ...
    modified = modified.replace(
      /(<button\s+key=\{item\.label\}\s+className="[^"]*"[^>]*>)/g,
      (match) => {
        if (match.includes("onClick")) return match;
        return match.replace(
          /(<button\s+key=\{item\.label\})/,
          `<button key={item.label} onClick={() => item.path && navigate(item.path)}`
        ).replace(/<button\s+key=\{item\.label\}\s+onClick=.*?key=\{item\.label\}.*?onClick/, '<button key={item.label} onClick');
      }
    );

    // Also handle the style= form specifically
    // Old: <button key={item.label} className="..." style={...}>
    // New: <button key={item.label} onClick={() => item.path && navigate(item.path)} className="..." style={...}>
    modified = modified.replace(
      /(<button key=\{item\.label\} className=)/g,
      (match) => `<button key={item.label} onClick={() => item.path && navigate(item.path)} className=`
    );

    // Add back navigation for screens with ChevronLeft/back buttons
    if (content.includes("ChevronLeft")) {
      const backPath = isAdminScreen(name) ? "/admin/dashboard" : "/faculty/dashboard";
      modified = modified.replace(
        /(<button[^>]*>)\s*(<ChevronLeft[^/]*\/>)/g,
        `<button onClick={() => navigate("${backPath}")} style={{ cursor: "pointer" }}>$2`
      );
    }
  }

  if (isStudentScreen(name)) {
    // Add paths to student navItems
    modified = modified.replace(
      /\{\s*icon:\s*(\w+),\s*label:\s*"([^"]+)",\s*path:\s*"([^"]+)",?\s*active:\s*(\w+)\s*\}/g,
      (match) => match // already has path, keep as is
    );

    // Add onClick to student bottom nav buttons
    modified = modified.replace(
      /(<button\s+key=\{item\.label\}\s+className=)/g,
      (match) => `<button key={item.label} onClick={() => item.path && navigate(item.path)} className=`
    );

    // Add back navigation for screens with ChevronLeft
    if (content.includes("ChevronLeft")) {
      modified = modified.replace(
        /(<button[^>]*onClick[^>]*>)\s*(<ChevronLeft)/g,
        (m) => m // already has onClick, skip
      );
      // Add onClick to back buttons that don't have one
      modified = modified.replace(
        /(<button(?![^>]*onClick)[^>]*>)\s*(<ChevronLeft[^/]*\/>)/g,
        `<button onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}>$2`
      );
    }
  }

  return modified;
}

// Process all screen files
const files = fs.readdirSync(screensDir).filter(f => f.endsWith(".tsx"));
let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(screensDir, file);
  const original = fs.readFileSync(filePath, "utf-8");
  const modified = addNavigation(file, original);

  if (modified !== original) {
    fs.writeFileSync(filePath, modified, "utf-8");
    console.log(`  UPDATED: ${file}`);
    updated++;
  } else {
    skipped++;
  }
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
