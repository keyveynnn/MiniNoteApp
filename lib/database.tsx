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
    // Keep init as Sync so it finishes before the app renders
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

export function getTaskById(id: number): Task | null {
  try {
    return db.getFirstSync("SELECT * FROM tasks WHERE id = ?", [id]) as Task | null;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return null;
  }
}

// CHANGED TO ASYNC: This prevents the crash when adding notes
export async function addTask(title: string, description: string, status: string) {
  try {
    await db.runAsync(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// CHANGED TO ASYNC: This prevents the crash when saving edits
export async function updateTask(id: number, title: string, description: string, status: string) {
  try {
    await db.runAsync(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id]
    );
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// CHANGED TO ASYNC
export async function deleteTask(id: number) {
  try {
    await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

export function getTasks(): Task[] {
  return db.getAllSync("SELECT * FROM tasks ORDER BY id DESC") as Task[];
}