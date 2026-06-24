/**
 * Copies admin/faculty screens from trading-app to admin-faculty-portal
 * and transforms them to be fully responsive:
 *  - strips fixed w-[1280px] h-[800px] wrappers
 *  - makes sidebar hidden on mobile (hidden md:flex)
 *  - adds hamburger button in header for mobile
 *  - wraps h-screen containers correctly
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../artifacts/trading-app/src/screens");
const destDir = path.join(__dirname, "../artifacts/admin-faculty-portal/src/screens");

const ADMIN_FILES = [
  "AdminLogin.tsx",
  "AdminDashboard.tsx",
  "StudentManagement.tsx",
  "AdminStudentDetail.tsx",
  "BatchCourseManagement.tsx",
  "AdminBatchCreate.tsx",
  "AdminCourseBuilder.tsx",
  "AdminLiveClass.tsx",
  "AdminReports.tsx",
  "AdminAnnouncements.tsx",
  "AdminFaculty.tsx",
  "AdminAssignmentReview.tsx",
  "AdminAssignmentCreator.tsx",
  "AdminQuizResults.tsx",
  "AdminQuizBuilder.tsx",
  "AdminNotificationCenter.tsx",
  "AdminCertificateManagement.tsx",
  "AdminAttendanceDetail.tsx",
];

const FACULTY_FILES = [
  "FacultyLogin.tsx",
  "FacultyDashboard.tsx",
  "FacultyUploadLecture.tsx",
  "FacultyCreateQuiz.tsx",
  "FacultyCreateAssignment.tsx",
  "FacultyScheduleLive.tsx",
  "FacultyAttendance.tsx",
  "FacultyStudentProgress.tsx",
];

const ALL_FILES = [...ADMIN_FILES, ...FACULTY_FILES];

function transform(content, filename) {
  const isLogin = filename.includes("Login");

  // 1. Strip fixed w-[1280px] and h-[800px] from root wrappers
  content = content.replace(/\bw-\[1280px\]/g, "w-full");
  content = content.replace(/\bh-\[800px\]/g, "min-h-screen");
  content = content.replace(/\bw-\[520px\]\b/g, "w-full md:w-[520px]");

  // 2. Fix h-screen overflow-hidden root div — keep but ensure it's w-full
  // Root flex container: make it take full viewport
  content = content.replace(
    /className="flex h-screen overflow-hidden([^"]*?)"/g,
    (match, rest) => `className="flex h-screen overflow-hidden${rest} w-full"`
  );

  // 3. Make sidebar responsive — add hidden and md:flex
  // Pattern: <aside className="w-60 flex flex-col flex-shrink-0"
  content = content.replace(
    /(<aside\s+className=")([^"]*?w-60[^"]*?flex flex-col[^"]*?)(")/g,
    (match, pre, cls, post) => {
      // add 'hidden md:flex' before existing classes
      if (!cls.includes("hidden md:flex")) {
        return `${pre}hidden md:flex ${cls}${post}`;
      }
      return match;
    }
  );

  // 4. Add MenuIcon import if not present (for hamburger button)
  if (!content.includes("Menu,") && !content.includes("Menu }") && !content.includes('"Menu"')) {
    content = content.replace(
      /import \{/,
      `import { Menu, X,`
    );
  }

  // 5. Add useState import for mobile menu state (if not already there)
  if (!content.includes("useState")) {
    content = content.replace(
      /import \{ useLocation \} from "wouter";/,
      `import { useState } from "react";\nimport { useLocation } from "wouter";`
    );
  }

  // 6. Add mobile hamburger state inside export function
  const exportFnRegex = /export function \w+\(\)\s*\{/;
  if (!isLogin) {
    content = content.replace(exportFnRegex, (match) => {
      return `${match}\n  const [mobileOpen, setMobileOpen] = useState(false);`;
    });
  }

  // 7. Add hamburger button to header (after first <header ... tag opening)
  if (!isLogin) {
    content = content.replace(
      /(<header[^>]*>)/,
      `$1\n        <button className="md:hidden p-2 rounded-lg mr-2" style={{ background: "rgba(255,255,255,0.05)" }} onClick={() => setMobileOpen(v => !v)}><Menu className="w-5 h-5" style={{ color: "#94A3B8" }} /></button>`
    );

    // 8. Add mobile overlay sidebar before </aside>
    content = content.replace(
      /(<\/aside>)/,
      `$1\n      {/* Mobile sidebar overlay */}\n      {mobileOpen && (\n        <div className="fixed inset-0 z-50 flex md:hidden">\n          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />\n          <aside className="relative z-50 w-72 flex flex-col h-full" style={{ background: "#111827", borderRight: "1px solid #1F2937" }}>\n            <div className="px-5 py-4 flex items-center justify-between">\n              <p className="font-bold text-white">TradeCoach</p>\n              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>\n            </div>\n            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">\n              {navItems && navItems.map((item) => (\n                <button key={item.label} onClick={() => { item.path && navigate(item.path); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: "#94A3B8" }}>\n                  {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}\n                  {item.label}\n                </button>\n              ))}\n            </nav>\n          </aside>\n        </div>\n      )}`
    );
  }

  // 9. For login screens: make them responsive (stack vertically on mobile)
  if (isLogin) {
    // Remove fixed flex row on login (left panel + right panel)
    content = content.replace(
      /(<div\s+className=")flex overflow-hidden([^"]*?)(")/,
      `$1flex flex-col md:flex-row overflow-hidden min-h-screen$3`
    );
    // Make left panel full width on mobile
    content = content.replace(/w-\[520px\] flex-shrink-0/g, "w-full md:w-[480px] md:flex-shrink-0");
  }

  // 10. Make grids responsive
  content = content.replace(/grid-cols-4/g, "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4");
  content = content.replace(/grid-cols-3(?!\s+gap)/g, "grid-cols-1 md:grid-cols-3");

  // col-span-2 should still work
  content = content.replace(/col-span-2/g, "col-span-1 md:col-span-2");

  return content;
}

fs.mkdirSync(destDir, { recursive: true });

let count = 0;
for (const file of ALL_FILES) {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (!fs.existsSync(src)) {
    console.log(`  SKIP (not found): ${file}`);
    continue;
  }
  const original = fs.readFileSync(src, "utf-8");
  const transformed = transform(original, file);
  fs.writeFileSync(dest, transformed, "utf-8");
  console.log(`  ✓ ${file}`);
  count++;
}

console.log(`\nCopied and transformed: ${count} files`);
