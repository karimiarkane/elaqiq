import prisma from '@/lib/db'
import React from 'react'
import DashboardStatistics from '../components/DashboardStatistics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faArrowRightLong, faArrowUpRightDots, faUser } from '@fortawesome/free-solid-svg-icons';
export const dynamic = 'force-dynamic'

const home = async () => {
  const totalEmployees = await prisma.employee.count();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const presentCount = await prisma.attendance.count({
    where: {
      date: today,
      status: 'present',
    },
  });

  const absentCount = await prisma.attendance.count({
    where: {
      date: today,
      status: 'absent',
    },
  });

  const congeCount = await prisma.attendance.count({
    where: {
      date: today,
      status: 'conge',
    },
  });
  const doughnutData = {
    labels: ['Présent', 'Absent', 'Congé'],
    datasets: [
      {
        data: [presentCount, absentCount, congeCount],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };

  const barData = {
    labels: ['Présent', 'Absent', 'Congé'],
    datasets: [
      {
        label: 'Statistiques de présence',
        data: [presentCount, absentCount,congeCount],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };
  const percentagePresent = (presentCount / totalEmployees) * 100 || 0;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10  ">
      <div className="flex flex-wrap justify-between">
        <div className='flex  items-center border-2  rounded-lg bg-blue-100 p-10 my-2'><FontAwesomeIcon color='blue' icon={faUser} className="w-6 h-6 mr-3" />             <p><span className='font-bold'>Total des employés :</span>  {totalEmployees}</p></div>
        <div className='flex  items-center border-2  rounded-lg bg-blue-100 p-10 my-2'><FontAwesomeIcon color='blue' icon={faArrowUpRightDots} className="w-6 h-6 mr-3" /> <p><span className='font-bold'>Présents aujourd hui :</span>  {presentCount}</p></div>
        <div className='flex  items-center border-2  rounded-lg bg-blue-100 p-10 my-2'><FontAwesomeIcon color='blue' icon={faArrowDownWideShort} className="w-6 h-6 mr-3"/><p><span className='font-bold'>Absents aujourd hui :</span>  {absentCount}</p></div>
        <div className='flex  items-center border-2  rounded-lg bg-blue-100 p-10 my-2'><FontAwesomeIcon color='blue' icon={faArrowRightLong} className="w-6 h-6 mr-3" />   <p><span className='font-bold'>En congé aujourd hui :</span>  {congeCount}</p></div>
      </div>
      <DashboardStatistics data={{ totalEmployees, presentCount, absentCount, congeCount, percentagePresent }} />
    </div>
  )
}

export default home