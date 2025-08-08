import React, { useEffect, useState } from "react";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../../Utilities/database";
import { getUser } from "../../../utils/storage";
import ProductTable from "../../../components/product/ProductTable";
import ProductFormModal from "../../../components/product/ProductFromModal";
import styles from "./ProductEditor.module.scss";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../../components/nav/UserAvatar";

const ProductEditor: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleSaveProduct = async (product: any) => {
    const user = getUser();
    if (!user) return;

    const newProduct = { ...product, addedBy: `${user.firstname} ${user.lastname}` };

    if (product.id) {
      await updateProduct(newProduct);
    } else {
      await addProduct(newProduct);
    }

    setShowModal(false);
    loadProducts();
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.navbar}>
        <div className={styles.logo}>🛒 E-Commerce</div>
        <nav className={styles.navLinks}>
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/dashboard/product-editor">Product Editor</NavLink>
        </nav>
        <UserAvatar />
      </header>
      <div className={styles.header}>
        <h2>Product Editor</h2>
        <button onClick={handleAddProduct}>+ Add Product</button>
      </div>
      <ProductTable products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
      <div >
      <ProductFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct || undefined}
        />
      </div>
    </div>
  );
};

export default ProductEditor;
