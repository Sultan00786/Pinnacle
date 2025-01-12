import { setStep } from "@repo/store/recoil";
import { Button } from "@repo/ui/component";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

function BackButton({ step }: { step: number }) {
   const dispatch = useDispatch();
   return (
      <div>
         <Button variant="Secondary" onClick={() => dispatch(setStep(step))}>
            <div className="flex gap-[2px] items-center justify-center">
               <Image
                  src={
                     "https://www.svgrepo.com/show/326475/arrow-back-circle-outline.svg"
                  }
                  alt=""
                  width={25}
                  height={25}
               />
               <span>Back</span>
            </div>
         </Button>
      </div>
   );
}

export default BackButton;
