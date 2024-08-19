"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";




export default function EditEmployee({employeeInfo}: { employeeInfo: any }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState(employeeInfo);
  const handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setForm((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: any) => {
    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault();
    console.log("formData to edit employee : ", form);
  
    try {
      const res = await fetch(`http://localhost:3000/api/employe/${employeeInfo.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(form),
      });
      const resback = await res.json();
      console.log("res from the back in the front", resback);
      if (resback.status != 200) {
        setErrMsg(resback.message);
      } else {
        setSuccessMsg(resback.message);
        router.refresh()
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error: any) {
      console.error("error fetch font", error);
      setErrMsg(error.message);
    }
   
  };
  return (
    <>
      <Button color="primary" onPress={onOpen}>Modifier</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="2xl"
        className="border-solid border-2"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  items-center gap-1">
                Modification de l&apos;Employé
              </ModalHeader>
              <ModalBody>
              <div>
    
      <form id="myform" onSubmit={handleSubmit}>
        <div className="py-1 flex gap-x-4 items-center">
          <label htmlFor="lastName" className="text-gray-600">Last Name</label>
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
          <label htmlFor="firstName" className="text-gray-600">First Name</label>
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
          <label htmlFor="age" className="text-gray-600">Age</label>
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
          <label htmlFor="contact" className="text-gray-600">Contact</label>
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
          <label htmlFor="workstation" className="text-gray-600">Workstation</label>
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
      {successMsg && <p className="text-green-500">{successMsg} </p>}
      {errMsg && <p className="text-red-500">{errMsg} </p>}
    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
              
                <button form="myform" type="submit"  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700">
                  modifier
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
