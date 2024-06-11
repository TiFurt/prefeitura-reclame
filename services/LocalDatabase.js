import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('local.db');

export const initDb = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS claims (
      id VARCHAR(255) PRIMARY KEY,
      date DATETIME NOT NULL,
      description TEXT NOT NULL,
      latitude DECIMAL(10,6) NOT NULL,
      longitude DECIMAL(10,6) NOT NULL,
      name TEXT NOT NULL,
      tags TEXT,
      user VARCHAR(255) NOT NULL,
      deletedAt DATETIME
    );`
  );
}

export const saveClaims = async (claims) => {
  const localClaims = await getAllClaims();

  for (const claim of claims) {
    const exists = localClaims.find(c => c.id === claim.id);
    const tagsJson = JSON.stringify(claim.tags).replace(/"/g, '""');

    if (!exists) {
      const createSql = `
        INSERT INTO claims (id, date, description, latitude, longitude, name, tags, user, deletedAt)
        VALUES ("${claim.id}", "${claim.date}", "${claim.description}", ${claim.location.latitude}, ${claim.location.longitude}, "${claim.name}", "${tagsJson}", "${claim.userId}", "${claim.deletedAt}");`

      try {
        await db.execAsync(createSql);
      } catch (error) {
        console.error(error);
      }

      continue;
    }

    const updateSql = `
      UPDATE claims
      SET date = "${claim.date}", description = "${claim.description}", latitude = ${claim.location.latitude}, longitude = ${claim.location.longitude}, name = "${claim.name}", tags = "${tagsJson}", user = "${claim.userId}", deletedAt = "${claim.deletedAt}"
      WHERE id = "${claim.id}";`

    try {
      await db.execAsync(updateSql);
    } catch (error) {
      console.error(error);
    }
  }
}

export const getAllClaims = async () => {
  return await db.getAllAsync("SELECT * FROM claims;");
}
