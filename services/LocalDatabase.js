import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('local.db');

export const initDb = async () => {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS claims (
        id VARCHAR(255) PRIMARY KEY,
        date DATETIME NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        latitude DECIMAL(10,6) NOT NULL,
        longitude DECIMAL(10,6) NOT NULL,
        name TEXT NOT NULL,
        tags TEXT,
        user VARCHAR(255) NOT NULL
      );`
  );
}

export const saveClaims = async (claims) => {
  const localClaims = await getAllClaims();

  const createSql = `
    INSERT INTO claims (id, date, description, image, latitude, longitude, name, tags, user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  db.transaction(tx => {
    claims.forEach(claim => {
      const exists = localClaims.find(c => c.id === claim.id);
      if (!exists) {
        tx.executeSql(createSql,
          [claim.id, claim.date, claim.description, claim.image, claim.latitude, claim.longitude, claim.name, claim.tags, claim.user],
          (_, result) => console.log(true, result),
          (_, error) => console.log(false, error)
        );
      }
    });
  });
}

export const getAllClaims = async () => {
  const result = await db.getAllAsync("SELECT * FROM claims;");
  console.log('getAllClaims', result);
  return result;
}