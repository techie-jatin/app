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

## Screens Designed (52 Total as of June 24, 2026)

> **Last updated:** June 24, 2026 — Added all 8 Faculty Portal screens + 3 Admin screens + 2 Student pending screens (13 new).

### Student App — Designed (29 screens)

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
| 13 | Quiz Results Detail ✅ NEW | Post-quiz breakdown: per-question review, score ring, correct answers, explanations, rank, batch comparison |
| 14 | Attendance View | Monthly calendar + lecture-by-lecture attendance log |
| 15 | Live Class | YouTube Live embed inside app with chat |
| 16 | Live Class Waiting Room | Pre-class countdown + class details |
| 17 | Schedule / Timetable | Weekly calendar view of lectures, quizzes, live classes |
| 18 | Notifications | Push notification inbox with read/unread states |
| 19 | Student Profile | Personal info, batch info, edit profile |
| 20 | Progress & Analytics | Overall %, quiz chart, module progress, leaderboard preview |
| 21 | Notes & Downloads ✅ NEW | PDF/PPT/DOCX download list with view/download actions, locked module indicator |
| 22 | Doubt & Q&A | Ask questions, browse answered doubts |
| 23 | App Settings | Account, notifications, security, privacy, logout |
| 24 | Certificate | View + download earned certificates |
| 25 | Payment & Checkout | Fee payment screen ⚠️ spec says no payment gateway — needs client sign-off |
| 26 | Payment Success | Payment confirmation ⚠️ see above |
| 27 | Mock Trading / Paper Trade | Virtual trading simulator (enhancement beyond spec) ⚠️ needs sign-off |
| 28 | Student Wallet & Transactions | Wallet balance + transaction history ⚠️ needs sign-off |
| 29 | Leaderboard | Weekly/Monthly rankings, podium, badges, "How to climb" tips |

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

### Canvas Layout Map

| Area | X range | Y range | Screen size |
|---|---|---|---|
| Admin Panel | -42 to 3920 | -1946 to 3000 | 1280×800 |
| Faculty Portal | 4400 to 8360 | -1946 to 1103 | 1280×800 |
| Student App | 14 to 4228 | 3306 to 8244 | 390×844 |

---

## Screens Pending Design

### Student App — Pending

| # | Screen | Priority | Notes |
|---|---|---|---|
| P3 | Google Sign-In Flow | MEDIUM | OAuth screen / redirect flow |
| P4 | Account Deletion | MEDIUM | Google Play Store required |
| P5 | Privacy Policy / T&C | MEDIUM | Google Play Store required |
| P6 | Notes PDF Viewer | MEDIUM | In-app PDF viewer (tap PDF → full screen reader) |

### Admin Panel — Pending

| # | Screen | Priority | Notes |
|---|---|---|---|
| A4 | Admin Quiz Builder | HIGH | Admin-side MCQ quiz creation (different from Faculty's) |
| A5 | Admin Assignment Creator | MEDIUM | Upload assignment brief, set deadline for any batch |
| A6 | Admin Attendance Detail | MEDIUM | Per-student attendance drill-down with override |

### Faculty Portal — ✅ ALL 8 COMPLETE

---

## Items That Need Spec Clarification

1. **Payment & Checkout / Wallet** — The original spec says "No payment gateway." The Payment and Wallet screens were designed as enhancements. Confirm with client whether fee collection will happen or not.
2. **Mock Trading** — Not in spec. Added as a premium engagement feature. Confirm if it stays.
3. **Doubt & Q&A** — Not explicitly in spec but aligned with coaching use case. Confirm.
4. **Notes viewer** — Spec lists PDF/PPT/DOCX but in-app viewing vs download-only is not specified.

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
