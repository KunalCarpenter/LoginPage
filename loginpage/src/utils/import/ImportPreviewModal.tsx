import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { colors } from '@mui/material';

// The props have changed: we no longer need selection props.
// onSave will now pass the final list of products to be saved.
interface ImportPreviewModalProps {
  show: boolean;
  onClose: () => void;
  products: any[];
  onSave: (productsToSave: any[]) => void;
}

const ImportPreviewModal: React.FC<ImportPreviewModalProps> = ({
  show,
  onClose,
  products,
  onSave,
}) => {
  // We need internal state to manage the list of products that are visible.
  const [visibleProducts, setVisibleProducts] = useState<any[]>([]);

  // This effect resets the list every time the modal is opened.
  useEffect(() => {
    if (show) {
      setVisibleProducts(products);
    }
  }, [products, show]);

  // Handler to remove a product from the list.
  const handleDelete = (idToDelete: number) => {
    setVisibleProducts((currentProducts) =>
      currentProducts.filter((p) => p.id !== idToDelete)
    );
  };

  // Handler for the main save button.
  const handleSave = () => {
    onSave(visibleProducts);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Preview Products to Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Typography variant="caption" color="text.secondary" gutterBottom>
Select Products to import.        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {visibleProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  // The delete button is positioned here.
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className="delete-button" // Class for CSS targeting.
                    sx={{ opacity: 0, transition: 'opacity 0.2s' }} // Hidden by default.
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                // This is the CSS magic: on hover, the delete button becomes visible.
                sx={{
                  '&:hover .delete-button': {
                    opacity: 1,
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={product.Name}
                    src={product['Image URL']}
                    variant="rounded"
                    sx={{ width: 56, height: 56, margin:1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.Name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block' }}
                      >
                        {`Price: Rs.${product.Price} — Category: ${product.Category}`}
                      </Typography>
                      {product.Description}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < visibleProducts.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          disabled={visibleProducts.length === 0}
          style={{ backgroundColor: '#4a90e2' }}
        >
          {`Import ${visibleProducts.length} Product(s)`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportPreviewModal;