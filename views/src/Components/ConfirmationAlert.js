import React from "react";
import { Modal } from "reactstrap";

const ConfirmationAlert = ({
  id,
  content,
  modal_center,
  setmodal_center,
  title,
  onOK,
  okText,
  cancelText,
  toggle
}) => {
  return (
    <Modal isOpen={modal_center} centered={true} toggle={toggle}>
      <div className="modal-header">
        <h6 className=" mt-0">Warning</h6>
        <button
          type="button"
          onClick={() => setmodal_center(false)}
          className="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">{content}</div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            onOK();
            setmodal_center(false);
          }}
        >
          {okText || "YES"}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => setmodal_center(false)}
        >
          {cancelText || "NO"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationAlert;
