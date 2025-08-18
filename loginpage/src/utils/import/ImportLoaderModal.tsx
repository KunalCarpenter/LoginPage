import React from "react";
import Modal from "react-bootstrap/Modal";
import { RotateLoader } from "react-spinners";

interface ImportLoaderModalProps {
  show: boolean;
}

const ImportLoaderModal: React.FC<ImportLoaderModalProps> = ({ show }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body style={{ textAlign: "center", padding:"3rem" }}>
    <RotateLoader color="#4a90e2" />
        <p className="mt-3">Extracting data...</p>
      </Modal.Body>
    </Modal>
  );
};

export default ImportLoaderModal;
