---
name: App Context — Trading Coaching App
description: Full product context for the Trading Coaching Academy mobile app and admin panel design project. Read this before any new screen design session.
---

# ⚠️ MANDATORY UPDATE RULE

> **Update this file at the end of EVERY session, after EVERY screen designed, and after EVERY decision made.**
>
> This is the single source of truth for the project. If something changed — a screen was added, a pending item was completed, a client decision was made, a design rule was established — it must be recorded here immediately.
>
> No exceptions. A stale context is worse than no context.
>
> What to update each time:
> - Move completed screens from "Pending" → "Designed" table
> - Add new screens to the inventory if introduced
> - Record any client decisions (especially on Payment/Wallet/Mock Trading)
> - Add any new design rules or conventions discovered
> - Update the "Last Updated" date at the bottom of this file

---

# App Context — Trading Coaching Academy App

## What This Project Is

A **trading education coaching app** (Android-only at launch) for an academy that teaches stock market / trading skills. Students register, get manually assigned to a batch by the admin, and then access their batch's content. There is **no self-serve payment gateway** — all enrollment is admin-managed.

**Why:** Reduce friction for students, centralize batch management, prevent content leaks, and motivate students with gamification.

---

## Tech Stack (Final Target)

| Layer | Tech |
|---|---|
| Mobile App | Flutter (Android only) |
| State Management | Riverpod |
| Backend / DB | Firebase (Firestore) |
| Auth | Firebase Authentication |
| Push Notifications | Firebase Cloud Messaging |
| Videos | YouTube Unlisted (embedded, hidden URLs) |
| Admin Panel | Flutter Web |
| Analytics | Firebase Analytics |
| Crash Reporting | Firebase Crashlytics |

**Note:** Current design work is done as React mockups on the Replit canvas mockup sandbox. These are UI blueprints — not final code.

---

## Three User Roles

### 1. Admin
Full system control: manage students, faculty, batches, courses, quizzes, assignments, certificates, announcements, push notifications, live class scheduling, attendance monitoring, analytics, suspend accounts.

### 2. Faculty
Content management only: upload lectures, notes, assignments, quizzes, schedule live sessions, view student progress and attendance. **Cannot** manage students/faculty, assign batches, or issue certificates.

### 3. Student
Consumer role: watch lectures, join live classes, download notes, submit assignments, attempt quizzes, view attendance/calendar, receive notifications, download certificates.

---

## Registration & Access Flow

```
Student registers (Name, Mobile, Email, DOB, Gender, Address, Parent info)
        ↓
Account created → Status: "Pending Batch Assignment"
        ↓
Admin assigns student to a Batch (e.g., Advanced Trading Batch A)
        ↓
Course access unlocked automatically
```

---

## Course Structure

```
Course
├── Lectures (YouTube Unlisted embedded)
├── Notes (PDF / PPT / DOCX download)
├── Assignments (download → complete → upload PDF/Image)
└── Quizzes (MCQ, timed, auto-evaluated)
```

---

## Key Systems

| System | Details |
|---|---|
| Attendance | Auto: watch ≥80% lecture = Present, <80% = Absent |
| Quiz | MCQ, timer, auto-eval, instant result, score tracking |
| Assignments | Faculty uploads → student downloads + uploads submission → faculty reviews + marks |
| Live Class | YouTube Live Unlisted → faculty pastes link → students join inside app |
| Certificates | Admin uploads/generates → student views + downloads |
| Notifications | FCM: new lecture, assignment, quiz, attendance update, live reminder, certificate issued, announcements |
| Leaderboard | Weekly/Monthly/All-Time — ranked by quiz scores, attendance %, assignment completion, streak |

---

## Security Requirements (Android)

- Single Device Login + Force Logout
- FLAG_SECURE (screenshot protection)
- Screen Recording Detection
- Root / Emulator / USB Debugging Detection
- SSL Pinning + Tamper Detection
- R8 Obfuscation
- Batch Access Validation (students see ONLY their batch)
- Hidden YouTube URLs

---

## Design System (Mockup Standard)

All screens use the same tokens:
- **Background:** `#F8FAFC`
- **Card:** `#FFFFFF`
- **Navy Header:** `#0F172A`
- **Primary Blue:** `#2563EB`
- **Emerald:** `#10B981`
- **Amber:** `#F59E0B`
- **Muted:** `#94A3B8`
- **Border:** `#E2E8F0`
- **Font:** Poppins
- **Frame size:** 390×844 (standard mobile)

---

## Screens Designed (54 Total as of June 24, 2026)

> **Last updated:** June 24, 2026 — 54 SCREENS FINAL. Removed 5 screens (client decision): Payment, PaymentSuccess, StudentWallet, MockTrading, DoubtQA. NotesPdfViewer confirmed: in-app viewing. All spec clarifications resolved.

### Student App — Designed (28 screens)

