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

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS tags (
          id VARCHAR(255) PRIMARY KEY,
          name TEXT NOT NULL,
          color VARCHAR(7) NOT NULL
        );
      `);
    });
  }
}