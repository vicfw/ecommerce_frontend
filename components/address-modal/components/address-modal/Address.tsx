import { Mail, Smartphone, User, Milestone, ChevronLeft } from "lucide-react";
import React from "react";
import UI_Typography from "../../../ui/typography/UI_Typography";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Address as AddressType } from "@/types/globalTypes";
import { useAddress } from "../../hooks/useAddress";

type AddressProps = {
  address: AddressType;
};

const Address = (props: AddressProps) => {
  const { address } = props;

  const { get, on } = useAddress();

  return (
    <>
      <div className="flex flex-col first:border-t mt-3 pt-4">
        {/* id for checkbox and htmlFor for other elements should be dynamic value */}

        <label
          className="w-full cursor-pointer"
          htmlFor={address.id.toString()}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              id={address.id.toString()}
              checked={address.isDefault}
              onCheckedChange={(checked) =>
                on.handleChangeDefaultAddress(address.id, checked)
              }
            />
            <UI_Typography
              variant="Regular/Reg14"
              component="p"
              className="m-0"
              htmlFor="address"
            >
              {address.address}
            </UI_Typography>
          </div>
          <div className="flex flex-col py-4 gap pr-8">
            <div className="flex gap-4 items-center">
              <Mail className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                {address.zipCode}
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Smartphone className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                {address.receiverPhoneNumber}
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <User className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                {address.receiverName} {address.receiverLastName}
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Milestone className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                {address.plate}
              </UI_Typography>
            </div>
          </div>
        </label>
        <div className="flex items-center w-fit cursor-pointer">
          <UI_Typography variant="Medium/Med12" className="text-secondary">
            ویرایش
          </UI_Typography>
          <ChevronLeft size={16} className="text-secondary" />
        </div>
        <Separator className="bg-neutral-200 mt-3" />
      </div>
    </>
  );
};

export default Address;
