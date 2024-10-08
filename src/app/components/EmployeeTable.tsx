"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AddEmployee from "./AddEmployeeModal";
import EditEmployee from "./EditEmployeeModal";
import { Button } from "@nextui-org/react";

const EmployeeTable = ({ data }: { data: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);


  const router = useRouter();

  useEffect(() => {
    const searchTerms = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((term) => term.trim() !== "");
    const filtered = data.filter((employee : any) => {
      const employeeFullName = `${employee.lastName.toLowerCase()} ${employee.firstName.toLowerCase()}`;
      return searchTerms.every((term) => employeeFullName.includes(term));
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, data]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredEmployees.slice(firstItemIndex, lastItemIndex);

  const hundleDeleteClick = async (id: any) => {
    let confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet employé ?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/employe/${id}`, {
          method: "DELETE",
        });
        const resback = await res.json();
        if (resback.status === 200) {
          window.alert(resback.message);
          router.refresh();
        } else {
          window.alert(resback.message);
        }
      } catch (err) {
        console.error('yaaaa reb Error deleting employee catched from the front : ', err);  // log the error in your server logs for debugging purposes
        window.alert("Une erreur est survenue. Veuillez réessayer plus tard.");

      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 ">
      <div className="items-end justify-between md:flex   ">
        <div className="max-w-lg  ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-md px-4 mx-auto mt-12"
          >
            <div className="relative">
              <FontAwesomeIcon
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                icon={faMagnifyingGlass}
              />
              <input
                type="text"
                placeholder="Rechercher un employé"
                value={searchTerm}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="mt-3 md:mt-0">
          <AddEmployee />
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Nom</th>
              <th className="py-3 px-6">Prenom</th>
              <th className="py-3 px-6">Age</th>
              <th className="py-3 px-6">contact</th>
              <th className="py-3 px-6">Poste</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {currentItems.map((item: any, idx: any) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.firstName}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.lastName}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.age} </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.contact} </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.workstation}
                </td>
                <td className="text-right px-6 py-4 whitespace-nowrap flex justify-evenly">
                  <EditEmployee employeeInfo={item} />

                  <Button
                    onClick={() => hundleDeleteClick(item.id)}
                   color="danger" 

                  >
                    supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*pagination*/}

      <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
        <div className="hidden  text-sm md:flex justify-end">
     
          <div className="flex items-center gap-12" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer hover:text-indigo-600"
            >
              précédent
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer hover:text-indigo-600"
            >
              suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeTable;
