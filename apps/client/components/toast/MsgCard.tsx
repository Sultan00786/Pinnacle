import { ToastContentProps } from "react-toastify";

const MsgCard = ({ closeToast }: ToastContentProps) => (
    <div className=" text-gray-800">
       <p className="text-lg font-bold">
          Firebase Auth is in test mode
       </p>
       <p>
          Use this phone:{" "}
          <strong className=" font-extrabold ">1234567890</strong>
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

 export default MsgCard;