import { ToastContentProps } from "react-toastify";

const MsgOtp = ({ closeToast }: ToastContentProps) => (
    <div className=" text-gray-800">
       <p className="text-lg font-bold">
          Firebase Auth is in test mode
       </p>
       <p>
          Use this OTP:{" "}
          <strong className=" font-extrabold ">44 44 44</strong>
       </p>
       <div className="flex justify-start">
          <button
             onClick={closeToast}
             className="bg-sky-500 text-white px-2 py-2 rounded-md mt-4"
          >
             OK
          </button>
       </div>
    </div>
 );

 export default MsgOtp;