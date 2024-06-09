import * as SQLite from 'expo-sqlite';

export default class LocalDatabaseService {
  static instance = null;

  static getInstance() {
    if (LocalDatabaseService.instance == null) {
      LocalDatabaseService.instance = new LocalDatabaseService();
    }

    return LocalDatabaseService.instance;
  }

  db = SQLite.openDatabase("local.db");

  initDb() {
    this.db.transaction(tx => {
      tx.executeSql(`
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
        );
      `);
    });
  }

  saveClaims(claims) {
    this.db.transaction(tx => {
      // claims.forEach(claim => {
      //   tx.executeSql(`
      //     INSERT INTO claims (id, date, description, image, latitude, longitude, name, tags, user)
      //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      //   `, [
      //     claim.id,
      //     claim.date,
      //     claim.description,
      //     claim.image,
      //     claim.latitude,
      //     claim.longitude,
      //     claim.name,
      //     JSON.stringify(claim.tags),
      //     claim.userId
      //   ],
      //     (_, result) => console.log(result),
      //     (_, error) => console.log(error));
      // });

      tx.executeSql(`
        INSERT INTO claims (id, date, description, image, latitude, longitude, name, tags, user)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `, [
        claims[0].id,
        claims[0].date,
        claims[0].description,
        claims[0].image,
        claims[0].latitude,
        claims[0].longitude,
        claims[0].name,
        JSON.stringify(claims[0].tags),
        claims[0].userId
      ],
        (_, result) => console.log(result),
        (_, error) => console.log(error));
    });
  }
}