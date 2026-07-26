<div align="center">

<img src="img/favicon/web-app-manifest-192x192.png" width="96" alt="DBMS Digital Textbook logo" />

# DBMS Digital Textbook

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=22&duration=2600&pause=900&color=6F42C1&center=true&vCenter=true&width=720&lines=Premium+Digital+Engineering+Textbook;Complete+DBMS+Course+Roadmap;Built+for+Deep+Reading+and+Revision;Lightweight+HTML+CSS+JavaScript" alt="Typing animation" />

<p>
  A premium, syllabus-aligned digital textbook for Database Management System.
  Built as a focused learning platform for students who want one complete resource for reading, revision, practice, and exam preparation.
</p>

<p>
  <img src="https://img.shields.io/badge/Subject-DBMS-6f42c1?style=for-the-badge" alt="Subject DBMS" />
  <img src="https://img.shields.io/badge/Course-BCS501-0969da?style=for-the-badge" alt="Course BCS501" />
  <img src="https://img.shields.io/badge/Units-5-1a7f37?style=for-the-badge" alt="5 Units" />
  <img src="https://img.shields.io/badge/Chapters-18-9a6700?style=for-the-badge" alt="18 Chapters" />
  <img src="https://img.shields.io/badge/No_Framework-Lightweight-24292f?style=for-the-badge" alt="No Framework" />
</p>

</div>

---

## Overview

DBMS Digital Textbook is a browser-based educational project that turns the official DBMS syllabus into a structured, premium learning experience. It is designed like a serious engineering textbook: clear chapter progression, visual explanations, progress tracking, revision support, quizzes, and a roadmap that communicates the full course journey from start to finish.

The project intentionally stays lightweight. There is no build system, no frontend framework, no backend, and no database dependency. Everything runs with plain HTML, CSS, and JavaScript.

## Features

| Area | What it provides |
| --- | --- |
| Complete Course Roadmap | Five units and chapter cards generated from the official syllabus structure |
| Progress Dashboard | Overall course progress, reading progress, unit progress, completed chapters, remaining chapters, streak, and estimated hours |
| Premium Reading Experience | Long-form chapter layout, reading progress, sticky table of contents, callouts, examples, tables, and revision sections |
| Theme System | Independent light and dark palettes designed for calm, documentation-style reading |
| Local Persistence | Theme and progress are saved in `localStorage` |
| Responsive UI | Desktop, tablet, and mobile-friendly layout with hamburger navigation |
| Zero Backend | Works as a static project and can be hosted anywhere |

## Why This Project

Most student learning resources are scattered across notes, PDFs, videos, and websites. This project takes a different approach: one focused digital textbook that is complete enough to support semester study from one place.

The goal is not to look like a normal college project. The goal is to feel closer to a premium documentation platform and a carefully written engineering textbook.

## Screenshots

> Add updated screenshots after deployment or local capture.

| Homepage | Chapter Reading |
| --- | --- |
| Full-course roadmap, premium hero, and progress dashboard | Textbook-style chapter with reading tools and revision support |

## Live Demo

Add your hosted link here after deployment.

```text
https://your-live-demo-url.example
```

For local preview, open `index.html` directly or run a small static server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Folder Structure

```text
DBMS/
├── css/
│   ├── style.css
│   └── chapter.css
├── img/
│   └── favicon/
├── js/
│   ├── app.js
│   ├── chapter1.js
│   └── data.js
├── unit-1/
│   └── chapter1.html
├── index.html
├── syllabus.txt
└── README.md
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 with custom properties |
| Interactivity | Vanilla JavaScript |
| Storage | Browser `localStorage` |
| Content Source | `syllabus.txt` |
| Hosting | Static hosting compatible |

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd DBMS
```

Run a static server:

```bash
python -m http.server 8000
```

Open the course:

```text
http://localhost:8000
```

## Usage

1. Open `index.html`.
2. Review the full course roadmap.
3. Start with Chapter 1.
4. Use the chapter reading progress, table of contents, revision sections, quiz, and checklist.
5. Track progress from the homepage dashboard.
6. Switch between light and dark mode as preferred.

## Learning Philosophy

This project is built around a few strong learning principles:

- Begin with simple definitions before formal explanation.
- Explain why a concept exists, not just what it is.
- Use visual learning wherever it improves understanding.
- Keep examples close to real academic and practical scenarios.
- Support both deep reading and fast revision.
- Keep the interface quiet so the content remains the focus.

## Course Roadmap

| Unit | Focus Area |
| --- | --- |
| Unit I | Introduction, DBMS architecture, data models, schema, instances, data independence, languages, interfaces, ER modeling |
| Unit II | Relational data model, constraints, relational algebra, relational calculus, SQL, joins, views, triggers, procedures |
| Unit III | Functional dependencies, normal forms, decomposition, normalization, advanced dependencies |
| Unit IV | Transactions, serializability, recoverability, recovery, deadlocks, distributed databases |
| Unit V | Concurrency control, locking, timestamp protocols, validation, multiple granularity, multiversion schemes, Oracle case study |

## Future Plans

- Complete Chapter 2 and Chapter 3 for ER modeling.
- Add full textbook-quality content for every generated chapter.
- Add more interactive revision tools.
- Add downloadable revision summaries.
- Add richer practice sets and university-question drills.
- Add deployment screenshots and public demo link.

## Contribution Guide

Contributions should preserve the project philosophy:

- Keep the project lightweight.
- Do not add frameworks unless there is a strong reason.
- Keep `syllabus.txt` as the source of truth for course structure.
- Do not duplicate syllabus topics.
- Prefer readable, accessible, maintainable HTML, CSS, and JavaScript.
- Keep educational content beginner-friendly but exam-ready.

Suggested workflow:

```bash
git checkout -b improve/topic-name
```

Make focused changes, test locally, then open a pull request with:

- What changed
- Why it changed
- Screenshots for UI changes
- Any known limitations

## License

No license file is currently included. Add a `LICENSE` file before distributing or accepting external contributions.

## Author

**Harsh**

Portfolio: [https://lucifer01430.github.io/Portfolio](https://lucifer01430.github.io/Portfolio)

Harsh is building this project as a premium digital learning resource for DBMS, focused on clarity, depth, revision, and semester-exam readiness.

## Contact

For collaboration, feedback, or project discussion, reach out through the portfolio:

[Contact via Portfolio](https://lucifer01430.github.io/Portfolio)

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&height=2&color=gradient&customColorList=14,18,20" alt="" />

<strong>Built for focused DBMS learning, deep revision, and premium textbook-style study.</strong>

</div>
