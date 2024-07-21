import React, { useState } from "react";

export default function GameTypes({ categories, initialValues, labels, onChange, filters }) {
  const [value, setValue] = useState(initialValues || 50); 
  // console.log(filters);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleSelected = (e) => {
    if (onChange) onChange(e);
  }

  const handleMinClick = (e) => {
    setValue(0);
    if (onChange) onChange(0);
    e.preventDefault();
  };

  const handleMaxClick = (e) => {
    setValue(100);
    if (onChange) onChange(100);
    e.preventDefault();
  };

  return (
    <div className="bg-white flex">
      <div className=" flex flex-col pl-1">
        {categories.map((category, index) => (
          <form key={index} method="" action="" className="px-5 border-r-[2px] border-b-[2px]  leading-9 py-4">
            <p className="text-[#012C51] mb-3 font-semibold text-[1.2rem]">{category}</p>
            {labels[index].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="radio" name={`${category}`} className="h-5 w-5" onClick={handleSelected} value={label}/>
                <label>{label}</label>
              </div>
            ))}
          </form>
        ))}
        <form method="" action="" className="border-t-[2px] px-5 border-r-[2px] leading-9 py-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex justify-end gap-[1.5rem] w-[100%] px-5">
              <span>${value}</span>
              <span>$6500</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={handleChange}
              className="w-64 h-2 appearance-none rounded-full outline-none"
              style={{
                background: `linear-gradient(to right, #F5F5F5 0%, #F5F5F5 ${value}%, #1E40AF ${value}%, #1E40AF 100%)`,
              }}
            />
            <div className="flex justify-between w-64">
              <button
                onClick={handleMinClick}
                className="px-4 py-4 w-[40%] text-sm bg-[#F5F5F5] rounded-xl"
              >
                Min
              </button>
              <button
                onClick={handleMaxClick}
                className="px-4 py-4 text-sm w-[40%] text-[#808080] bg-[#F5F5F5] rounded-xl"
              >
                Max
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
