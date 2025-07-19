import {
  Mail,
  Smartphone,
  User,
  Milestone,
  ChevronLeft,
  Trash2,
} from "lucide-react";
import React from "react";
import UI_Typography from "../../../ui/typography/UI_Typography";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Address as AddressType } from "@/types/globalTypes";
import { useAddress } from "../../hooks/useAddress";
import { Button } from "@/components/ui/button";

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
              component="p"
              className="m-0 reg14"
              htmlFor="address"
            >
              {address.address}
            </UI_Typography>
          </div>
          <div className="flex flex-col py-4 gap pr-8">
            <div className="flex gap-4 items-center">
              <Mail className="text-neutral-600" size={19} />
              <UI_Typography component="p" className="text-neutral-600 reg12">
                {address.zipCode}
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Smartphone className="text-neutral-600" size={19} />
              <UI_Typography component="p" className="text-neutral-600 reg12">
                {address.receiverPhoneNumber}
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <User className="text-neutral-600" size={19} />
              <UI_Typography component="p" className="text-neutral-600 reg12">
                {address.receiverName} {address.receiverLastName}
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Milestone className="text-neutral-600" size={19} />
              <UI_Typography component="p" className="text-neutral-600 reg12">
                {address.plate}
              </UI_Typography>
            </div>
          </div>
        </label>
        <div className="flex items-center justify-between">
          <div className="flex items-center w-fit cursor-pointer">
            <UI_Typography className="text-secondary med12">
              ویرایش
            </UI_Typography>
            <ChevronLeft size={16} className="text-secondary" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              e.preventDefault();
              on.handleDeleteAddress(address.id);
            }}
          >
            <Trash2 size={16} />
            <UI_Typography className="text-destructive reg12 mr-1">
              حذف
            </UI_Typography>
          </Button>
        </div>
        <Separator className="bg-neutral-200 mt-3" />
      </div>
    </>
  );
};

export default Address;
