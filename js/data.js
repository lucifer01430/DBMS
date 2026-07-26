/* ============================================================
   DBMS COURSE ARCHITECTURE
   The roadmap is generated from syllabus.txt. This file contains
   parsing and chapter-building rules only, not hardcoded chapter
   content.
   ============================================================ */

const SYLLABUS_URL = "syllabus.txt";

const FALLBACK_SYLLABUS_TEXT = `DR. A.P.J. Abdul Kalam Technical University, Uttar Pradesh, Lucknow
B.Tech (CS, Computer Engineering and CSE) - Fifth Semester
Database Management System (BCS501)

# Detailed Syllabus

## Unit I - Introduction (08 Lectures)

* Overview
* Database System vs File System
* Database System Concept and Architecture
* Data Model Schema and Instances
* Data Independence
* Database Language and Interfaces
* Data Definition Language (DDL)
* Data Manipulation Language (DML)
* Overall Database Structure
* Data Modeling using the Entity Relationship (ER) Model:
  * ER Model Concepts
  * Notation for ER Diagram
  * Mapping Constraints
  * Keys
  * Super Key
  * Candidate Key
  * Primary Key
  * Generalization
  * Aggregation
  * Reduction of ER Diagrams to Tables
  * Extended ER Model
  * Relationship of Higher Degree

## Unit II - Relational Data Model and Language (08 Lectures)

### Relational Data Model
* Relational Data Model Concepts
* Integrity Constraints
* Entity Integrity
* Referential Integrity
* Keys Constraints
* Domain Constraints
* Relational Algebra
* Relational Calculus
* Tuple and Domain Calculus

### Introduction to SQL
* Characteristics of SQL
* Advantages of SQL
* SQL Data Types and Literals
* Types of SQL Commands
* SQL Operators and Their Procedure
* Tables
* Views and Indexes
* Queries and Subqueries
* Aggregate Functions
* Insert
* Update
* Delete Operations
* Joins
* Unions
* Intersection
* Minus
* Cursors
* Triggers
* Procedures in SQL/PL SQL

## Unit III - Database Design & Normalization (08 Lectures)
* Functional Dependencies
* Normal Forms
  * First Normal Form (1NF)
  * Second Normal Form (2NF)
  * Third Normal Form (3NF)
  * Boyce-Codd Normal Form (BCNF)
* Inclusion Dependency
* Lossless Join Decomposition
* Normalization using:
  * Functional Dependency (FD)
  * Multivalued Dependency (MVD)
  * Join Dependency (JD)
* Alternative Approaches to Database Design

## Unit IV - Transaction Processing Concept (08 Lectures)
* Transaction System
* Testing of Serializability
* Serializability of Schedules
* Conflict & View Serializable Schedule
* Recoverability
* Recovery from Transaction Failures
* Log-Based Recovery
* Checkpoints
* Deadlock Handling
* Distributed Database
  * Distributed Data Storage
  * Concurrency Control
  * Directory System

## Unit V - Concurrency Control Techniques (08 Lectures)
* Concurrency Control
* Locking Techniques for Concurrency Control
* Timestamp Protocols for Concurrency Control
* Validation-Based Protocol
* Multiple Granularity
* Multi Version Schemes
* Recovery with Concurrent Transaction
* Case Study of Oracle`;

function romanToNumber(roman) {
  const map = { I: 1, V: 5, X: 10 };
  return roman.split("").reduce((total, char, index, arr) => {
    const value = map[char] || 0;
    const next = map[arr[index + 1]] || 0;
    return total + (value < next ? -value : value);
  }, 0);
}

function normalizeLine(line) {
  return line
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u00a0/g, " ")
    .trim();
}

