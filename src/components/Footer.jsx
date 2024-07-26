import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-30 text-neutral-400 py-2 mt-10'>
      <div className='flex items-center justify-center gap-4'>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className='text-sm'>Movie Gama Copyright &copy; 2024</p>
    </footer>
  )
}

export default Footer