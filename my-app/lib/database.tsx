import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const db = SQLite.openDatabaseSync("tasks.db");

export function initDatabase() {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Database init error:", error);
  }
}

export function addTask(title: string, description: string, status: string) {
  db.runSync(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description, status]
  );
}

export function updateTask(id: number, title: string, description: string, status: string) {
  db.runSync(
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, description, status, id]
  );
}

export function deleteTask(id: number) {
  db.runSync("DELETE FROM tasks WHERE id = ?", [id]);
}

export function getTasks(): Task[] {
  return db.getAllSync("SELECT * FROM tasks ORDER BY id DESC") as Task[];
}