function cleanTopic(text) {
  return text
    .replace(/^\*+\s*/, "")
    .replace(/:$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSyllabus(text) {
  const units = [];
  let currentUnit = null;
  let currentGroup = null;

  text.split(/\r?\n/).forEach((rawLine) => {
    const normalized = normalizeLine(rawLine);
    if (!normalized || normalized === "---") return;

    const unitMatch = normalized.match(/^##\s+Unit\s+([IVX]+)\s*-\s*(.*?)\s*\((\d+)\s+Lectures?\)/i);
    if (unitMatch) {
      currentUnit = {
        id: romanToNumber(unitMatch[1].toUpperCase()),
        roman: unitMatch[1].toUpperCase(),
        name: unitMatch[2].trim(),
        lectures: Number(unitMatch[3]),
        groups: [{ title: "Core Topics", topics: [] }],
      };
      currentGroup = currentUnit.groups[0];
      units.push(currentUnit);
      return;
    }

    const groupMatch = normalized.match(/^###\s+(.+)/);
    if (groupMatch && currentUnit) {
      currentGroup = { title: groupMatch[1].trim(), topics: [] };
      currentUnit.groups.push(currentGroup);
      return;
    }

    if (/^\s*\*/.test(rawLine) && currentUnit && currentGroup) {
      const topic = cleanTopic(normalized);
      if (topic) currentGroup.topics.push(topic);
    }
  });

  const parsedUnits = units.map((unit) => ({
    ...unit,
    groups: unit.groups.filter((group) => group.topics.length > 0),
  }));

  return disambiguateDuplicateTopics(parsedUnits);
}

function disambiguateDuplicateTopics(units) {
  const counts = new Map();
  units.forEach((unit) => {
    unit.groups.forEach((group) => {
      group.topics.forEach((topic) => counts.set(topic, (counts.get(topic) || 0) + 1));
    });
  });

  return units.map((unit) => ({
    ...unit,
    groups: unit.groups.map((group) => ({
      ...group,
      topics: group.topics.map((topic) => {
        if ((counts.get(topic) || 0) <= 1) return topic;
        return group.title === "Core Topics" ? `${unit.name} - ${topic}` : `${group.title} - ${topic}`;
      }),
    })),
  }));
}

function chapterTitleFromTopics(unit, topics, indexInUnit) {
  const joined = topics.join(" | ");
  const rules = [
    [/Generalization|Aggregation|Extended ER|Higher Degree/i, "Advanced ER and EER Modeling"],
    [/Overview|File System|Architecture|Data Independence|DDL|DML/i, "Introduction to Database Systems"],
    [/ER Model|ER Diagram|Mapping Constraints|Super Key|Candidate Key|Primary Key/i, "Entity Relationship Modeling"],
    [/Integrity|Entity Integrity|Referential Integrity|Domain Constraints/i, "Relational Model and Integrity Constraints"],
    [/Relational Algebra|Relational Calculus|Tuple and Domain/i, "Relational Algebra and Calculus"],
    [/Characteristics of SQL|SQL Data Types|Types of SQL Commands|Operators/i, "SQL Fundamentals"],
    [/Tables|Views|Queries|Aggregate|Insert|Update|Delete/i, "SQL Querying and Data Operations"],
    [/Joins|Unions|Intersection|Minus|Cursors|Triggers|Procedures/i, "Advanced SQL and PL/SQL"],
    [/Functional Dependencies|Normal Forms|1NF|2NF|3NF|BCNF/i, "Functional Dependencies and Normal Forms"],
    [/Inclusion Dependency|Lossless Join|Multivalued|Join Dependency/i, "Decomposition and Advanced Dependencies"],
    [/Alternative Approaches/i, "Database Design Approaches"],
    [/Transaction System|Serializability|Schedules/i, "Transactions and Serializability"],
    [/Recoverability|Recovery from Transaction Failures|Log-Based|Checkpoints/i, "Recovery and Checkpointing"],
    [/Deadlock/i, "Deadlock Handling"],
    [/Distributed Database|Distributed Data Storage|Directory System/i, "Distributed Database Systems"],
    [/Locking Techniques|Timestamp Protocols|Validation-Based/i, "Concurrency Control Protocols"],
    [/Multiple Granularity|Multi Version|Recovery with Concurrent/i, "Advanced Concurrency and Recovery"],
    [/Case Study of Oracle/i, "Oracle DBMS Case Study"],
  ];

  const match = rules.find(([pattern]) => pattern.test(joined));
  return match ? match[1] : `${unit.name}: Chapter ${indexInUnit + 1}`;
}

function difficultyFor(unitId, chapterIndex, topics) {
  const joined = topics.join(" ");
  if (/Case Study|Distributed|Multi Version|Join Dependency|BCNF|PL SQL|Triggers|Serializability/i.test(joined)) {
    return "Advanced";
  }
  if (unitId >= 3 || chapterIndex > 0 || /Algebra|Calculus|Joins|Recovery|Timestamp|Locking/i.test(joined)) {
    return "Intermediate";
  }
  return "Beginner";
}

function splitTopics(unit, group) {
  const topics = group.topics;
  const chunks = [];

  if (unit.id === 1) {
    chunks.push(topics.slice(0, 9));
    chunks.push(topics.slice(9, 16));
    chunks.push(topics.slice(16));
    return chunks.filter(Boolean).filter((chunk) => chunk.length);
  }

  if (unit.id === 2 && /Relational Data Model/i.test(group.title)) {
    return [topics.slice(0, 6), topics.slice(6)].filter((chunk) => chunk.length);
  }

  if (unit.id === 2 && /SQL/i.test(group.title)) {
    return [topics.slice(0, 5), topics.slice(5, 13), topics.slice(13)].filter((chunk) => chunk.length);
  }

  if (unit.id === 3) {
    return [topics.slice(0, 6), topics.slice(6, 10), topics.slice(10)].filter((chunk) => chunk.length);
  }

  if (unit.id === 4) {
    return [topics.slice(0, 4), topics.slice(4, 8), topics.slice(8, 9), topics.slice(9)].filter((chunk) => chunk.length);
  }

  if (unit.id === 5) {
    return [topics.slice(0, 4), topics.slice(4, 7), topics.slice(7)].filter((chunk) => chunk.length);
  }

  const size = Math.max(4, Math.ceil(topics.length / 3));
  for (let i = 0; i < topics.length; i += size) {
    chunks.push(topics.slice(i, i + size));
  }
  return chunks.filter((chunk) => chunk.length);
}

function buildCourseFromUnits(parsedUnits) {
  let chapterId = 1;
  const units = parsedUnits.map((unit) => ({ ...unit, chapters: [] }));
  const chapters = [];

  units.forEach((unit) => {
    unit.groups.forEach((group) => {
      splitTopics(unit, group).forEach((topics, indexInUnit) => {
        const readingHours = Math.max(1, Math.round(topics.length * 0.45 * 10) / 10);
        const practiceHours = Math.max(0.5, Math.round(topics.length * 0.22 * 10) / 10);
        const chapter = {
          id: chapterId,
          unit: unit.id,
          unitName: unit.name,
          name: chapterTitleFromTopics(unit, topics, unit.chapters.length || indexInUnit),
          topics,
          topicCount: topics.length,
          difficulty: difficultyFor(unit.id, unit.chapters.length, topics),
          readingTime: `${readingHours} hrs`,
          practiceTime: `${practiceHours} hrs`,
          totalHours: Math.round((readingHours + practiceHours) * 10) / 10,
          file: chapterId === 1 ? "unit-1/chapter1.html" : null,
          available: chapterId === 1,
        };
        chapters.push(chapter);
        unit.chapters.push(chapter.id);
        chapterId += 1;
      });
    });
  });

  return {
    meta: {
      title: "Database Management System",
      code: "BCS501",
      subtitle: "B.Tech CSE Fifth Semester",
      university: "Dr. A.P.J. Abdul Kalam Technical University",
      totalLectures: units.reduce((sum, unit) => sum + unit.lectures, 0),
    },
    units,
    chapters,
  };
}

async function loadCourseArchitecture() {
  let text = FALLBACK_SYLLABUS_TEXT;
  let source = "fallback";

  try {
    const response = await fetch(`${SYLLABUS_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (response.ok) {
      text = await response.text();
      source = "syllabus.txt";
    }
  } catch (error) {
    source = "fallback";
  }

  const course = buildCourseFromUnits(parseSyllabus(text));
  course.source = source;
  return course;
}
