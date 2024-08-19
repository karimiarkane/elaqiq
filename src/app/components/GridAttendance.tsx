"use client"

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";



const AttendanceGrid =  ({attendance, employees}: {attendance: any, employees: any}) => {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const currentYear = currentDate.getFullYear();


  const getDaysInMonth = (year :any, month :any) => {
    return new Date(year, month, 0).getDate();
  };



  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredEmployees, setFilteredEmployees] = useState(employees);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;
  // const totalPages = Math.ceil(employees.length / itemsPerPage);


  // useEffect(() => {
  //   const searchTerms = searchTerm
  //     .toLowerCase()
  //     .split(" ")
  //     .filter((term) => term.trim() !== "");
  //   const filtered = employees.filter((employee : any) => {
  //     const employeeFullName = `${employee.lastName.toLowerCase()} ${employee.firstName.toLowerCase()}`;
  //     return searchTerms.every((term) => employeeFullName.includes(term));
  //   });
  //   setFilteredEmployees(filtered);
  //   setCurrentPage(1); // Reset to the first page after filtering
  // }, [searchTerm, employees]);

  // const lastItemIndex = currentPage * itemsPerPage;
  // const firstItemIndex = lastItemIndex - itemsPerPage;
  // const currentItems = filteredEmployees.slice(firstItemIndex, lastItemIndex);









  const renderDot = (status : any) => {
    switch (status) {
      case 'conge':
        return <span className="dot bg-blue-500 w-2 h-2 rounded-full inline-block"></span>;
      case 'absent':
        return <span className="dot bg-red-500 w-2 h-2 rounded-full inline-block "></span>;
      case 'present':
        return <span className="dot bg-green-500 w-2 h-2 rounded-full inline-block"></span>;
      default:
        return null;
    }
  };
  



  const filterAttendanceByMonth = (attendance :any, currentDate : any) => {
    const year = new Date(currentDate).getFullYear();
    const month = new Date(currentDate).getMonth();
    return attendance.filter((record :any) => {
      const recordDate = new Date(record.date);
      return month === recordDate.getMonth() && recordDate.getFullYear() === year;
    });
  };

  const filteredAttendance = filterAttendanceByMonth(attendance, currentDate);

  const daysInMonth = getDaysInMonth(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth() + 1);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
       <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-700">
          Attendance for {currentDate.toLocaleString('fr-FR', { month: 'long' })} {currentYear}
        </h2>
        {/* <div className="max-w-lg  ">
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
                placeholder="Search"
                value={searchTerm}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div> */}

      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 border-r">Employee Name</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="py-3 px-3 border-r">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {employees.map((employee : any) => (

                
              <tr key={employee.id}>
                <td className="py-3 px-6 border-r">{employee.firstName} {employee.lastName}</td>
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const year = new Date(currentDate).getFullYear();
                    const month = new Date(currentDate).getMonth();
                    const day = i + 1;
                    const date = new Date(year, month, day).toISOString().slice(0, 10);
                    
                
                    const attendance = filteredAttendance.find((a : any) =>{
                    const storedDate = new Date(a.date);
                    const normalizedStoredDate = `${storedDate.getFullYear()}-${String(storedDate.getMonth() + 1).padStart(2, '0')}-${String(storedDate.getDate()).padStart(2, '0')}`;
                   return  a.employeeId == employee.id && normalizedStoredDate == date
                  } );
                  return (
                    <td key={i} className="py-3 text-center border-r">
                      {attendance ? renderDot(attendance.status) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceGrid;