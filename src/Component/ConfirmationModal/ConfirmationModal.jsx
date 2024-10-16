import React from 'react';
import './ConfirmationModal.css';
import { GiCrossMark } from "react-icons/gi";

const ConfirmationModal = ({ confirmationModal, onCancelModalHandler, setIsConfirmationModal }) => {
    const { error, success, message, color } = confirmationModal;

    if (!error && !success) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ borderColor: color }}>
                <div onClick={() => setIsConfirmationModal((prev) => ({ ...prev, error: false, success: false, message: "", color: "" }))} className='modal-close'><GiCrossMark /></div>
                <div className="modal-header">
                    <h2 className={`modal-title ${success ? 'modal-success' : 'modal-error'}`}>
                        {success ? "🎉 Success!" : "⚠️ Error!"}
                    </h2>
                </div>
                <div className="modal-body">
                    <p className="modal-message">{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-close-btn" onClick={onCancelModalHandler}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
