import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import type { Product } from '../../../Utilities/database';

import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/dashboard/${product.id}`} style={{textDecoration:'none'}}>
    <Card sx={{ maxWidth: 345, height: '100%',borderRadius:2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 1 }} 
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://www.posindonesia.co.id/_next/image?url=https%3A%2F%2Fadmin-piol.posindonesia.co.id%2Fmedia%2Fimage-not-found-placeholder.png&w=1920&q=75";
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          height: 40,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" color="text.primary">
            {product.category}
          </Typography>
          <Typography variant="h6" color="primary">
            ₹{product.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
          </Link>
  );
};

export default ProductCard;