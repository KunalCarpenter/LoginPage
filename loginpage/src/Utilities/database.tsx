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
  //SerialNumber: number,
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  addedBy: string;
  //
  createdAt: number;
  //
};


//let LastGeneratedId =0;

export const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
  const db = await initDB();
  //

  // Get all existing products
  // const allProducts = await db.getAll(PRODUCT_STORE);
  // const usedIds = allProducts
  //   .map(p => p.SerialNumber as number)
  //   .sort((a, b) => a - b);

  //Find the smallest available ID starting from 1
  // let newSerialNumber = 1;
  // for (let SerialNumber of usedIds) {
  //   if (SerialNumber === newSerialNumber) {
  //     newSerialNumber++;
  //   } else {
  //     break;
  //   }
  // }

  //product.SerialNumber = newSerialNumber; // Assign found ID
  
  ////product.id = Date.now();

  //


  let newId = crypto.randomUUID();

  // if(newId <= LastGeneratedId){
  //   newId= LastGeneratedId + 1;
  // }

  // LastGeneratedId = newId;

  const newProductWithId : Product = {
    ...product,
    id: newId,
    createdAt: Date.now(),
  };

  const tx = db.transaction(PRODUCT_STORE, "readwrite");
  await tx.store.add(newProductWithId);
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

export const deleteProduct = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction(PRODUCT_STORE, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};

export const getProductById = async (id : string) : Promise <Product | undefined> => {
 const db = await initDB();
 return await db.get(PRODUCT_STORE,  id);
};