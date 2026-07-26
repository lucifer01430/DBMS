/* ============================================================
   DBMS COURSE SHELL
   Homepage, roadmap, progress dashboard, navigation, and theme.
   ============================================================ */

const STORAGE_KEY = "dbms_course_progress_v2";
const LEGACY_STORAGE_KEY = "dbms_course_progress_unit1_v1";
const THEME_KEY = "dbms_course_theme";
const STREAK_KEY = "dbms_course_streak_v1";

let COURSE = null;

function initThemeToggle() {
  const root = document.documentElement;
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  root.dataset.theme = saved;

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    const updateLabel = () => {
      const isLight = root.dataset.theme === "light";
      const icon = btn.querySelector(".theme-toggle-icon");
      const text = btn.querySelector(".theme-toggle-text");
      if (icon) icon.textContent = isLight ? "☾" : "☼";
      if (text) text.textContent = isLight ? "Dark" : "Light";
      btn.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    };

    updateLabel();
    btn.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = nextTheme;
      localStorage.setItem(THEME_KEY, nextTheme);
      updateLabel();
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.getElementById("primary-navigation");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
}

function loadProgress() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) return JSON.parse(current);

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    }
  } catch (error) {
    return {};
  }
  return {};
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function touchStudyStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  try {
    const current = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    if (current.lastStudyDate === today) return current.count || 1;

    const next = {
      lastStudyDate: today,
      count: current.lastStudyDate === yesterday ? (current.count || 0) + 1 : 1,
    };
    localStorage.setItem(STREAK_KEY, JSON.stringify(next));
    return next.count;
  } catch (error) {
    localStorage.setItem(STREAK_KEY, JSON.stringify({ lastStudyDate: today, count: 1 }));
    return 1;
  }
}

function getStudyStreak() {
  try {
    const current = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    return current.count || 0;
  } catch (error) {
    return 0;
  }
}

function getChapterState(progress, chapter) {
  return progress[String(chapter.id)] || "not_started";
}

function setChapterState(chapterId, state) {
  const progress = loadProgress();
  if (state === "not_started") {
    delete progress[String(chapterId)];
  } else {
    progress[String(chapterId)] = state;
  }
  saveProgress(progress);
  touchStudyStreak();
  return progress;
}

function deriveRoadmapStatus(progress, chapter) {
  const state = getChapterState(progress, chapter);
  if (state === "completed") return "completed";
  if (state === "in_progress") return "in-progress";
  if (!chapter.available) return "locked";
  return "available";
}

