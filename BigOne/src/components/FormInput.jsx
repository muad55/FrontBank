import React from 'react'

const FormInput = ({ label, name, type }) => {
  return (
    <div className="flex flex-col my-6 mx-4">
      <label className="text-white my-2 mx-2 text-sm font-medium">
        {label} :
      </label>
      <input
        type={type}
        name={name}
        className="p-3 pl-4 rounded-lg text-white bg-slate-800 border border-white"
      />
    </div>
  )
}

export default FormInput
