/* ============================================================
   DBMS COURSE ROADMAP DATA
   Unit 1 is mapped directly from syllabus.txt for this phase.
   Keep this file as the UI data source for chapter sequencing.
   ============================================================ */

const UNITS = [
  { id: 1, name: "Introduction and ER Model" },
];

const CHAPTERS = [
  {
    id: 1,
    unit: 1,
    name: "Introduction to Database Systems",
    topics: "Overview | Database System vs File System | Database System Concept and Architecture | Data Model, Schema and Instances | Data Independence | Database Languages and Interfaces | DDL | DML | Overall Database Structure",
    difficulty: "Beginner",
    time: "2.5 hrs",
    file: "unit-1/chapter1.html",
    available: true,
  },
  {
    id: 2,
    unit: 1,
    name: "ER Model Concepts, Notation and Keys",
    topics: "ER Model Concepts | Notation for ER Diagram | Mapping Constraints | Keys | Super Key | Candidate Key | Primary Key",
    difficulty: "Beginner",
    time: "3 hrs",
    file: null,
    available: false,
  },
  {
    id: 3,
    unit: 1,
    name: "Advanced ER and EER Modeling",
    topics: "Generalization | Aggregation | Reduction of ER Diagrams to Tables | Extended ER Model | Relationship of Higher Degree",
    difficulty: "Intermediate",
    time: "2.5 hrs",
    file: null,
    available: false,
  },
];
