"use client";
import React, { useState } from "react";
import { Input, Checkbox, Button } from "antd";

const MobileModal = ({ mobile_number, onUpdate, onSave }) => {
  const [mobileNumber, setMobileNumber] = useState(mobile_number);

  const handleChange = (e) => {
    console.log(e.target.value, 'mine')
    setMobileNumber(e.target.value);
  };

  const handleSave = () => {
    onUpdate(mobileNumber);
    document.getElementById("my_modal_5").close();
  };

  return (
    <div className="w-full">
      <div
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="flex items-center w-full border rounded-full cursor-pointer bg-[#fff] p-[0.7rem] justify-center"
      >
        + Add Mobile number
      </div>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="p-6">
            <h2 className="text-2xl">Add Mobile Number</h2>
            <form className="space-y-4 mt-4">
              <Input
                placeholder="Mobile Number"
                name="mobile_number"
                value={mobileNumber}
                type="tel"
                onChange={handleChange}
              />
              <Checkbox>I confirm this information is correct</Checkbox>
              <Button
                type="primary"
                onClick={handleSave}
                disabled={mobile_number === mobileNumber}
                className="w-full bg-[#012C51] rounded-full py-[1rem] flex items-center justify-center"
              >
                Add Mobile Number
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MobileModal;


