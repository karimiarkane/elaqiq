"use client"
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import StartEndLeaveDate from "./StartEndLeaveDate";
import { useRouter } from "next/navigation";
import {
  parseDate,

} from "@internationalized/date";
export default function AddLeaveModal({employeId} : {employeId: any}) {
  const {isOpen, onOpen, onOpenChange , onClose} = useDisclosure();

  const getLocalDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return parseDate(`${year}-${month}-${day}`);
  };




  const [startDate, setStartDate] = useState(getLocalDateString());
  const [endDate, setEndDate] = useState(getLocalDateString());





  const [reason, setReason] = useState('');
  const [disableButton , setDisableButton] = useState(false)
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
      setDisableButton(false)
    }
  }, [isOpen]);

  const handleSubmit = async  (e: { preventDefault: () => void; } ) => {
    e.preventDefault()
    setDisableButton(true)
    if(disableButton) return
    setErrMsg("");
    setSuccessMsg("");  
 
const  res =  await fetch("/api/Leave", {
  method :"POST" , 
  headers :{
    'Content-Type': 'application/json',
  },
  body : JSON.stringify({
    startDate : startDate,
    endDate : endDate,
    reason : reason,
    employeId : employeId
  })
}
) 
const resback = await res.json();
if (resback.status != 200) {
  setErrMsg(resback.message);
} else {
  setSuccessMsg(resback.message);
  setTimeout(() => {
    onClose();
  }, 1000);
  setEndDate(getLocalDateString())
  setStartDate(getLocalDateString())
  setReason("")
  router.refresh();
}

  };


  return (
    <>
      <Button color="secondary" onPress={onOpen}>Ajouter </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajouter un congé</ModalHeader>
              <ModalBody>
              <form id="myform" onSubmit={handleSubmit}>
     
          <StartEndLeaveDate startDate = {startDate} endDate ={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
        
          <div className="mb-4">
            <label className="block text-gray-700">Motif</label>
            <textarea
              value={reason}
              onChange={(e)=>setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        
        </form>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        {successMsg && <p className="text-green-500">{successMsg}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <button form="myform" type="submit" disabled={disableButton}  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700">
                  Ajouter
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
