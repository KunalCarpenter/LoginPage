import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../Utilities/database";
import { getUser } from "../../../utils/storage";
import ProductTable from "../../../components/product/ProductTable";
import ProductFormModal from "../../../components/product/ProductFromModal";
import styles from "./ProductEditor.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import UserAvatar from "../../../components/nav/UserAvatar";
import { exportToCSV } from "../../../utils/exportToCSV";
import { exportToXlsx } from "../../../utils/exportToXlsx";
import { Menu, MenuItem } from "@mui/material";
import { importXlsx } from "../../../utils/import/importXlsx";
import ImportLoaderModal from "../../../utils/import/importLoaderModal";
import ImportPreviewModal from "../../../utils/import/importPreviewModal";

const ProductEditor: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  //

  const validKey = ["Name", "Description", "Category", "Price", "Image URL"];
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [importedProducts, setImportedProducts] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoadingModal(true);

    try {
      const data: any = await importXlsx(file);

      const validData = data
        .filter((row: any) =>
          validKey.every((key) => row[key] !== undefined && row[key] !== "")
        )
        .map((row: any, idx: number) => ({
          id: idx + 1, // Required for DataGrid
          ...row,
        }));

      setImportedProducts(validData);
      setTimeout(() => {
        setIsLoadingModal(false);
        setIsPreviewModal(true);
      }, 3000);
    } catch (err) {
      console.error("Import error:", err);
      setIsLoadingModal(false);
    }
  };

  const handleSaveSelected = async () => {
    const toSave = importedProducts
      .filter((p) => selectedRows.map(Number).includes(Number(p.id)))
      .map((p) => ({
        //id: Date.now(),
        name: p.Name,
        price: p.Price,
        description: p.Description,
        category: p.Category,
        image: p["Image URL"],
        addedBy: "Imported",
      }));

    for (const product of toSave) {
      await addProduct(product);
    }

    setIsPreviewModal(false);
    loadProducts();
  };

  //

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

    const newProduct = {
      ...product,
      addedBy: `${user.firstname} ${user.lastname}`,
    };

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

  const handleDeleteProduct = async (id: string) => {
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
          <button onClick={handleAddProduct} className={styles.button}>
            + Add Product
          </button>

          <>
            <button
              className={styles.button}
              onClick={() => document.getElementById("import-file")?.click()}
            >
              Import
            </button>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImportFile}
              id="import-file"
              style={{ display: "none" }}
            />

            <ImportLoaderModal show={isLoadingModal} />

            <ImportPreviewModal
              show={isPreviewModal}
              onClose={() => setIsPreviewModal(false)}
              products={importedProducts}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              onSave={handleSaveSelected}
            />
          </>

          <button
            className={styles.button}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Export
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={exportProductCSV}>Download as CSV</MenuItem>
            <MenuItem onClick={exportProductXLSX}>Download as xlsx</MenuItem>
          </Menu>
        </span>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      <div>
        <ProductFormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
          initialData={editingProduct || undefined}
        />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default ProductEditor;
