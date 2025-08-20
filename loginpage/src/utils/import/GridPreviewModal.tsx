import React, { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

// These are the props needed for the Grid view to function
interface GridPreviewModalProps {
  show: boolean;
  onClose: () => void;
  products: any[];
  selectedRows: (string | number)[];
  onSelectionChange: (ids: (string | number)[]) => void;
  onSave: () => void;
}

const GridPreviewModal: React.FC<GridPreviewModalProps> = ({
  show,
  onClose,
  products,
  selectedRows,
  onSelectionChange,
  onSave,
}) => {
  const columns: GridColDef[] = [
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Price", headerName: "Price", width: 100 },
    { field: "Description", headerName: "Description", width: 200 },
    { field: "Category", headerName: "Category", width: 150 },
    { field: "Image URL", headerName: "Image URL", width: 200 },
  ];

  //
  const [searchText, setSearchText] = useState("");

  const filteredProducts = useMemo(() => {
    // If the search text is empty, return all products.
    if (!searchText) {
      return products;
    }

    const lowercasedSearchText = searchText.toLowerCase();

    return products.filter((product) => {
      const nameMatch =
        product.Name?.toLowerCase().includes(lowercasedSearchText);
      const descriptionMatch =
        product.Description?.toLowerCase().includes(lowercasedSearchText);
      const priceMatch =
        product.Price?.toString().includes(lowercasedSearchText);
      const categoryMatch =
        product.Category?.toLowerCase().includes(lowercasedSearchText);

      // If any field matches, include the product in the new list.
      return nameMatch || descriptionMatch || priceMatch || categoryMatch;
    });
  }, [products, searchText]); // This logic re-runs only when products or searchText changes.
  //
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      centered
      //
      scrollable
      //
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Products to Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          fullWidth
          variant="outlined"
          label="Search by Name, Description, Price, or Category"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(selectionDetails: any) => {
              const selectedIdsArray = Array.from(
                selectionDetails.ids || []
              ) as (string | number)[];
              onSelectionChange(selectedIdsArray);
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={onSave}
          disabled={selectedRows.length === 0}
        >
          {`Save ${selectedRows.length} Selected Product(s)`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GridPreviewModal;
