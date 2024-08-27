'use client'
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import { usePathname } from 'next/navigation';



const Layout = ({ children } : Readonly<{
    children: React.ReactNode;
  }>) => {
const currentPath = usePathname();
  const tabs = [
    { name: 'Tableau de bord', path: '/' },
    { name: 'Gestion des employés', path: '/employee-management' },
    { name: 'Gestion des présences', path: '/attendance-management' },
    { name: 'Gestion des congés', path: '/leave-management' },
    { name: 'Grille de présence', path: '/attendance-grid' },
    { name: 'Récapitulatif mensuel', path: '/monthly-recap' },
  ];

  return (
    <div className="flex ">
      <div className="w-1/4 h-screen flex flex-col  border-r-3  pt-7 ">
      <div className='flex justify-center w-full '>
        <Image 
          src='/elAkik.jpg'
          alt='Logo'
          width={200}
          height={200}
          // className=' bg-[#FFF2DF]'
          />

                    </div>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.name}  className={`border-2 border-solid flex justify-center items-center ${currentPath === `/home${tab.path}` ? 'bg-gray-200' : ''}`}>
              <Link href={`/home${tab.path}`} className='flex items-center w-full h-full justify-center gap-x-2 text-gray-600 p-5 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150'>
                <p>{tab.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4 ">
      
      <Header/>
      {children}</div>
    </div>
  );
};

export default Layout;
