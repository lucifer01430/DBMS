/* ============================================================
   CHAPTER 1 — INTERACTIVE LOGIC
   ============================================================ */

const CHAPTER_ID = 1;
const COLLAPSE_KEY = "dbms_course_ch1_collapsed_sections_v1";

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "What is the exact difference between a database and a DBMS?",
    a: "A database is the actual collection of data. A DBMS is the software you use to create, read, update and manage that data. People often say \"database\" when they mean the whole system, but in exams, keep the two separate."
  },
  {
    q: "Is a spreadsheet (like Excel) a database?",
    a: "A spreadsheet can hold data, but it isn't a full DBMS — it lacks strong constraint enforcement, concurrent multi-user access control, and a formal query language. It's closer to a very simple file system."
  },
  {
    q: "Which is harder to achieve: physical or logical data independence?",
    a: "Logical data independence is harder, because a change to the conceptual (logical) schema is more likely to affect what external views and application programs expect to see."
  },
  {
    q: "Is CREATE TABLE part of DDL or DML?",
    a: "DDL. CREATE, ALTER and DROP all define or change structure, so they belong to the Data Definition Language, not DML."
  },
  {
    q: "Does the schema change every time I add a new row?",
    a: "No. Adding a row changes the instance (the data), not the schema (the structure). The schema only changes when the structure itself changes, e.g. adding a new column."
  },
  {
    q: "Why do we need three levels of architecture instead of just one?",
    a: "One level would tie the way users see data directly to how it's physically stored — so any storage change (like adding an index) would force every application to be rewritten. Three levels let each layer change independently."
  },
  {
    q: "What exactly is an atomicity problem, in one line?",
    a: "It's when a multi-step operation (like a bank transfer) gets interrupted halfway, leaving the data in a broken, half-finished state. A DBMS treats such operations as a single indivisible transaction to avoid this."
  },
  {
    q: "Is the data dictionary the same thing as the database?",
    a: "No. The data dictionary stores metadata — information about the structure, such as table names, column types, and constraints. The database itself stores the actual data, like real student records."
  },
  {
    q: "Which level of the three-level architecture does an end user normally interact with?",
    a: "The external level. A user's application or screen is built on top of one external view, which itself is derived from the single conceptual schema."
  },
  {
    q: "Do all users of a database see the same external view?",
    a: "No — different users or applications can each have their own external view, tailored to what they need to see, all drawn from the same underlying conceptual schema."
  },
];

