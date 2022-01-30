import './Modal.css';

const Modal = ({children, isOpen, closeModal}) => {

    const handleModalContainerClick = e => e.stopPropagation();
    return (
        <article className={`modal ${isOpen && "is-open"}`}>
            <div className="modal-container d-flex align-items-center" onClick={handleModalContainerClick}>
                <button className="modal-close btn btn-light" onClick={closeModal}>Cerrar</button>
                {children}
            </div>
        </article>
    )
}

export default Modal