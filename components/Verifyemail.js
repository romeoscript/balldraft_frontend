import React, { useRef, useState } from "react";
import verify from '@/public/images/verify.svg';


const TOTAL_OTP_NUM = 6;

const Verifyemail = ({ onOtpSubmit, registrationData }) => {


  const [otp, setOtp] = useState(Array(TOTAL_OTP_NUM).fill(""));
  const inputsRef = useRef([]);


  const focusNextInput = (index) => {
    if (index < TOTAL_OTP_NUM - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleChange = (event, index) => {
    const value = event.target.value;
    if (/^[0-9]$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      focusNextInput(index);
    }
  };

  const handleKeyUp = (event, index) => {
    if (event.key === "Backspace") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = "";
        return newOtp;
      });
      focusPrevInput(index);
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length === TOTAL_OTP_NUM) {
      console.log(id, mobile, otpString);
      mutate(
        {
          id: id,
          mobile: mobile,
          pin: otpString,
        },
        {
          onSuccess: () => {
            onOtpSubmit(otpString);
          },
        }
      );
    } else {
      alert("Please enter all digits of the OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center  md:p-[3rem] m-auto mt-[13rem]">
      <h2 className="font-bold md:text-2xl text-l">Verify Email</h2>
      <p className="text-center text-grey-600 my-[1rem]">
      Enter the 6 digit code sent to johndoe@gmail to verify your aacount{" "}
        {/* <span className="font-bold">{mobile.slice(-4)}</span> */}
      </p>
      
      <div>
       <img src={verify.src} alt="verify" />
      </div>

      <div className="flex mb-4 space-x-2 my-[1rem]">
        {Array.from({ length: TOTAL_OTP_NUM }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            maxLength={1}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-10 h-10 bg-gray-white text-center border rounded-md"
            style={{ background: '#f3f3f3' }}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-gray-500  text-white w-[90%] m-auto my-[1rem] block text-grey-600 hover:bg-gray-700 hover:text-white text-left py-2 px-4 rounded-full flex items-center justify-center w-64"
      >
        Verify email
      </button>
      <button
      
        className="border-[#012C51] border-[1px] bg-white text-[#012C51] w-[90%] m-auto my-[1rem] block text-grey-600 hover:bg-gray-700 hover:text-white text-left py-2 px-4 rounded-full flex items-center justify-center w-64"
      >
        Resend code
      </button>
    </div>
  );
};

export default Verifyemail;