function percentage(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function formatTopics(topics) {
  return topics.map((topic) => `<span>${topic}</span>`).join("");
}

function getCourseMetrics(progress) {
  const chapters = COURSE.chapters;
  const units = COURSE.units;
  const completedChapters = chapters.filter((chapter) => getChapterState(progress, chapter) === "completed");
  const inProgressChapters = chapters.filter((chapter) => getChapterState(progress, chapter) === "in_progress");
  const completedUnitCount = units.filter((unit) => {
    const unitChapters = chapters.filter((chapter) => chapter.unit === unit.id);
    return unitChapters.length && unitChapters.every((chapter) => getChapterState(progress, chapter) === "completed");
  }).length;
  const currentChapter = inProgressChapters[0]
    || chapters.find((chapter) => chapter.available && getChapterState(progress, chapter) !== "completed")
    || completedChapters[completedChapters.length - 1]
    || chapters[0];
  const completedHours = completedChapters.reduce((sum, chapter) => sum + chapter.totalHours, 0);
  const totalHours = chapters.reduce((sum, chapter) => sum + chapter.totalHours, 0);

  return {
    totalUnits: units.length,
    completedUnits: completedUnitCount,
    remainingUnits: units.length - completedUnitCount,
    totalChapters: chapters.length,
    completedChapters: completedChapters.length,
    remainingChapters: chapters.length - completedChapters.length,
    inProgressChapters: inProgressChapters.length,
    currentChapter,
    overallProgress: percentage(completedChapters.length, chapters.length),
    readingProgress: percentage(completedHours, totalHours),
    totalHours,
    completedHours,
    remainingHours: Math.max(0, Math.round((totalHours - completedHours) * 10) / 10),
    studyStreak: getStudyStreak(),
    totalTopics: chapters.reduce((sum, chapter) => sum + chapter.topicCount, 0),
  };
}

const STATUS_META = {
  locked: { label: "Locked", icon: "LOCKED", cls: "st-locked" },
  available: { label: "Unlocked", icon: "LIVE", cls: "st-available" },
  "in-progress": { label: "In Progress", icon: "ACTIVE", cls: "st-in-progress" },
  completed: { label: "Completed", icon: "DONE", cls: "st-completed" },
};

function renderHeroStats() {
  const stats = document.getElementById("hero-stats");
  if (!stats || !COURSE) return;
  const metrics = getCourseMetrics(loadProgress());
  const quizCount = COURSE.chapters.length;
  const practiceSets = COURSE.chapters.length;

  stats.innerHTML = [
    ["Total Units", metrics.totalUnits],
    ["Total Chapters", metrics.totalChapters],
    ["Interactive Lessons", metrics.totalChapters],
    ["Practice Sets", practiceSets],
    ["Revision Notes", metrics.totalChapters],
    ["Quizzes", quizCount],
    ["Estimated Hours", `${Math.round(metrics.totalHours * 10) / 10}h`],
  ].map(([label, value]) => `
    <div class="hero-stat">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderOverview() {
  const el = document.getElementById("overview-grid");
  if (!el || !COURSE) return;
  const metrics = getCourseMetrics(loadProgress());

  el.innerHTML = `
    <article class="overview-card">
      <span class="overview-icon">01</span>
      <h3>Complete Syllabus Map</h3>
      <p>${metrics.totalTopics} official syllabus topics are organized into ${metrics.totalChapters} textbook chapters across all five units.</p>
    </article>
    <article class="overview-card">
      <span class="overview-icon">02</span>
      <h3>Locked Learning Path</h3>
      <p>Only Chapter 1 is available now. The remaining chapters are visible as the full semester path while staying locked.</p>
    </article>
    <article class="overview-card">
      <span class="overview-icon">03</span>
      <h3>Course-Level Progress</h3>
      <p>The dashboard tracks the entire DBMS course, including unit completion, reading progress, and estimated hours remaining.</p>
    </article>
  `;
}

function renderRoadmap() {
  const container = document.getElementById("roadmap-list");
  if (!container || !COURSE) return;
  const progress = loadProgress();

  container.innerHTML = COURSE.units.map((unit) => {
    const chaptersInUnit = COURSE.chapters.filter((chapter) => chapter.unit === unit.id);
    const completedCount = chaptersInUnit.filter((chapter) => getChapterState(progress, chapter) === "completed").length;
    const unitPct = percentage(completedCount, chaptersInUnit.length);

    return `
      <section class="unit-block" id="unit-${unit.id}">
        <div class="unit-header">
          <div>
            <span class="unit-tag">UNIT ${unit.roman}</span>
            <h3>${unit.name}</h3>
            <p>${unit.lectures} lectures · ${chaptersInUnit.length} chapters · ${chaptersInUnit.reduce((sum, chapter) => sum + chapter.topicCount, 0)} topics</p>
          </div>
          <div class="unit-meter" aria-label="Unit ${unit.id} progress ${unitPct}%">
            <span>${unitPct}%</span>
            <div><i style="width:${unitPct}%"></i></div>
          </div>
        </div>
        <div class="chapter-grid">
          ${chaptersInUnit.map((chapter) => renderChapterCard(chapter, progress)).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderChapterCard(chapter, progress) {
  const status = deriveRoadmapStatus(progress, chapter);
  const meta = STATUS_META[status];
  const state = getChapterState(progress, chapter);
  const chapterPct = state === "completed" ? 100 : state === "in_progress" ? 50 : 0;

  return `
    <article class="chapter-card ${meta.cls}">
      <div class="chapter-card-top">
        <span class="chapter-num">Chapter ${String(chapter.id).padStart(2, "0")}</span>
        <span class="status-pill ${meta.cls}"><span>${meta.icon}</span>${meta.label}</span>
      </div>
      <h4 class="chapter-title">${chapter.name}</h4>
      <div class="chapter-topics" aria-label="Topics covered">${formatTopics(chapter.topics)}</div>
      <div class="chapter-progress">
        <div class="chapter-progress-label">
          <span>Chapter Progress</span>
          <span>${chapterPct}%</span>
        </div>
        <div class="chapter-progress-track"><div style="width:${chapterPct}%"></div></div>
      </div>
      <div class="chapter-meta-grid">
        <span><b>Difficulty</b>${chapter.difficulty}</span>
        <span><b>Reading</b>${chapter.readingTime}</span>
        <span><b>Practice</b>${chapter.practiceTime}</span>
      </div>
      ${chapter.available
        ? `<a class="chapter-start-btn" href="${chapter.file}">${state === "completed" ? "Review Chapter" : "Start Learning"}</a>`
        : `<span class="chapter-start-btn is-disabled" aria-disabled="true">Locked</span>`}
    </article>
  `;
}

function renderTracker() {
  const statsEl = document.getElementById("tracker-stats");
  const unitBarsEl = document.getElementById("tracker-unit-bars");
  const listEl = document.getElementById("tracker-list");
  if ((!statsEl && !unitBarsEl && !listEl) || !COURSE) return;

  const progress = loadProgress();
  const metrics = getCourseMetrics(progress);

  if (statsEl) {
    statsEl.innerHTML = `
      <div class="stat-card stat-primary">
        <div class="stat-ring" style="--pct:${metrics.overallProgress}">
          <span>${metrics.overallProgress}%</span>
        </div>
        <div class="stat-label">Overall Course Progress</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.readingProgress}%</div>
        <div class="stat-label">Overall Reading Progress</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.totalUnits}</div>
        <div class="stat-label">Total Units</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.completedUnits}</div>
        <div class="stat-label">Completed Units</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.remainingUnits}</div>
        <div class="stat-label">Remaining Units</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.totalChapters}</div>
        <div class="stat-label">Total Chapters</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.completedChapters}</div>
        <div class="stat-label">Completed Chapters</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.remainingChapters}</div>
        <div class="stat-label">Remaining Chapters</div>
      </div>
      <div class="stat-card stat-wide">
        <div class="stat-number-sm">CH ${String(metrics.currentChapter.id).padStart(2, "0")}</div>
        <div class="stat-subtitle">${metrics.currentChapter.name}</div>
        <div class="stat-label">Current Chapter</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.studyStreak}</div>
        <div class="stat-label">Study Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${metrics.remainingHours}h</div>
        <div class="stat-label">Estimated Hours Remaining</div>
      </div>
    `;
  }

  if (unitBarsEl) {
    unitBarsEl.innerHTML = COURSE.units.map((unit) => {
      const chaptersInUnit = COURSE.chapters.filter((chapter) => chapter.unit === unit.id);
      const doneInUnit = chaptersInUnit.filter((chapter) => getChapterState(progress, chapter) === "completed").length;
      const unitPct = percentage(doneInUnit, chaptersInUnit.length);
      return `
        <div class="unit-bar-row">
          <div class="unit-bar-label">
            <span>Unit ${unit.roman} - ${unit.name}</span>
            <span>${doneInUnit}/${chaptersInUnit.length} chapters · ${unitPct}%</span>
          </div>
          <div class="unit-bar-track">
            <div class="unit-bar-fill" style="width:${unitPct}%"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  if (listEl) {
    listEl.innerHTML = COURSE.chapters.map((chapter) => {
      const state = getChapterState(progress, chapter);
      const disabled = !chapter.available;
      return `
        <div class="tracker-row ${disabled ? "is-disabled" : ""}">
          <div class="tracker-row-info">
            <span class="chapter-num">CH ${String(chapter.id).padStart(2, "0")}</span>
            <span class="tracker-row-name">${chapter.name}</span>
          </div>
          <div class="tracker-row-controls" data-chapter-id="${chapter.id}">
            <button class="mini-btn ${state === "not_started" ? "active" : ""}" data-state="not_started" ${disabled ? "disabled" : ""}>Not Started</button>
            <button class="mini-btn ${state === "in_progress" ? "active" : ""}" data-state="in_progress" ${disabled ? "disabled" : ""}>In Progress</button>
            <button class="mini-btn ${state === "completed" ? "active" : ""}" data-state="completed" ${disabled ? "disabled" : ""}>Completed</button>
          </div>
        </div>
      `;
    }).join("");

    listEl.querySelectorAll(".tracker-row-controls").forEach((row) => {
      row.querySelectorAll(".mini-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          setChapterState(row.getAttribute("data-chapter-id"), btn.getAttribute("data-state"));
          renderHeroStats();
          renderOverview();
          renderTracker();
          renderRoadmap();
        });
      });
    });
  }
}

function renderSyllabusSource() {
  const el = document.getElementById("syllabus-source");
  if (!el || !COURSE) return;
  el.textContent = COURSE.source === "syllabus.txt"
    ? "Roadmap generated from syllabus.txt"
    : "Roadmap generated from embedded syllabus fallback";
}

async function initCourseShell() {
  COURSE = await loadCourseArchitecture();
  touchStudyStreak();
  renderSyllabusSource();
  renderHeroStats();
  renderOverview();
  renderTracker();
  renderRoadmap();
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initCourseShell();
});
