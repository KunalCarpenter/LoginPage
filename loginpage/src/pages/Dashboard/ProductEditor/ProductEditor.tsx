import React, { useEffect, useState } from "react";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../../Utilities/database";
import { getUser } from "../../../utils/storage";
import ProductTable from "../../../components/product/ProductTable";
import ProductFormModal from "../../../components/product/ProductFromModal";
import styles from "./ProductEditor.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import UserAvatar from "../../../components/nav/UserAvatar";
import { exportToCSV } from "../../../utils/exportToCSV";
import { exportToXlsx } from "../../../utils/exportToXlsx";
import { Menu, MenuItem } from "@mui/material";

const ProductEditor: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    const reversed = [...data].reverse();
    setProducts(reversed);
    //setProducts(data);
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

  const exportProductCSV = async () => {
    const product = await getAllProducts();
    const reversed = [...product].reverse();
    exportToCSV(reversed, "data.csv");
    //exportToXlsx(reversed, "data.xlsx");
  };
  const exportProductXLSX = async () => {
    const product = await getAllProducts();
    //exportToCSV(product, "data.csv");
    const reversed = [...product].reverse();
    exportToXlsx(reversed, "data.xlsx");
  };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    

  return (
    <div className={styles.wrapper}>
      <header className={styles.navbar}>
        <div>
          <img
            src="/logo.svg"
            alt="Logo"
            height="50"
            style={{ borderRadius: "50%" }}
            onClick={() => navigate("/dashboard")}
          />
        </div>
        <nav className={styles.navLinks}>
          <div className={styles.Home}>
          <NavLink to="/dashboard">Home</NavLink>
          </div>
          <div className={styles.ProductEditor}> 
          <NavLink to="/dashboard/product-editor">Product Editor</NavLink>
          </div>
        </nav>
        <UserAvatar />
      </header>
      <div className={styles.header}>
        <span>
        <h2>Product Editor</h2>
        </span>
        <span className={styles.buttons}>
          <button onClick={handleAddProduct} className={styles.button}>+ Add Product</button>
          <button className={styles.button}
            //onClick={importProduct}
          >
            Import
          </button>
          <button className={styles.button}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            >
            Export
          </button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={exportProductCSV}>Download as CSV</MenuItem>
            <MenuItem onClick={exportProductXLSX}>Download as xlsx</MenuItem>
          </Menu>
        </span>
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
      <div className={styles.footer}>
      </div>
    </div>
  );
};

export default ProductEditor;
