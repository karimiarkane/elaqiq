"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const AttendanceGrid = ({ attendance, employees }: { attendance: any, employees: any }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  // console.log('currentDate.getMonth()',selectedMonth)
  const currentYear = currentDate.getFullYear();


  const getDaysInMonth = (year: any, month: any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  useEffect(() => {
    const searchTerms = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((term) => term.trim() !== "");
    const filtered = employees.filter((employee: any) => {
      const employeeFullName = `${employee.lastName.toLowerCase()} ${employee.firstName.toLowerCase()}`;
      return searchTerms.every((term) => employeeFullName.includes(term));
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, employees]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredEmployees.slice(firstItemIndex, lastItemIndex);

  const renderDot = (status: any) => {
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

  const filterAttendanceByMonth = (attendance: any, year: number, month: number) => {
    return attendance.filter((record: any) => {
      const recordDate = new Date(record.date);
      return month === recordDate.getMonth() && recordDate.getFullYear() === year;
    });
  };

  const filteredAttendance = filterAttendanceByMonth(attendance, currentYear, selectedMonth);
  const daysInMonth = getDaysInMonth(currentYear, selectedMonth);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
      <div className="mb-4 flex justify-between items-center">
        <div className="">
          <form onSubmit={(e) => e.preventDefault()}>
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
        <div className="flex items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="py-2 px-4 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('fr-FR', { month: 'long' })}
              </option>
            ))}
          </select>
          <h2 className="ml-4 text-lg font-medium text-gray-700">
            Attendance de {new Date(0, selectedMonth).toLocaleString('fr-FR', { month: 'long' })} {currentYear}
          </h2>
        </div>
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
            {currentItems.map((employee: any) => (
              <tr key={employee.id}>
                <td className="py-3 px-6 border-r">{employee.firstName} {employee.lastName}</td>
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const year = currentYear;
                  const month = selectedMonth;
                  const day = i + 1;
                  const date = new Date(year, month, day).toISOString().slice(0, 10);

                  const attendance = filteredAttendance.find((a: any) => {
                    const storedDate = new Date(a.date);
                    const normalizedStoredDate = `${storedDate.getFullYear()}-${String(storedDate.getMonth() + 1).padStart(2, '0')}-${String(storedDate.getDate()).padStart(2, '0')}`;
                    return a.employeeId == employee.id && normalizedStoredDate == date;
                  });
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
      <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
        <div className="hidden text-sm md:flex justify-end">
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

export default AttendanceGrid;