| # | Screen | Description |
|---|---|---|
| 1 | Onboarding / Splash | App intro slides + get started |
| 2 | Login / Welcome | Email+password, Google login, links to register/forgot |
| 3 | OTP Verification | Email OTP 6-digit entry |
| 4 | Student Registration | Full multi-field registration form |
| 5 | Forgot Password | Email input to trigger reset |
| 6 | Reset Password | New password + confirm |
| 7 | Student Home | Dashboard with stats, live banner, continue learning, upcoming |
| 8 | Pending Batch Assignment | Screen shown when account created but batch not assigned yet |
| 9 | Course Detail & Enroll | Course overview, modules list, enroll CTA |
| 10 | Course Player | YouTube-embedded lecture player with progress tracking |
| 11 | Assignment Submission | View assignment, upload PDF/image, submission status |
| 12 | Quiz Flow | MCQ quiz with timer, progress, instant result |
| 13 | Quiz Results Detail | Post-quiz breakdown: per-question review, score ring, correct answers, explanations, rank, batch comparison |
| 14 | Attendance View | Monthly calendar + lecture-by-lecture attendance log |
| 15 | Live Class | YouTube Live embed inside app with chat |
| 16 | Live Class Waiting Room | Pre-class countdown + class details |
| 17 | Schedule / Timetable | Weekly calendar view of lectures, quizzes, live classes |
| 18 | Notifications | Push notification inbox with read/unread states |
| 19 | Student Profile | Personal info, batch info, edit profile |
| 20 | Progress & Analytics | Overall %, quiz chart, module progress, leaderboard preview |
| 21 | Notes & Downloads | PDF/PPT/DOCX download list with view/download actions, locked module indicator |
| 22 | App Settings | Account, notifications, security, privacy, logout |
| 23 | Certificate | View + download earned certificates |
| 24 | Leaderboard | Weekly/Monthly rankings, podium, badges, "How to climb" tips |
| 25 | Google Sign-In Flow | Google account picker, OAuth consent, permission disclosure |
| 26 | Account Deletion | Warning, what's deleted, alternatives, DELETE confirm (Play Store compliant) |
| 27 | Privacy Policy | Collapsible sections, contact info, T&C link (Play Store compliant) |
| 28 | Notes PDF Viewer | In-app dark viewer, page nav, zoom, bookmark, download/share bar ✅ in-app viewing confirmed |

### Admin Panel — Designed (15 screens)

| # | Screen | Description |
|---|---|---|
| 1 | Admin Login ✅ NEW | Secure admin login with 2FA notice, restricted access branding |
| 2 | Admin Dashboard | KPIs: students, faculty, batches, attendance summary |
| 3 | Student Management | Student list, search/filter, batch assignment, suspend |
| 4 | Batch & Course Management | Batch list, create/edit batch, assign students |
| 5 | Admin Reports & Analytics | Attendance, quiz, activity reports with charts |
| 6 | Admin Announcements | Create and send batch announcements |
| 7 | Admin Faculty Management | Add/remove faculty, manage permissions |
| 8 | Admin Course Builder | Upload lectures, notes, create modules |
| 9 | Admin Student Detail | Individual student profile, activity, attendance |
| 10 | Admin Batch Creation | New batch wizard |
| 11 | Admin Live Class Management | Schedule + manage YouTube live links |
| 12 | Admin Assignment Review | Review student submissions, give marks |
| 13 | Admin Quiz Results | Batch-wide quiz result analytics |
| 14 | Admin Notification Center ✅ NEW | FCM push compose + templates + history with delivery/read stats |
| 15 | Admin Certificate Management ✅ NEW | Issue/generate/upload certificates, per-student status, preview |

### Faculty Portal — Designed (8 screens) ✅ COMPLETE

| # | Screen | Canvas ID | Description |
|---|---|---|---|
| F1 | Faculty Login | faculty-login | Teal-themed login, academy branding, security notice |
| F2 | Faculty Dashboard | faculty-dashboard | Batch overview, stats, pending tasks, activity feed |
| F3 | Faculty Upload Lecture | faculty-upload-lecture | YouTube URL input, module selector, notes attach, preview |
| F4 | Faculty Create Quiz | faculty-create-quiz | MCQ builder, per-question marks, correct answer setter, checklist |
| F5 | Faculty Create Assignment | faculty-create-assignment | Title, deadline, marks, instructions, PDF upload, checklist |
| F6 | Faculty Schedule Live | faculty-schedule-live | Schedule YouTube Live, upcoming sessions, past session history |
| F7 | Faculty Attendance | faculty-attendance | Lecture-by-lecture watch % table, per-student override, auto-tracking |
| F8 | Faculty Student Progress | faculty-student-progress | Ranked table, quiz trend chart, at-risk student alerts |

### Admin Panel — Designed (continued, 18 screens total)

