import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import { Box, Typography, Button, 
     Paper, Grid } from '@mui/material';
import { getProductById, type Product } from '../../../Utilities/database';
import styles from './Product.module.scss';
import UserAvatar from '../../../components/nav/UserAvatar';
import NotFoundPage from '../../NotFoundPage.tsx/NotFoundPage';
import Modal from "react-bootstrap/Modal";
import { RotateLoader } from "react-spinners";


const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Get the ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setIsLoading(true);
        const data = await getProductById(productId);
        setProduct(data || null);
        setTimeout(()=>{
            setIsLoading(false);
        },1000);
      };
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) {
    return (
        <Modal show={true} centered>
      <Modal.Body style={{ textAlign: "center", padding:"3rem" }}>
    <RotateLoader color="#4a90e2" />
        <p className="mt-3">Loading...</p>
      </Modal.Body>
    </Modal>
    );
  }

  if (!product) {
    return (
      <NotFoundPage/>
    );
  }

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
        <Paper sx={{ p: 4, margin: 'auto', marginTop:5, maxWidth: 1000, flexGrow: 1,padding:5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 400,
              objectFit: 'contain',
              border: '1px solid #ddd',
              borderRadius: 2
            }}
            alt={product.name}
            src={product.image}
          />
        </Grid>
        <Grid item xs={12} md={6} container direction="column">
          <Typography component="h1" variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ my: 2 }}>
            ₹{product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Added by: {product.addedBy}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button component={Link} to="/dashboard" variant="outlined" sx={{ mt: 2, alignSelf: 'flex-start' }}>
            Back to All Products
          </Button>
        </Grid>
      </Grid>
    </Paper>
      </main>
    </div>
    //
    
  );
};

export default ProductDetailPage;