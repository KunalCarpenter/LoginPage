import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface ProductFormProps {
  initialData?: any;
  onSave: (product: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [image, setImage] = useState(initialData?.image || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...initialData,
      name,
      price: Number(price),
      description,
      category,
      image,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-2">
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image link" required />
      </Form.Group>
    </Form>
  );
};

export default ProductForm;
