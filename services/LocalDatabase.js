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
      deletedAt DATETIME DEFAULT NULL
    );`
  );
}

export const saveClaims = async (claims) => {
  claims = claims.filter(c => !c.deletedAt);
  const localClaims = await getAllClaims();
  const toDelete = localClaims.filter(c => !claims.find(r => r.id === c.id));
  await deleteClaims(toDelete);

  for (const claim of claims) {
    const exists = localClaims.find(c => c.id === claim.id);
    const tagsJson = JSON.stringify(claim.tags).replace(/"/g, '""');

    if (!exists) {
      const createSql = `
        INSERT INTO claims (id, date, description, latitude, longitude, name, tags, user, deletedAt)
        VALUES ("${claim.id}", "${claim.date}", "${claim.description}", ${claim?.location?.latitude ?? 0}, ${claim?.location?.longitude ?? 0}, "${claim.name}", "${tagsJson}", "${claim.userId}", "${claim.deletedAt ?? 'NULL'}");`

      try {
        await db.execAsync(createSql);
      } catch (error) {
        console.error('create', error, claim.id);
      }

      continue;
    }

    const updateSql = `
      UPDATE claims
      SET date = "${claim.date}", description = "${claim.description}", latitude = ${claim?.location?.latitude ?? 0}, longitude = ${claim?.location?.longitude ?? 0}, name = "${claim.name}", tags = "${tagsJson}", user = "${claim.userId}", deletedAt = "${claim.deletedAt ?? 'NULL'}"
      WHERE id = "${claim.id}";`

    try {
      await db.execAsync(updateSql);
    } catch (error) {
      console.error('update', error, claim.id);
    }
  }
}

export const deleteClaims = async (claims) => {
  for (const claim of claims) {
    const deleteSql = `
      DELETE FROM claims
      WHERE id = "${claim.id}";`

    try {
      await db.execAsync(deleteSql);
    } catch (error) {
      console.error(error);
    }
  }
}

export const getAllClaims = async (ignoreDeletedAt = true) => {
  if (ignoreDeletedAt) {
    return await db.getAllAsync("SELECT * FROM claims;");
  }

  return await db.getAllAsync("SELECT * FROM claims WHERE deletedAt IS NULL;");
}
