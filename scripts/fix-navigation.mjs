import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screensDir = path.join(__dirname, "../artifacts/trading-app/src/screens");

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

const STUDENT_NAV_PATHS = {
  "Home": "/home",
  "Courses": "/course",
  "Schedule": "/schedule",
  "Progress": "/progress",
  "Profile": "/profile",
};

function isAdminScreen(n) { return n.startsWith("Admin") || n === "StudentManagement" || n === "BatchCourseManagement"; }
function isFacultyScreen(n) { return n.startsWith("Faculty"); }

function processFile(filename, content) {
  const name = filename.replace(".tsx", "");

  // Fix: first remove any misplaced wouter imports (inside multi-line import blocks)
  // Pattern: "import {\nimport { useLocation } from "wouter";\n  xxx" -> fix it
  content = content.replace(/^(import \{)\nimport \{ useLocation \} from "wouter";\n/m, "$1\n");
  // Also remove duplicate wouter imports
  const wouterImport = 'import { useLocation } from "wouter";';
  const count = (content.match(/import \{ useLocation \} from "wouter";/g) || []).length;
  if (count > 1) {
    // Remove all then re-add once in right place
    content = content.replace(/import \{ useLocation \} from "wouter";\n/g, "");
  }

  // Find the end of all import statements (last `} from "..."` or `import "..."` or `import x from "..."`)
  // Strategy: find the position after the last import statement
  // Find all import blocks
  const lines = content.split("\n");
  let lastImportLineIdx = -1;
  let inMultilineImport = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("import ") && !inMultilineImport) {
      if (line.includes("{") && !line.includes("}")) {
        inMultilineImport = true;
      } else {
        lastImportLineIdx = i;
      }
    } else if (inMultilineImport) {
      if (line.includes("} from")) {
        lastImportLineIdx = i;
        inMultilineImport = false;
      }
    }
  }

  // Check if wouter is already imported correctly
  const hasWouterImport = content.includes(wouterImport);

  if (!hasWouterImport && lastImportLineIdx >= 0) {
    lines.splice(lastImportLineIdx + 1, 0, wouterImport);
    content = lines.join("\n");
  }

  // Add useLocation hook inside the export function if not already there
  if (!content.includes("useLocation()")) {
    content = content.replace(
      /(export function \w+\(\)\s*\{)/,
      `$1\n  const [, navigate] = useLocation();`
    );
  }

  // Add path to navItems for admin/faculty
  if (isAdminScreen(name) || isFacultyScreen(name)) {
    const navPaths = isAdminScreen(name) ? ADMIN_NAV_PATHS : FACULTY_NAV_PATHS;
    // Match navItem objects: { icon: X, label: "Y", active: bool } or { icon: X, label: "Y" }
    content = content.replace(
      /\{\s*icon:\s*(\w+),\s*label:\s*"([^"]+)"(,\s*active:\s*\w+)?\s*\}/g,
      (match, icon, label, activeStr) => {
        const p = navPaths[label];
        if (!p) return match; // keep as is if no path known
        const pathStr = `, path: "${p}"`;
        const activeOut = activeStr || "";
        return `{ icon: ${icon}, label: "${label}"${activeOut}${pathStr} }`;
      }
    );

    // Add onClick to sidebar nav buttons (pattern: key={item.label} without onClick)
    content = content.replace(
      /(<button\s+key=\{item\.label\}(?![^>]*onClick)[^>]*>)/g,
      `<button key={item.label} onClick={() => item.path && navigate(item.path)} `
    );
    // Clean up the duplicate "button key= button key=" patterns from double replacement
    content = content.replace(/<button key=\{item\.label\} onClick=[^}]*\}\) <button key=\{item\.label\}[^>]*>/g, (m) => {
      return m.split(" <button key")[0] + ">";
    });

    // Add back button navigation (ChevronLeft buttons without onClick)
    const backPath = isAdminScreen(name) ? "/admin/dashboard" : "/faculty/dashboard";
    content = content.replace(
      /(<(?:button|div)[^>]*style=\{[^}]*cursor[^}]*\}[^>]*>|<(?:button|div)[^>]*>)\s*(<ChevronLeft\b)/g,
      (match, tag, chevron) => {
        if (match.includes("onClick")) return match;
        const fixedTag = tag.replace(/<(button|div)/, `<$1 onClick={() => navigate("${backPath}")} style={{ cursor: "pointer" }}`);
        return `${fixedTag}${chevron}`;
      }
    );
  }

  // Add student bottom nav paths (if screen has navItems but no paths)
  if (!isAdminScreen(name) && !isFacultyScreen(name)) {
    // Add paths to student navItems that don't have them yet
    content = content.replace(
      /\{\s*icon:\s*(\w+),\s*label:\s*"([^"]+)",\s*(?!path:)active:\s*(\w+)\s*\}/g,
      (match, icon, label, active) => {
        const p = STUDENT_NAV_PATHS[label];
        if (!p) return match;
        return `{ icon: ${icon}, label: "${label}", path: "${p}", active: ${active} }`;
      }
    );
    // Also pattern without active field
    content = content.replace(
      /\{\s*icon:\s*(\w+),\s*label:\s*"([^"]+)"\s*\}/g,
      (match, icon, label) => {
        const p = STUDENT_NAV_PATHS[label];
        if (!p) return match;
        return `{ icon: ${icon}, label: "${label}", path: "${p}" }`;
      }
    );

    // Add onClick to bottom nav buttons without it
    content = content.replace(
      /(<button\s+key=\{item\.label\}(?![^>]*onClick)[^>]*>)/g,
      `<button key={item.label} onClick={() => item.path && navigate(item.path)} `
    );

    // Add navigate to back/ChevronLeft buttons
    content = content.replace(
      /(<(?:button|div)(?![^>]*onClick)[^>]*>)\s*(<ChevronLeft\b)/g,
      (match, tag, chevron) => {
        const fixedTag = tag.replace(/<(button|div)/, `<$1 onClick={() => navigate(-1 as any)} style={{ cursor: "pointer" }}`);
        return `${fixedTag}\n        ${chevron}`;
      }
    );
  }

  return content;
}

const files = fs.readdirSync(screensDir).filter(f => f.endsWith(".tsx"));
let updated = 0;

for (const file of files) {
  const filePath = path.join(screensDir, file);
  const original = fs.readFileSync(filePath, "utf-8");
  const modified = processFile(file, original);
  if (modified !== original) {
    fs.writeFileSync(filePath, modified, "utf-8");
    console.log(`  FIXED: ${file}`);
    updated++;
  }
}

console.log(`\nFixed: ${updated} files`);
