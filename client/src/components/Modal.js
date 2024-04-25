import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div>
                {children}
            </div>
            <button onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default Modal;
