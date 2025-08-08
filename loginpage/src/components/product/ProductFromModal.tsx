import React from "react";
import { Button, Modal } from "react-bootstrap";
import ProductForm from "./ProductForm";

interface ProductFormModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  initialData?: any;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ show, onClose, onSave, initialData }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm initialData={initialData} onSave={onSave} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            const form = document.querySelector("form");
            if (form) {
              form.dispatchEvent(new SubmitEvent("submit", { cancelable: true, bubbles: true }));
            }
          }}
        >
          Save Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;
