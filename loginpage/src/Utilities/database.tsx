//import bcrypt from "bcryptjs";
const DB_NAME = "EcommerceDB";
const STORE_NAME = "users";
const DB_VERSION = 1;

export type AuthType = "GOOGLE_SSO" | "MANUAL";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  authType: AuthType;
  createdAt: Date;
}

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject("Error opening IndexedDB");
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
    };
  });
};

export const saveuser = async (user: User): Promise<void> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const existing = await store.get(user.email);

  return new Promise((resolve, reject) => {
    existing.onsuccess = () => {
      if (existing.result) {
        reject("Email already exists");
      } else {
        //const hashedPassword = bcrypt.hash(user.password, 10);
        store.put(user);
        //store.put({password : hashedPassword});
        resolve();
      }
    };
    existing.onerror = () => reject("Failed to check existing user");
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(email);

    request.onsuccess = () => {
      resolve(request.result ?? null);
    };
    request.onerror = () => reject("Failed to fetch user");
  });
};
