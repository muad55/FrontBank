import React from 'react'

const SectionTitle = ({ text }) => {
  return (
    <div className="border-b pb-5 border-black">
      <h2 className="text-3xl tracking-wider capitalize text-white font-medium">
        {text}
      </h2>
    </div>
  )
}

export default SectionTitle
