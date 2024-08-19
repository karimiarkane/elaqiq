"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Header = () => {
 const fullPath =  usePathname()
    const pathSegments = fullPath.split('/').filter(Boolean);
    
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="flex justify-between items-center p-4 ">
      <div className="text-3xl font-bold text-gray-700">
        {capitalize(pathSegments[pathSegments.length - 1] || 'Home')}
      </div>
      <div className="text-gray-600">
        {pathSegments.length > 0 ? (
          <nav className="flex space-x-2">
            {pathSegments.map((segment, index) => (
              <span key={index} className="flex items-center">
                <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                  <p className="hover:underline">{capitalize(segment)}</p>
                </Link>
                {index < pathSegments.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>
        ) : (
          <span>Home</span>
        )}
      </div>
    </div>
  );
};

export default Header;