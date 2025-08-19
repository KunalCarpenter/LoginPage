import {
  //Outlet,
  NavLink,
  useNavigate,
  //useOutlet
} from "react-router-dom";
import styles from "./Dashboard.module.scss";
import UserAvatar from "../../../components/nav/UserAvatar";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { getAllProducts, type Product } from "../../../Utilities/database";
import FilterPanel from "./FilterPanel";
import ProductCard from "./ProductCard";
//import { border } from "@mui/system";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  //const outlet = useOutlet(); // This hook checks if a child route is active
  const PRODUCTS_PER_PAGE = 8;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories);
  }, [products]);

  const handleCategoryChange = (category: string) => {
    const currentCategories = searchParams.getAll("category") || [];
    let newCategories: string[];
    if (currentCategories.includes(category)) {
      newCategories = currentCategories.filter((c) => c !== category);
    } else {
      newCategories = [...currentCategories, category];
    }
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, category: newCategories, page: "1" });
  };
  //
  const handleSearchChange = (text: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newSearchParams = { ...currentParams, search: text, page: "1" };

    // If the search text is empty, remove the parameter from the URL
    if (!text) {
      delete (newSearchParams as any).search;
    }

    setSearchParams(newSearchParams);
  };
  //

  const { paginatedProducts, pageCount } = useMemo(() => {
    const selectedCategories = searchParams.getAll("category");
    const searchText = searchParams.get("search")?.toLowerCase() || "";

    let filtered = products;

    if (searchText) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText) ||
          product.price.toString().includes(searchText) ||
          product.category.toLowerCase().includes(searchText)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    const page = parseInt(searchParams.get("page") || "1", 10);
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const paginated = filtered.slice(start, end);
    const count = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    return { paginatedProducts: paginated, pageCount: count };
  }, [products, searchParams]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, page: value.toString() });
  };

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
          <div className={styles.About}>
            <NavLink to="/dashboard/about">About</NavLink>
          </div>
        </nav>
        <UserAvatar />
      </header>
      <main className={styles.content}>
        <Box sx={{ display: "flex" }} className={styles.Box}>
          <Box sx={{ width: "250px", flexShrink: 0 }}>
            <FilterPanel
              categories={uniqueCategories}
              selectedCategories={searchParams.getAll("category")}
              onCategoryChange={handleCategoryChange}
              searchText={searchParams.get("search") || ""}
              onSearchChange={handleSearchChange}
            />
          </Box>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={parseInt(searchParams.get("page") || "1", 10)}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
        {/* <Outlet /> */}
        {/* {outlet || HomePageContent} */}
      </main>
    </div>
  );
};

export default Dashboard;
