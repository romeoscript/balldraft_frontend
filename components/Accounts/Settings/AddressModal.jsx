"use client"
import React, {useState} from "react";
import { Select, Input, Checkbox, Button } from "antd";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

const AddressModal = ({ address, onUpdate }) => {
    const [localAddress, setLocalAddress] = useState(address);

    const handleChange = (e) => {
      setLocalAddress(e.target.value);
    };
  
    const handleSave = () => {
      onUpdate(localAddress);
    };

  return (
    <div className="w-full">
      <div
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className="flex items-center w-full border  rounded-full cursor-pointer w-full  bg-[#fff] p-[0.7rem] flex justify-center items-center"
      >
        + Add Address number
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="p-6">
            <h2 className="text-2xl">Add Residential Address</h2>
            <p className="text-gray-500">
              This helps us to mail tax forms. Please ensure its up to date
            </p>
            <form className="space-y-4 mt-4">
              <Input
                placeholder="Address"
                name="address"
                value={localAddress}
                onChange={handleChange}
              />
            
              <Checkbox>I confirm this information is correct</Checkbox>
              <Button
                type="primary"
                onClick={handleSave}
                disabled={address === localAddress}
                className="w-full bg-[#012C51] rounded-full py-[1rem] flex items-center justify-center"
              >
                Add address
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddressModal;
