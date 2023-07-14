"use client";

import React,{FormEventHandler,useState} from 'react';
import { Itask } from '@/types/tasks'
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from './modal'
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
    task: Itask
}
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const handleSubmitEdit: FormEventHandler<HTMLFormElement>=async(e)=>{
        e.preventDefault();
        await editTodo({
          id:task.id,
          text:taskToEdit
        })
        setTaskToEdit('')
        setOpenModalEdit(false)
        router.refresh
      }

     const handleDeleteTask =async(id: string) => {
        deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh
     } 
    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={()=>setOpenModalEdit(true)} cursor={'pointer'} className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={(e) => handleSubmitEdit(e)}>
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <div className="modal-action">
                            <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 onClick={()=>setOpenModalDelete(true)} cursor={'pointer'} className="text-red-500" size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className='text-lg'>Are you sure you want to delete this task</h3>
                    <div className="modal-action">
                        <button className="btn" onClick={()=>handleDeleteTask(task.id)}>Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task