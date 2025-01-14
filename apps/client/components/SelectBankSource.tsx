import { Select, SelectItem } from "@nextui-org/react";
import { CreditCardIcon } from "lucide-react";
import React from "react";

const data = [
   { id: "1", name: "Pinnacle Bank" },
   { id: "2", name: "Bandk of America" },
   { id: "3", name: "Bandk of Australia" },
   { id: "4", name: "Bandk of India" },
   { id: "5", name: "Bandk of Japan" },
   { id: "6", name: "Bandk of Canada" },
];

function SelectBankSource({
   setSelectSource,
}: {
   setSelectSource: (value: React.SetStateAction<string>) => void;
}) {
   return (
      <div>
         <Select
            variant="bordered"
            items={data}
            label={
               <div className="w-fit flex gap-2 items-center text-gray-600">
                  <CreditCardIcon className=" text-purple-500 " />
                  <p>Select Source of Account</p>
               </div>
            }
            labelPlacement="outside"
            onSelectionChange={(value) => setSelectSource(value.currentKey as string)}
         >
            {data.map((item) => (
               <SelectItem
                  onChange={(e) => setSelectSource(item.name)}
                  key={item.name}
                  value={item.name}
               >
                  {item.name}
               </SelectItem>
            ))}
         </Select>
      </div>
   );
}

export default SelectBankSource;
