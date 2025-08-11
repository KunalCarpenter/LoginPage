import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too short").required("Required"),
});

export const registerSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Required"),
});

export const productFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  image: Yup.string()
    .required("Required"),
});
