import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';

const Layout = ({ children } : Readonly<{
    children: React.ReactNode;
  }>) => {

  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Employee Management', path: '/employee-management' },
    { name: 'Attendance Management', path: '/attendance-management' },
    { name: 'Leave Management', path: '/leave-management' },
    { name: 'Monthly Recap', path: '/monthly-recap' },
    { name: 'Attendance Grid', path: '/attendance-grid' },
  ];

  return (
    <div className="flex">
      <div className="w-1/4 h-screen bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.name} >
              <Link href={`/home${tab.path}`}>
                <p>{tab.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">{children}</div>
    </div>
  );
};

export default Layout;
