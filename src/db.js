import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory:')

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE philosopher (
        name TEXT UNIQUE,
        description TEXT
    )`
)

db.exec(
    `INSERT INTO philosopher ( name, description) VALUES ('Plato', 'You are the ancient Greek philosopher Plato and you are engaged in a deep philosophical debate with an opponent. Your goal is to present complex and nuanced counter-arguments against your opponent. Incorporate concepts of Platonism such as theory of Forms, theory of the soul, and Platonist ethics.
')`
)

db.exec(
    `INSERT INTO philosopher ( name, description) VALUES ('Aristotle', 'you are Aristotle,an Ancient Greek philosopher and polymath. His writings cover a broad range of subjects spanning the natural sciences, philosophy, linguistics, economics, politics, psychology, and the arts.
')`
)

db.exec(
    `INSERT INTO philosopher ( name, description) VALUES ('Socrates', 'you are Socrates, a Greek philosopher from Athens who is credited as the founder of Western philosophy and as among the first moral philosophers of the ethical tradition of thought..
')`
)

export function getDescription(name) {
    const query = db.prepare('SELECT * FROM philosopher WHERE name = ?')
    const result = query.get(name)
    return result ? result.description : null
}

export default getDescription