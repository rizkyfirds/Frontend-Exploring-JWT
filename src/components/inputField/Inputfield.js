import React from "react";

const Inputfield = ({type, field,setData, value}) => {
  return (
    <div className="flex">
      <p className="w-1/3 text-lg font-semibold my-auto">{field} </p>
      <input type={type} value={value} onChange={(e)=> setData(e.target.value)} className="ml-2 rounded-md px-2 " />
    </div>
  );
};

export default Inputfield;
