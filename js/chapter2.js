/* ============================================================
   CHAPTER 2 - INTERACTIVE LOGIC
   ============================================================ */

const CHAPTER_ID = 2;
const COLLAPSE_KEY = "dbms_course_ch2_collapsed_sections_v1";

const FAQS = [
  {
    q: "Is ER modeling the same as creating tables?",
    a: "No. ER modeling is the conceptual design step before table creation. Tables are implementation structures; ER diagrams help you understand the real-world objects and relationships first."
  },
  {
    q: "How do I decide whether something is an entity or an attribute?",
    a: "If it is an independent object worth storing many facts about, it is usually an entity. If it only describes another object, it is usually an attribute."
  },
  {
    q: "Can a relationship have attributes?",
    a: "Yes. For example, in Student borrows Book, the relationship may have IssueDate and ReturnDate. This becomes important during later table conversion."
  },
  {
    q: "What is the fastest way to identify mapping constraints?",
    a: "Ask two questions: how many B objects can one A object connect to, and how many A objects can one B object connect to. Those two answers give the mapping constraint."
  },
  {
    q: "Are all super keys candidate keys?",
    a: "No. A candidate key must be minimal. A super key may contain extra attributes that are not needed for uniqueness."
  },
  {
    q: "Can an entity set have more than one candidate key?",
    a: "Yes. A Student entity may have RollNo and Email as separate candidate keys if both are unique and minimal."
  },
  {
    q: "Why should key attributes be underlined in an ER diagram?",
    a: "Underlining tells the reader which attribute uniquely identifies an entity. It prevents ambiguity in the design."
  },
  {
    q: "Is Name a good candidate key?",
    a: "Usually no. Names can repeat. Candidate keys should be unique in the given system, such as RollNo, AccountNo, or Email if the rules guarantee uniqueness."
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

const QUIZ = [
  {
    q: "1. ER model is mainly used for:",
    options: ["Physical disk formatting", "Conceptual database design", "Writing CSS", "Encrypting files"],
    correct: 1,
  },
  {
    q: "2. In ER notation, an entity set is commonly shown using:",
    options: ["Oval", "Diamond", "Rectangle", "Circle only"],
    correct: 2,
  },
  {
    q: "3. In ER notation, a relationship set is commonly shown using:",
    options: ["Diamond", "Rectangle", "Underlined oval", "Dashed circle"],
    correct: 0,
  },
  {
    q: "4. Student enrolls in Course is an example of:",
    options: ["Attribute", "Relationship", "Domain", "Data dictionary"],
    correct: 1,
  },
  {
    q: "5. Which mapping constraint fits: one department has many employees?",
    options: ["1:1", "1:N", "M:N", "N:N only"],
    correct: 1,
  },
  {
    q: "6. A super key is:",
    options: ["Any unique identifying attribute set", "Only the shortest key", "A foreign table", "A visual diagram symbol"],
    correct: 0,
  },
  {
    q: "7. A candidate key is:",
    options: ["Any attribute", "A minimal super key", "Always a name field", "A relationship symbol"],
    correct: 1,
  },
  {
    q: "8. Every candidate key is:",
    options: ["A super key", "Not unique", "A relationship", "A mapping constraint"],
    correct: 0,
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

const CHECKLIST_ITEMS = [
  "I should know why ER modeling is done before table design",
  "I should know the meaning of entity, entity set, attribute, and relationship",
  "I should remember ER notation: rectangle, diamond, oval, line, and underlined key",
  "I should be able to identify entities and attributes from a short problem statement",
  "I should know 1:1, 1:N, N:1, and M:N mapping constraints with examples",
  "I should know why keys are needed in database design",
  "I should know that a super key uniquely identifies an entity",
  "I should know that a candidate key is a minimal super key",
  "I should be able to explain super key vs candidate key in a table",
  "I should revise the ER notation diagram before exams",
  "I should attempt the easy, medium, and hard practice questions",
  "I should be able to draw a small ER diagram without looking at notes",
];

const CHECKLIST_KEY = "dbms_course_ch2_checklist_v1";

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
    li.addEventListener("click", () => {
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

function initMarkComplete() {
  const btn = document.getElementById("mark-complete-btn");
  const status = document.getElementById("complete-status");
  if (!btn) return;

  const progress = loadProgress();
  if (getChapterState(progress, { id: CHAPTER_ID }) === "completed") {
    btn.textContent = "Chapter 2 Completed \u2713";
    status.classList.add("show");
  }

  btn.addEventListener("click", () => {
    setChapterState(CHAPTER_ID, "completed");
    btn.textContent = "Chapter 2 Completed \u2713";
    status.classList.add("show");
  });
}

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
    btn.textContent = "\u2304";
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
