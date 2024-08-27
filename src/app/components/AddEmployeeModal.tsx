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
      <Button className="p-6" onPress={onOpen} color="primary">Ajouter un Employé</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajout d un employee</ModalHeader>
              <ModalBody>
    <div>
      <form id="myform" onSubmit={handleSubmit}>
        <div className="py-1 flex gap-x-4 items-center">
          <label htmlFor="lastName"  className="text-gray-600 ">Nom : </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"

          />
        </div>
        <div className="py-1 flex gap-x-4 items-center">
          <label htmlFor="firstName" className="text-gray-600">Prenom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"

          />
        </div>
        <div className="py-1 flex gap-x-4 items-center">
          <label htmlFor="age" className="text-gray-600">Age :</label>
          <input
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"

          />
        </div>
        <div className="py-1 flex gap-x-4 items-center">
          <label htmlFor="contact" className="text-gray-600" >Contact :</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"

          />
        </div>
        <div className="py-1 flex gap-x-4 items-center"> 
          <label htmlFor="workstation" className="text-gray-600" >Poste :</label>
          <select
            id="workstation"
            name="workstation"
            value={form.workstation}
            onChange={handleChange}
          >
            <option value="Sales">Sales</option>
            <option value="Delegue">Delegue</option>
            <option value="DirecteurFinancier">Directeur Financier</option>
            <option value="Superviseur">Superviseur</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Billetterie">Billetterie</option>
            <option value="FemmeDeMenage">Femme de Menage</option>
          </select>
        </div>
      </form>
      {successMsg && <p className="text-green-500">{successMsg} </p>}
      {errMsg && <p className="text-red-500">{errMsg} </p>}
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
