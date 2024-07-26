import React from 'react';
import { mobileNavigation } from '../contants/Navigation';
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
  return (
    <section className='h-14 w-full lg:hidden bg-black  fixed bottom-0 px-3 z-10'>
      <div className='flex h-full items-center justify-between text-neutral-400'>
        {
          mobileNavigation.map((item, index) => (
            <NavLink 
            key={item.label + "Navigation"} to={item.href}
            className={({ isActive }) => `flex items-center flex-col ${isActive && 'text-white'}`}
            >
              <div className='text-xl'>{item.icon}</div>
              <p className='text-sm'>{item.label}</p>
            </NavLink>
          ))
        }
      </div>
    </section>
  );
}

export default MobileNavigation