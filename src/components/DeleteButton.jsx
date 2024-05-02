import React from 'react'

export const DeleteButton = ({ onClick, children }) => {
  return (
    <button
        onClick={onClick}
        className="py-1.5 px-2 md:px-3 text-sm md:text-base rounded-[4px] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-200"
    >
        {children}
    </button>
  )
}
