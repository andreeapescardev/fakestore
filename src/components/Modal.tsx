import React, {ReactNode} from 'react';
import './Modal.css';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({show, handleClose, children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleClose}>Close</button>
                <div className='modal-main-content'>
                    {children}
                </div>
            </section>
        </div>
    );
};

export default Modal;
