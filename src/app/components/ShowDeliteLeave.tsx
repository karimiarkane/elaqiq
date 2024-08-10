"use client";

import React, { useEffect, useState } from "react";
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
// import { formatDate } from "date-fns";
interface Leave {
  id: string;
  reason: string;
  startDate: Date;
  endDate: Date;
}

export default function ShowDeliteLeave({ employeId, leaves }: { employeId: string, leaves: any[] }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  
  const [filteredLeaves, setFilteredLeaves] = useState<Leave[]>([]);
  
  useEffect(() => {
    const filterLeaves = () => {
      const employeeLeaves = leaves.filter((leave: { employeeId: any; }) => leave.employeeId === employeId);
      setFilteredLeaves(employeeLeaves);
    };
  
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
      filterLeaves();
    }
  }, [isOpen, employeId, leaves]);

  const filterLeaves = () => {
    const employeeLeaves = leaves.filter((leave: { employeeId: any; }) => leave.employeeId === employeId);
    setFilteredLeaves(employeeLeaves);
  };

  const deleteLeave = async (leaveId: any) => {
    try {
      const response = await fetch(`/api/Leave/${leaveId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFilteredLeaves(filteredLeaves.filter((leave) => leave.id !== leaveId));
        setSuccessMsg("Leave deleted successfully");
      } else {
        setErrMsg("Failed to delete leave");
      }
    } catch (error) {
      setErrMsg("Failed to delete leave");
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
              <ModalHeader className="flex flex-col items-center gap-1">
                All leaves
              </ModalHeader>
              <ModalBody>
              
                <ul>
                  {filteredLeaves.map((leave) => (
                    <li key={leave.id} className="flex justify-between items-center">
                      <p>{leave.reason} ({leave.startDate.toLocaleDateString(`en-GB`)} - {leave.endDate.toLocaleDateString(`en-GB`)})</p>
                      <Button color="danger" onPress={() => deleteLeave(leave.id)}>
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}