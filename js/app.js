/* ============================================================
   DBMS ROADMAP — APP LOGIC
   No backend, no build step. Progress lives in localStorage
   on this browser only.
   ============================================================ */

const STORAGE_KEY = "aktu_dbms_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getChapterState(progress, chapter) {
  // "not_started" | "in_progress" | "completed"
  return progress[chapter.id] || "not_started";
}

function setChapterState(chapterId, state) {
  const progress = loadProgress();
  if (state === "not_started") {
    delete progress[chapterId];
  } else {
    progress[chapterId] = state;
  }
  saveProgress(progress);
  return progress;
}

function deriveRoadmapStatus(progress, chapter) {
  const state = getChapterState(progress, chapter);
  if (state === "completed") return "completed";
  if (state === "in_progress") return "in-progress";
  if (!chapter.file) return "locked";
  return "available";
}

const STATUS_META = {
  locked:       { label: "Locked",       icon: "\u25A2", cls: "st-locked" },
  available:    { label: "Available",    icon: "\u25A2", cls: "st-available" },
  "in-progress":{ label: "In Progress",  icon: "\u25D0", cls: "st-progress" },
  completed:    { label: "Completed",    icon: "\u2611", cls: "st-completed" },
};

/* ---------- Rendering: Roadmap ---------- */

function renderRoadmap() {
  const container = document.getElementById("roadmap-list");
  if (!container) return;
  const progress = loadProgress();

  container.innerHTML = "";
  UNITS.forEach((unit) => {
    const chaptersInUnit = CHAPTERS.filter((c) => c.unit === unit.id);
    const unitBlock = document.createElement("div");
    unitBlock.className = "unit-block";

    const completedCount = chaptersInUnit.filter(
      (c) => getChapterState(progress, c) === "completed"
    ).length;

    unitBlock.innerHTML = `
      <div class="unit-header">
        <span class="unit-tag">UNIT ${unit.id}</span>
        <h3>${unit.name}</h3>
        <span class="unit-count">${completedCount}/${chaptersInUnit.length} complete</span>
      </div>
    `;

    const rail = document.createElement("div");
    rail.className = "chapter-rail";

    chaptersInUnit.forEach((chapter) => {
      const status = deriveRoadmapStatus(progress, chapter);
      const meta = STATUS_META[status];
      const node = document.createElement(chapter.file ? "a" : "div");
      if (chapter.file) node.href = chapter.file;
      node.className = `chapter-node ${meta.cls}`;

      node.innerHTML = `
        <div class="chapter-node-dot"></div>
        <div class="chapter-card">
          <div class="chapter-card-top">
            <span class="chapter-num">CH ${String(chapter.id).padStart(2, "0")}</span>
            <span class="status-pill ${meta.cls}">${meta.icon} ${meta.label}</span>
          </div>
          <h4 class="chapter-title">${chapter.name}</h4>
          <p class="chapter-topics">${chapter.topics}</p>
          <div class="chapter-card-bottom">
            <span class="diff-pill diff-${chapter.difficulty.toLowerCase()}">${chapter.difficulty}</span>
            <span class="time-pill">\u23F1 ${chapter.time}</span>
          </div>
        </div>
      `;
      rail.appendChild(node);
    });

    unitBlock.appendChild(rail);
    container.appendChild(unitBlock);
  });
}

/* ---------- Rendering: Progress Tracker ---------- */

function renderTracker() {
  const statsEl = document.getElementById("tracker-stats");
  const unitBarsEl = document.getElementById("tracker-unit-bars");
  const listEl = document.getElementById("tracker-list");
  if (!statsEl && !unitBarsEl && !listEl) return;

  const progress = loadProgress();
  const total = CHAPTERS.length;
  const completed = CHAPTERS.filter((c) => getChapterState(progress, c) === "completed");
  const inProgress = CHAPTERS.filter((c) => getChapterState(progress, c) === "in_progress");
  const remaining = total - completed.length;
  const pct = Math.round((completed.length / total) * 100);

  let currentChapter = inProgress[0] || CHAPTERS.find((c) => getChapterState(progress, c) === "not_started" && c.file);
  if (!currentChapter) currentChapter = completed[completed.length - 1];

  if (statsEl) {
    statsEl.innerHTML = `
      <div class="stat-card stat-primary">
        <div class="stat-ring" style="--pct:${pct}">
          <span>${pct}%</span>
        </div>
        <div class="stat-label">Syllabus Coverage</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${completed.length}</div>
        <div class="stat-label">Completed Chapters</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${remaining}</div>
        <div class="stat-label">Remaining Chapters</div>
      </div>
      <div class="stat-card">
        <div class="stat-number-sm">${currentChapter ? "CH " + String(currentChapter.id).padStart(2, "0") : "\u2014"}</div>
        <div class="stat-label">Current Chapter</div>
      </div>
    `;
  }

  if (unitBarsEl) {
    unitBarsEl.innerHTML = UNITS.map((unit) => {
      const chaptersInUnit = CHAPTERS.filter((c) => c.unit === unit.id);
      const doneInUnit = chaptersInUnit.filter((c) => getChapterState(progress, c) === "completed").length;
      const unitPct = Math.round((doneInUnit / chaptersInUnit.length) * 100);
      return `
        <div class="unit-bar-row">
          <div class="unit-bar-label">
            <span>Unit ${unit.id} \u2014 ${unit.name}</span>
            <span>${doneInUnit}/${chaptersInUnit.length}</span>
          </div>
          <div class="unit-bar-track">
            <div class="unit-bar-fill" style="width:${unitPct}%"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  if (listEl) {
    listEl.innerHTML = CHAPTERS.map((chapter) => {
      const state = getChapterState(progress, chapter);
      const disabled = !chapter.file;
      return `
        <div class="tracker-row ${disabled ? "is-disabled" : ""}">
          <div class="tracker-row-info">
            <span class="chapter-num">CH ${String(chapter.id).padStart(2, "0")}</span>
            <span class="tracker-row-name">${chapter.name}</span>
          </div>
          <div class="tracker-row-controls" data-chapter-id="${chapter.id}">
            <button class="mini-btn ${state === "not_started" ? "active" : ""}" data-state="not_started" ${disabled ? "disabled" : ""}>\u25A2 Not Started</button>
            <button class="mini-btn ${state === "in_progress" ? "active" : ""}" data-state="in_progress" ${disabled ? "disabled" : ""}>\u25D0 In Progress</button>
            <button class="mini-btn ${state === "completed" ? "active" : ""}" data-state="completed" ${disabled ? "disabled" : ""}>\u2611 Completed</button>
          </div>
        </div>
      `;
    }).join("");

    listEl.querySelectorAll(".tracker-row-controls").forEach((row) => {
      row.querySelectorAll(".mini-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chapterId = row.getAttribute("data-chapter-id");
          setChapterState(chapterId, btn.getAttribute("data-state"));
          renderTracker();
          renderRoadmap();
        });
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderRoadmap();
  renderTracker();
});
