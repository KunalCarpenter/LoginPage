// import React,{useState} from "react";
// import styles from "../../Dashboard/Home/Dashboard.module.scss";

// interface Props {
//   onClose: () => void;
//   onSave: (product: {
//     name: string;
//     description: string;
//     category: string;
//     image: string;
//   }) => void;
// }

// const AddProductModal: React.FC<Props>= ({ onClose, onSave }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState("");

//   const handleSubmit = () => {
//     if (!name || !description || !category || !image) {
//       alert("Please fill all fields");
//       return;
//     }
//     onSave({name, description, category, image});
//   };

//   return (
//     <div className={styles.modal}>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h4>Add Product</h4>
//         <button onClick={onClose}>X</button>
//       </div>
//       <input placeholder="ProductName" value={name} onChange={(e) => setName(e.target.value)}/>
//       <textarea placeholder="ProductDescription" value={description} onChange={(e) => setDescription(e.target.value)}/>
//       <input placeholder="ProductCategory" value={category} onChange={(e) => setCategory(e.target.value)}/>
//       <input placeholder="Product Image" value={image} onChange={(e) => setImage(e.target.value)}/>
//       <button onClick={handleSubmit}>Save product</button>
//     </div>
//   );
// };

// export default AddProductModal;
