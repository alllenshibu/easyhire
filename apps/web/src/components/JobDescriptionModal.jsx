import React from "react";
import { Modal, ModalContent } from "@mui/material";

const JobDescriptionModal = () => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={style}>
        <h2 id="parent-modal-title" className="modal-title">
          Text in a modal
        </h2>
        <p id="parent-modal-description" className="modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </ModalContent>
    </Modal>
  );
};

export default JobDescriptionModal;
