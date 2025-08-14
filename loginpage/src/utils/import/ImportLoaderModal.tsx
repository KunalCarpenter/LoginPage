import React from "react";
import Modal from "react-bootstrap/Modal";
import { PacmanLoader } from "react-spinners";

interface ImportLoaderModalProps {
  show: boolean;
}

const ImportLoaderModal: React.FC<ImportLoaderModalProps> = ({ show }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
        <PacmanLoader color="#4a90e2" size={50} margin={2} speedMultiplier={1} />
        <p className="mt-3">Extracting data...</p>
      </Modal.Body>
    </Modal>
  );
};

export default ImportLoaderModal;