function renderFAQs() {
  const container = document.getElementById("faq-container");
  if (!container) return;
  container.innerHTML = FAQS.map((item, i) => `
    <div class="faq-item" data-index="${i}">
      <button class="faq-q" type="button">${item.q}</button>
      <div class="faq-a"><div class="faq-a-inner">${item.a}</div></div>
    </div>
  `).join("");

  container.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-q").addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

/* ---------- QUIZ ---------- */

const QUIZ = [
  {
    q: "1. Which level of the three-level architecture is closest to the physical disk?",
    options: ["External Level", "Conceptual Level", "Internal Level", "Application Level"],
    correct: 2,
  },
  {
    q: "2. A DBMS reduces which of these problems compared to a plain file system?",
    options: ["Only storage cost", "Data redundancy and inconsistency", "Internet speed", "Screen resolution"],
    correct: 1,
  },
  {
    q: "3. The overall structure/design of a database (before any data is entered) is called its:",
    options: ["Instance", "Schema", "Query", "Index"],
    correct: 1,
  },
  {
    q: "4. Which of these is a DML command, not a DDL command?",
    options: ["CREATE", "ALTER", "DROP", "UPDATE"],
    correct: 3,
  },
  {
    q: "5. Physical data independence means:",
    options: [
      "Internal schema can change without changing the conceptual schema",
      "External views can change without changing the internal schema",
      "Users can access data from anywhere physically",
      "Data is stored only once on disk",
    ],
    correct: 0,
  },
  {
    q: "6. In the overall DBMS structure, which component actually reads and writes data on disk?",
    options: ["Query Optimizer", "DDL Interpreter", "Storage Manager", "External View"],
    correct: 2,
  },
  {
    q: "7. A bank transfer that debits one account but crashes before crediting the other is an example of which file-system problem?",
    options: ["Data redundancy", "Atomicity problem", "Weak typography", "Menu-based interface failure"],
    correct: 1,
  },
  {
    q: "8. The data dictionary of a DBMS mainly stores:",
    options: ["Actual student records", "Backup copies of files", "Metadata about the schema and constraints", "User passwords only"],
    correct: 2,
  },
];

let quizScore = 0;

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  container.innerHTML = QUIZ.map((item, qIndex) => `
    <div class="quiz-card" data-qindex="${qIndex}">
      <div class="quiz-q">${item.q}</div>
      <div class="quiz-options">
        ${item.options.map((opt, oIndex) => `
          <button class="quiz-opt" data-oindex="${oIndex}">${opt}</button>
        `).join("")}
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".quiz-card").forEach((card) => {
    const qIndex = parseInt(card.getAttribute("data-qindex"), 10);
    const correctIndex = QUIZ[qIndex].correct;
    const buttons = card.querySelectorAll(".quiz-opt");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (card.classList.contains("answered")) return;
        card.classList.add("answered");
        const oIndex = parseInt(btn.getAttribute("data-oindex"), 10);

        buttons.forEach((b) => (b.disabled = true));
        buttons[correctIndex].classList.add("correct");
        if (oIndex !== correctIndex) {
          btn.classList.add("wrong");
        } else {
          quizScore++;
        }
        document.getElementById("quiz-score").textContent = `${quizScore} / ${QUIZ.length}`;
      });
    });
  });
}

/* ---------- CHECKLIST ---------- */

const CHECKLIST_ITEMS = [
  "I should know the difference between data, information, database, and DBMS",
  "I should know why file systems create redundancy, inconsistency, difficult access, isolation, integrity, atomicity, concurrency, and security problems",
  "I should know the difference between DBMS and file system in table form",
  "I should know the three levels of database architecture in order: external, conceptual, internal",
  "I should remember that schema means structure and instance means current data",
  "I should remember physical data independence and logical data independence with examples",
  "I should remember DDL commands and DML commands separately",
  "I should remember the roles of query processor, storage manager, and data dictionary",
  "I should revise all important terminologies before the exam",
  "I should revise the 2-mark, 5-mark, 10-mark, and most repeated university questions",
  "I should attempt the easy, medium, and hard practice questions",
  "I should be able to draw the architecture and overall DBMS structure diagrams without looking",
];

const CHECKLIST_KEY = "dbms_course_ch1_checklist_v1";

function loadChecklistState() {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveChecklistState(state) {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
}

function renderChecklist() {
  const list = document.getElementById("chapter-checklist");
  if (!list) return;
  const state = loadChecklistState();

  list.innerHTML = CHECKLIST_ITEMS.map((text, i) => `
    <li class="${state[i] ? "checked" : ""}" data-index="${i}">
      <input type="checkbox" ${state[i] ? "checked" : ""} />
      <span>${text}</span>
    </li>
  `).join("");

  list.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", (e) => {
      const i = li.getAttribute("data-index");
      const state = loadChecklistState();
      state[i] = !state[i];
      saveChecklistState(state);
      li.classList.toggle("checked", !!state[i]);
      li.querySelector("input").checked = !!state[i];
    });
    li.querySelector("input").addEventListener("click", (e) => e.preventDefault());
  });
}

/* ---------- MARK COMPLETE ---------- */

function initMarkComplete() {
  const btn = document.getElementById("mark-complete-btn");
  const status = document.getElementById("complete-status");
  if (!btn) return;

  const progress = loadProgress();
  if (getChapterState(progress, { id: CHAPTER_ID }) === "completed") {
    btn.textContent = "Chapter 1 Completed \u2713";
    status.classList.add("show");
  }

  btn.addEventListener("click", () => {
    setChapterState(CHAPTER_ID, "completed");
    btn.textContent = "Chapter 1 Completed \u2713";
    status.classList.add("show");
  });
}

/* ---------- READING EXPERIENCE ---------- */

function initReadingProgress() {
  const fill = document.getElementById("reading-progress-fill");
  if (!fill) return;

  const update = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
    fill.style.width = `${pct}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initEstimatedReadingTime() {
  const target = document.getElementById("reading-time");
  const content = document.querySelector(".chapter-content");
  if (!target || !content) return;

  const words = content.innerText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  target.textContent = `Estimated read: ${minutes} min`;
}

function loadCollapsedSections() {
  try {
    const raw = localStorage.getItem(COLLAPSE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCollapsedSections(state) {
  localStorage.setItem(COLLAPSE_KEY, JSON.stringify(state));
}

function initCollapsibleSections() {
  const saved = loadCollapsedSections();
  document.querySelectorAll(".topic-block[id]").forEach((section) => {
    const heading = section.querySelector("h2");
    if (!heading || section.querySelector(".topic-content")) return;

    const content = document.createElement("div");
    content.className = "topic-content";
    let node = heading.nextSibling;
    while (node) {
      const next = node.nextSibling;
      content.appendChild(node);
      node = next;
    }
    section.appendChild(content);
    section.classList.add("is-collapsible");

    const btn = document.createElement("button");
    btn.className = "section-toggle";
    btn.type = "button";
    btn.textContent = "⌄";
    btn.setAttribute("aria-label", `Toggle ${heading.textContent.trim()}`);
    heading.appendChild(btn);

    if (saved[section.id]) section.classList.add("is-collapsed");

    btn.addEventListener("click", () => {
      const state = loadCollapsedSections();
      const collapsed = section.classList.toggle("is-collapsed");
      state[section.id] = collapsed;
      saveCollapsedSections(state);
    });
  });
}

function initActiveToc() {
  const links = Array.from(document.querySelectorAll(".sidebar-toc a"));
  if (!links.length) return;

  const byId = new Map(
    links.map((link) => [decodeURIComponent(link.getAttribute("href").slice(1)), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.remove("active"));
      const active = byId.get(visible.target.id);
      if (active) active.classList.add("active");
    },
    { rootMargin: "-18% 0px -68% 0px", threshold: [0.1, 0.35, 0.7] }
  );

  document.querySelectorAll(".topic-block[id]").forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderFAQs();
  renderQuiz();
  renderChecklist();
  initMarkComplete();
  initEstimatedReadingTime();
  initCollapsibleSections();
  initReadingProgress();
  initActiveToc();
});