| # | Screen | Canvas ID | Description |
|---|---|---|---|
| A1–A12 | (listed above) | (listed above) | — |
| A13 | Admin Login | admin-login | Restricted-access branding, 2FA notice, security badges |
| A14 | Admin Notification Center | admin-notification-center | FCM composer, templates, delivery/read stats history |
| A15 | Admin Certificate Management | admin-certificate-management | Issue/generate/upload certificates, per-student status, preview |
| A16 | Admin Quiz Builder ✅ NEW | admin-quiz-builder | MCQ builder with timer, marks, correct-answer setter, batch target, publish checklist |
| A17 | Admin Assignment Creator ✅ NEW | admin-assignment-creator | Title, batch, marks, deadline, brief PDF upload, notification toggle, publish |
| A18 | Admin Attendance Detail ✅ NEW | admin-attendance-detail | Per-student drill-down: lecture watch %, live class, override with reason |

### Student App — Designed (continued, 33 screens total)

| # | Screen | Canvas ID | Description |
|---|---|---|---|
| S1–S29 | (listed above) | (listed above) | — |
| S30 | Google Sign-In Flow ✅ NEW | mobile-google-signin | Google account picker, OAuth consent, permission disclosure, back to email fallback |
| S31 | Account Deletion ✅ NEW | mobile-account-deletion | Warning, what's deleted, alternatives, DELETE confirm, Play Store compliant |
| S32 | Privacy Policy ✅ NEW | mobile-privacy-policy | Collapsible sections, contact info, T&C link, Play Store compliant |
| S33 | Notes PDF Viewer ✅ NEW | mobile-notes-pdf-viewer | Dark viewer, page nav, zoom, bookmark, simulated PDF content, download/share bar |

### Canvas Layout Map (Current — Live Interactive Prototype)

> **Updated June 24, 2026** — All 54 screens now live on canvas as interactive iframe cards.
> Running via `artifacts/trading-app` (React + Vite + Wouter), port 20013, base path `/trading-app/`

| Area | X range | Y range | Screen size | Shape IDs |
|---|---|---|---|---|
| Admin Panel (18 screens) | 0 to 2680 | 0 to 4400 | 1280×800 | admin-login…admin-attendance |
| Faculty Portal (8 screens) | 4100 to 6780 | 0 to 1720 | 1280×800 | faculty-login…faculty-progress |
| Student App (28 screens) | 0 to 1350 | 5600 to 13000 | 390×844 | student-onboarding…student-privacy |

### Workflow

| Setting | Value |
|---|---|
| Workflow name | Trading App |
| Command | `PORT=20013 BASE_PATH=/trading-app/ pnpm --filter @workspace/trading-app run dev` |
| URL base | `https://<domain>/trading-app` |

---

## ✅ ALL 54 SCREENS FINAL — Fully Interactive

> Finalised June 24, 2026. All screens live with navigation. No pending design or dev work.

### Interactivity Status

| Feature | Status |
|---|---|
| All 54 screens rendered as live iframes on canvas | ✅ Done |
| Admin sidebar navigation (18 screens) | ✅ Done — onClick handlers on all nav items |
| Faculty sidebar navigation (8 screens) | ✅ Done — onClick handlers on all nav items |
| Student bottom nav (28 screens) | ✅ Done — onClick handlers on all nav items |
| Back button navigation (ChevronLeft) | ✅ Done — navigate(-1) or navigate to parent |
| Login → Home flow | ✅ Done |
| Admin Login → Admin Dashboard | ✅ Done |
| Faculty Login → Faculty Dashboard | ✅ Done |
| Screen-to-screen flows (quiz, assignment, live, etc.) | ✅ Done |

### Client Decisions

| Decision | Outcome |
|---|---|
| Payment & Checkout, Payment Success, Student Wallet | ❌ REMOVED — client confirmed no payment gateway |
| Mock Trading / Paper Trade | ❌ REMOVED — client confirmed not in scope |
| Doubt & Q&A | ❌ REMOVED — client confirmed not in scope |
| Notes PDF Viewer | ✅ KEPT — confirmed in-app viewing |
| Admin & Faculty | ✅ Web app (React, 1280×800) |
| Student | ✅ Android app (Flutter target, React mockup 390×844) |

## Screens Pending Design / Dev

### ✅ NONE — All 54 screens complete, interactive, and live on canvas!

---

## Important Rules for All Future Design Work

- Always match the design system tokens above.
- Every screen must have the status bar, navy header (or appropriate header), content area, and bottom nav (student) or sidebar (admin).
- Student screens: 390×844px, Poppins font.
- All data is realistic (Indian names, trading topics, realistic scores).
- Never design screens with placeholder "Lorem ipsum" — use real trading context.
- Screens must show the logged-in student as "Rahul Sharma" in demos.
- Faculty name in demos: "Dr. Anand Kumar".
- Batch name: "Advanced Trading Batch A".
