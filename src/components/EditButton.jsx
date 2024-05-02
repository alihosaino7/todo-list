import React from 'react'

export const EditButton = ({ onClick, children, disabled }) => {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        className="py-1.5 px-2 text-sm md:text-base md:px-3 rounded-[4px] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-200"
    >
        {children}
    </button>
  )
}
