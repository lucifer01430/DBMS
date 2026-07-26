/* ============================================================
   DBMS ROADMAP — AKTU SYLLABUS DATA
   Single source of truth for chapters, units and syllabus text.
   Every chapter below maps 1:1 to a phrase in the official
   AKTU DBMS syllabus. Nothing added, nothing skipped.
   ============================================================ */

const UNITS = [
  { id: 1, name: "Introduction & ER Model" },
  { id: 2, name: "Relational Model, Relational Algebra & SQL" },
  { id: 3, name: "Database Design & Normalization" },
  { id: 4, name: "Transaction Processing Concepts" },
  { id: 5, name: "Concurrency Control Techniques" },
];

const CHAPTERS = [
  {
    id: 1, unit: 1, name: "Introduction to Database Systems",
    topics: "Overview \u00b7 DB System vs File System \u00b7 DB Concept & Architecture \u00b7 Data Model, Schema & Instances \u00b7 Data Independence \u00b7 Database Languages & Interfaces \u00b7 DDL \u00b7 DML \u00b7 Overall Database Structure",
    difficulty: "Beginner", time: "2.5 hrs", file: "unit-1/chapter1.html", available: true
  },
  {
    id: 2, unit: 1, name: "ER Model \u2014 Concepts, Notation & Keys",
    topics: "ER Model Concepts \u00b7 Notation for ER Diagram \u00b7 Mapping Constraints \u00b7 Keys \u00b7 Super Key \u00b7 Candidate Key \u00b7 Primary Key",
    difficulty: "Beginner", time: "3 hrs", file: null, available: false
  },
  {
    id: 3, unit: 1, name: "ER Model \u2014 Advanced Concepts",
    topics: "Generalization \u00b7 Aggregation \u00b7 Reduction of ER Diagram to Tables \u00b7 Extended ER (EER) Model \u00b7 Relationship of Higher Degree",
    difficulty: "Intermediate", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 4, unit: 2, name: "Relational Model & Integrity Constraints",
    topics: "Relational Data Model Concepts \u00b7 Integrity Constraints \u00b7 Entity Integrity \u00b7 Referential Integrity \u00b7 Keys Constraints \u00b7 Domain Constraints",
    difficulty: "Beginner", time: "2 hrs", file: null, available: false
  },
  {
    id: 5, unit: 2, name: "Relational Algebra & Relational Calculus",
    topics: "Relational Algebra \u00b7 Relational Calculus \u00b7 Tuple Calculus \u00b7 Domain Calculus",
    difficulty: "Intermediate", time: "3 hrs", file: null, available: false
  },
  {
    id: 6, unit: 2, name: "Introduction to SQL",
    topics: "Characteristics of SQL \u00b7 Advantages of SQL \u00b7 SQL Data Types & Literals \u00b7 Types of SQL Commands \u00b7 SQL Operators & Their Procedure",
    difficulty: "Beginner", time: "2 hrs", file: null, available: false
  },
  {
    id: 7, unit: 2, name: "SQL \u2014 Tables, Views & Indexes",
    topics: "Creating Tables \u00b7 Views \u00b7 Indexes",
    difficulty: "Beginner", time: "2 hrs", file: null, available: false
  },
  {
    id: 8, unit: 2, name: "SQL \u2014 Queries & Sub-Queries",
    topics: "Queries \u00b7 Sub Queries",
    difficulty: "Intermediate", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 9, unit: 2, name: "SQL \u2014 Aggregate Functions & DML Operations",
    topics: "Aggregate Functions \u00b7 Insert \u00b7 Update \u00b7 Delete Operations",
    difficulty: "Beginner", time: "1.5 hrs", file: null, available: false
  },
  {
    id: 10, unit: 2, name: "SQL \u2014 Joins, Unions, Intersection & Minus",
    topics: "Joins \u00b7 Unions \u00b7 Intersection \u00b7 Minus",
    difficulty: "Intermediate", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 11, unit: 2, name: "Cursors in SQL / PL-SQL",
    topics: "Cursors in SQL/PL SQL",
    difficulty: "Intermediate", time: "1.5 hrs", file: null, available: false
  },
  {
    id: 12, unit: 2, name: "PL/SQL \u2014 Procedures & Triggers",
    topics: "Procedures in SQL/PL SQL \u00b7 Triggers",
    difficulty: "Intermediate", time: "2 hrs", file: null, available: false
  },
  {
    id: 13, unit: 3, name: "Functional Dependencies & Normalization Basics",
    topics: "Functional Dependencies \u00b7 Inclusion Dependence \u00b7 Normalization using FD \u00b7 Why We Normalize",
    difficulty: "Intermediate", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 14, unit: 3, name: "Normal Forms \u2014 1NF, 2NF, 3NF",
    topics: "First Normal Form \u00b7 Second Normal Form \u00b7 Third Normal Form",
    difficulty: "Intermediate", time: "3 hrs", file: null, available: false
  },
  {
    id: 15, unit: 3, name: "BCNF & Multivalued Dependencies",
    topics: "Boyce-Codd Normal Form (BCNF) \u00b7 Multivalued Dependency (MVD) \u00b7 4NF",
    difficulty: "Advanced", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 16, unit: 3, name: "Join Dependencies & Alternative Design Approaches",
    topics: "Join Dependencies (JD) \u00b7 Lossless Join Decomposition \u00b7 Alternative Approaches to Database Design",
    difficulty: "Advanced", time: "2 hrs", file: null, available: false
  },
  {
    id: 17, unit: 4, name: "Transaction System & Serializability",
    topics: "Transaction System \u00b7 Testing of Serializability \u00b7 Serializability of Schedules \u00b7 Conflict & View Serializable Schedule",
    difficulty: "Intermediate", time: "3 hrs", file: null, available: false
  },
  {
    id: 18, unit: 4, name: "Recoverability & Log-Based Recovery",
    topics: "Recoverability \u00b7 Recovery from Transaction Failures \u00b7 Log Based Recovery \u00b7 Checkpoints",
    difficulty: "Intermediate", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 19, unit: 4, name: "Deadlock Handling & Distributed Databases",
    topics: "Deadlock Handling \u00b7 Distributed Data Storage \u00b7 Concurrency Control (Distributed) \u00b7 Directory System",
    difficulty: "Advanced", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 20, unit: 5, name: "Concurrency Control & Locking Techniques",
    topics: "Concurrency Control \u00b7 Locking Techniques for Concurrency Control",
    difficulty: "Intermediate", time: "2.5 hrs", file: null, available: false
  },
  {
    id: 21, unit: 5, name: "Timestamping & Validation-Based Protocols",
    topics: "Time Stamping Protocols for Concurrency Control \u00b7 Validation Based Protocol",
    difficulty: "Advanced", time: "2 hrs", file: null, available: false
  },
  {
    id: 22, unit: 5, name: "Multiple Granularity, Multiversion Schemes & Oracle Case Study",
    topics: "Multiple Granularity \u00b7 Multi Version Schemes \u00b7 Recovery with Concurrent Transaction \u00b7 Case Study of Oracle",
    difficulty: "Advanced", time: "2 hrs", file: null, available: false
  },
];
