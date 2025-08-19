import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography} from '@mui/material';
import styles from "./NotFoundPage.module.scss";
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for does not exist.
      </Typography>
      <button className={styles.button} onClick={() => navigate('/dashboard')}>
        Go Back to Home
      </button>
    </Box>
  );
};

export default NotFoundPage;