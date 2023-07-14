'use client';

import React,{FormEventHandler, useState} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {addTodo} from '@/api'
import Modal from './modal';
import { useRouter } from 'next/navigation';
import {v4 as uuidv4} from 'uuid';

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newVal, setNewVal] = useState<string>('')
  
  const handleSubmitNew: FormEventHandler<HTMLFormElement>=async(e)=>{
    e.preventDefault();
    await addTodo({
      id:uuidv4(),
      text:newVal
    })
    setNewVal('')
    setModalOpen(false)
    router.refresh
  }
  return (
    <div>
        <button className="btn btn-primary w-full" onClick={()=>setModalOpen(true)}>Add new task <AiOutlinePlus size={18} /></button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={(e)=>handleSubmitNew(e)}>
            <h3 className="font-bold text-lg">Add New Task</h3>
            <div className="modal-action">
            <input value={newVal} onChange={e=>setNewVal(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask