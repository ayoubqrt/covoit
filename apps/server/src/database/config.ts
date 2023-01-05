import { EntityManager, MikroORM } from "@mikro-orm/postgresql";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql"; // or any other driver package

export const configDB = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ["./dist/entities"], // path to our JS entities (dist), relative to `baseDir`
    entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
    dbName: "my-db-name",
    type: "postgresql",
  });

  console.log(orm.em); // access EntityManager via `em` property

  const em = orm.em as EntityManager;
};
