import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: "SerialNumber", headerName: "Serial", width: 70 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img src={params.value} alt={params.row.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }} />
      ),
    },
    { field: "addedBy", headerName: "Added By", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            sx={{ mr: 1 }}
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%", padding: 2,backgroundColor:"#1976d2" }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10]}
        sx={{ border:0 }}
      />
    </Paper>
  );
};

export default ProductTable;
