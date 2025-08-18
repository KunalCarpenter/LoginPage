import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productFormSchema } from "../../utils/validations";

interface ProductFormProps {
  initialData?: any;
  onSave: (product: any) => void;
}
//
const productCategories = [
  //'Select Category...',
  'Electronics',
  'Books',
  'Clothing',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Personal Care',
  'Automotive',
  'Jewelry',
];
//
const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave }) => {
  return (
    <Formik
      initialValues={{
        name: initialData?.name || "",
        price: initialData?.price || "",
        description: initialData?.description || "",
        category: initialData?.category || "",
        image: initialData?.image || "",
      }}
      validationSchema={productFormSchema}
      onSubmit={(values) => {
        onSave({
          ...initialData,
          ...values,
          price: Number(values.price),
        });
      }}
    >
      {() => (
        <Form className="p-2">
          <div className="mb-3">
            <label>Product Name</label>
            <Field name="name" className="form-control" placeHolder="Enter Name"/>
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <Field name="price" type="number" className="form-control" placeHolder="Enter price"/>
            <ErrorMessage name="price" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <Field
              as="textarea"
              rows={3}
              name="description"
              className="form-control"
              placeHolder="Enter product desicription"
            />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <Field name="category" className="form-control" as="select">
                <option value="" disabled>Select a category...</option>

              {productCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
              </Field>
            <ErrorMessage name="category" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Image URL</label>
            <Field name="image" className="form-control" placeHolder="Enter Image URL"/>
            <ErrorMessage name="image" component="div" className="text-danger" />
          </div>

          
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
