"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";



const AttendanceGrid =  ({attendance , employees}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString()); // Default to current month
   // Default to current month

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const renderDot = (status) => {
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
  

  const filterAttendanceByMonth = (attendance, selectedMonth) => {
    const year = new Date(selectedMonth).getFullYear();
    const month = new Date(selectedMonth).getMonth();
    return attendance.filter((record) => {
      const recordDate = new Date(record.date);
      return month === recordDate.getMonth() && recordDate.getFullYear() === year;
    });
  };

  const filteredAttendance = filterAttendanceByMonth(attendance, selectedMonth);
console.log("filtered attendance" , filteredAttendance)

  const daysInMonth = getDaysInMonth(new Date(selectedMonth).getFullYear(), new Date(selectedMonth).getMonth() + 1);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
      <div className="mb-4">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select Month</label>
        <input
          type="month"
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Employee Name</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="py-3 px-6">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {employees.map((employee) => (

                
              <tr key={employee.id}>
                <td className="py-3 px-6">{employee.firstName} {employee.lastName}</td>
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const year = new Date(selectedMonth).getFullYear();
                    const month = new Date(selectedMonth).getMonth();
                    const day = i + 1;
                    const date = new Date(year, month, day).toISOString().slice(0, 10);
                    
                    // console.log("Selected Month:", selectedMonth);
                    // console.log("Year:", year);
                    // console.log("Month (0-based):", month);
                    // console.log("Day:", day);
                    // console.log("Generated Date:", date);
                    const attendance = filteredAttendance.find(a =>{
                    const storedDate = new Date(a.date);
                    const normalizedStoredDate = `${storedDate.getFullYear()}-${String(storedDate.getMonth() + 1).padStart(2, '0')}-${String(storedDate.getDate()).padStart(2, '0')}`;
                    console.log("normalizedStoredDate" , normalizedStoredDate)
                    console.log("Generated Date:", date);
                    console.log("employeeId men attendance" , a.employeeId)
                    console.log("id employee",employee.id)
                   return  a.employeeId == employee.id && normalizedStoredDate == date
                  } );
                  console.log("chkopi ta3 attendance" , attendance)
                  return (
                    <td key={i} className="py-3 px-6 text-center">
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