import Dexie, { type EntityTable } from "dexie";

import { APP_NAME } from "utils/constants";

const lowerCasedAppName = APP_NAME.toLowerCase();

const database = new Dexie(lowerCasedAppName) as Dexie & {
  matches: EntityTable<any>;
  profiles: EntityTable<any>;
};

// & = Unique index
database.version(1).stores({
  matches: "&uuid",
  profiles: "&uuid",
});

export default database;
