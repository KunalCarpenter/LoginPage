import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

interface ImportPreviewModalProps {
  show: boolean;
  onClose: () => void;
  products: any[];
  selectedRows: (string | number)[];
  onSelectionChange: (ids: (string | number)[]) => void;
  onSave: () => void;
}

const ImportPreviewModal: React.FC<ImportPreviewModalProps> = ({
  show,
  onClose,
  products,
  selectedRows,
  onSelectionChange,
  onSave
}) => {
  const columns: GridColDef[] = [
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Price", headerName: "Price", width: 100 },
    { field: "Description", headerName: "Description", width: 200 },
    { field: "Category", headerName: "Category", width: 150 },
    { field: "Image URL", headerName: "Image URL", width: 200 }
  ];

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Importing Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(selectionDetails: any) => {
                console.log(selectionDetails);
                const selectedIdsArray = Array.from(selectionDetails.ids || []) as (string | number)[];
                onSelectionChange(selectedIdsArray);
            }}
            // initialState={{
            //     pagination: {paginationModel:{pageSize:5}},
            // }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSave} disabled={selectedRows.length === 0}>
          Save Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportPreviewModal;
