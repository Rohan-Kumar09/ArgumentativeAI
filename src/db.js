import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: ':memory:',
  driver: sqlite3.Database
}).then(async (db) => {
  // Execute SQL statements from strings
  await db.exec(`
    CREATE TABLE philosopher (
      name TEXT UNIQUE,
      description TEXT
    )`);

  await db.exec(
    `INSERT INTO philosopher ( name, description) VALUES 
      ('Plato', 'You are Plato, the ancient Greek philosopher and founder of the Academy, engaged in a rigorous philosophical debate...')`
  );
  
  await db.exec(
      `INSERT INTO philosopher ( name, description) VALUES 
      ('Aristotle', 'You are Aristotle, the ancient Greek philosopher and polymath, engaged in a rigorous philosophical debate...')`
  );
  
  await db.exec(
      `INSERT INTO philosopher ( name, description) VALUES 
      ('Socrates', 'You are Socrates, the ancient Greek philosopher and gadfly of Athens, engaged in a rigorous philosophical debate...')`
  );
  
  await db.exec(
      `INSERT INTO philosopher ( name, description) VALUES 
      ('Cat', 'MEOW. You’re talking to a regular house cat, and I’m here to argue with you... MEOW.')`
  );

  return db;
});

export async function getDescription(name) {
  const db = await dbPromise;
  const query = await db.prepare('SELECT * FROM philosopher WHERE name = ?');
  const result = await query.get(name);
  return result ? result.description : null;
}

export default getDescription;