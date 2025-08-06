import { openDB } from "idb";

const DB_NAME = "EcommerceDB";
const STORE_NAME = "users";

const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
    },
  });
};

export const saveuser = async (user: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.put(user);
  await tx.done;
};

export const getUserByEmail = async (email: string) => {
  const db = await initDB();
  return await db.get(STORE_NAME, email);
};
