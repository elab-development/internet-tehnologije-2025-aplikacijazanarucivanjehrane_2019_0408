import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current; 
        // this is recommended because clean up function is going to run at later point of time than effect function
        // error that occurs: Uncaught TypeError: Cannot read properties of null (reading 'close')

        if (open) {
            modal.showModal();
        }

        return () => {
            modal.close();
        } // will be executed whenever open prop changes

    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} >
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}