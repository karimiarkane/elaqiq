"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";


export default  function AddEmployee() {



  const {isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();

  const [disableButton , setDisableButton] = useState(false)

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

const router = useRouter()
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    age: '',
    contact: '',
    workstation: 'deleguation', // Default value
  })

  const handleChange = (e : any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
      setDisableButton(false)
    }
  }, [isOpen]);

const handleSubmit = async (e : any) => {
    setDisableButton(true)
    if(disableButton) return
    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault()

    try {
        const response = await fetch('/api/employe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          })
          const resback = await response.json();
          console.log("res from the back in the front", resback);
          if (resback.status != 200) {
            setErrMsg(resback.message);
          } else {
            setSuccessMsg(resback.message);
            setTimeout(() => {
              onClose();
            }, 1000);
            setForm({
                lastName: '',
                firstName: '',
                age: '',
                contact: '',
                workstation: 'deleguation', 
            });
            router.refresh();
          }

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Button onPress={onOpen} color="primary">Ajouter un Employé</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajout d un employee</ModalHeader>
              <ModalBody>
    <div>
      <form id="myform" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="workstation">Workstation</label>
          <select
            id="workstation"
            name="workstation"
            value={form.workstation}
            onChange={handleChange}
          >
            <option value="deleguation">DELEGUE</option>
            <option value="vente">vente</option>
          </select>
        </div>
      </form>
      {successMsg && <p>{successMsg} </p>}
      {errMsg && <p>{errMsg} </p>}
    </div>
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
