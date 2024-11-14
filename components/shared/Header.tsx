import React from 'react'

const Header = ({title,subtitle}:{title:string,subtitle?:string}) => {
  return (
    <>
    <h2 className='h2-bold texr-dark-600'>{title}</h2>
    {subtitle&&<p className='p16-regular mt-4'>{subtitle}</p>}
    </>
  )
}

export default Header