import React from 'react'


interface ModalProps {
    modalOpen: boolean;
    setModalOpen : (open:boolean)=>boolean|void;
    children : React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen,setModalOpen,children }) => {
    return (
        <>
            <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setModalOpen(false)}>✕</button>
                    {children}
                </form>
            </dialog>
        </>
    )
}

export default Modal