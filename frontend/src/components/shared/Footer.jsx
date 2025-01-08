import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className='relative'>
        <div className='absolute bottom-0 w-full text-[#f2f2f2] py-1 flex items-center justify-center text-sm opacity-40'>
            <span>© Copyright {new Date().getFullYear()} | <a href="https://www.linkedin.com/in/praveen96650" target='_blank' className='hover:underline'>Praveen Kumar</a></span>
        </div>
      </footer>
    </>
  )
}

export default Footer
