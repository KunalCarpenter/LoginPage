import { openDB } from "idb";

const DB_NAME = "EcommerceDB";
const DB_VERSION = 2; // change database version manually when adding new database
const STORE_NAME = "users";
const PRODUCT_STORE = "products";

const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
      if (!db.objectStoreNames.contains(PRODUCT_STORE)) {
        //db.createObjectStore(PRODUCT_STORE, { keyPath: "id", autoIncrement: true });
        db.createObjectStore(PRODUCT_STORE, { keyPath: "id"});
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

export type Product = {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  addedBy: string;
};

export const addProduct = async (product: Product) => {
  const db = await initDB();
  //

  // Get all existing products
  const allProducts = await db.getAll(PRODUCT_STORE);
  const usedIds = allProducts
    .map(p => p.id as number)
    .sort((a, b) => a - b);

  // Find the smallest available ID starting from 1
  let newId = 1;
  for (let id of usedIds) {
    if (id === newId) {
      newId++;
    } else {
      break;
    }
  }

  product.id = newId; // Assign found ID

  //
  const tx = db.transaction(PRODUCT_STORE, "readwrite");
  await tx.store.add(product);
  await tx.done;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const db = await initDB();
  return await db.getAll(PRODUCT_STORE);
};

export const updateProduct = async (updatedProduct: Product) => {
  if (!updatedProduct.id) return;
  const db = await initDB();
  const tx = db.transaction(PRODUCT_STORE, "readwrite");
  await tx.store.put(updatedProduct);
  await tx.done;
};

export const deleteProduct = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(PRODUCT_STORE, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
