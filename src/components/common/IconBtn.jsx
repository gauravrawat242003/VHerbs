import React from 'react'

import * as Icons from 'react-icons/md'

export const IconBtn = ({
  text, 
  onClick, 
  children, 
  disabled=false, 
  customClasses, 
  customPadding,
  customColors, 
  type,
  iconName,
  form
}) => {

  const Icon = Icons[iconName];

  return (
    <button
      form={form}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer ${customClasses ? customClasses : 'before:ease relative rounded-md overflow-hidden transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40 flex items-center text-center'} 
        ${customPadding ? customPadding : 'px-6 py-2'}
        ${customColors ? customColors : 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'}`}

    >
      {
        children ? (
          <>
            <span>{text}</span>
            {children}
          </>
        ) : (
          <div className='flex items-center space-x-2'>
              <span>{text}</span>
              {Icon && <Icon/>}
          </div>
        )
      }
    </button>
  )
}
