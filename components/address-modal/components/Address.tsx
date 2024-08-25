import { Mail, Smartphone, User, Milestone, ChevronLeft } from "lucide-react";
import React from "react";
import UI_Typography from "../../ui/typography/UI_Typography";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

type AddressProps = {};

const Address = (props: AddressProps) => {
  const {} = props;
  return (
    <>
      <div className="flex first:border-t mt-3 pt-4">
        {/* id for checkbox and htmlFor for other elements should be dynamic value */}
        <Checkbox id="address" />
        <label className="mr-4 w-full cursor-pointer" htmlFor="address">
          <UI_Typography
            variant="Regular/Reg14"
            component="p"
            className="m-0"
            htmlFor="address"
          >
            ارومیه،خیابان سعدی،خیابان بوستان،کوی ۲،پلاک ۲۲
          </UI_Typography>
          <div className="flex flex-col py-4 gap">
            <div className="flex gap-4 items-center">
              <Mail className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                ۵۷۱۹۶۶۸۵۸۸
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Smartphone className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                ۵۷۱۹۶۶۸۵۸۸
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <User className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                ۵۷۱۹۶۶۸۵۸۸
              </UI_Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Milestone className="text-neutral-600" size={19} />
              <UI_Typography
                variant="Regular/Reg12"
                component="p"
                className="text-neutral-600"
              >
                ۵۷۱۹۶۶۸۵۸۸
              </UI_Typography>
            </div>
          </div>
          <div className="flex items-center">
            <UI_Typography variant="Medium/Med12" className="text-secondary">
              ویرایش
            </UI_Typography>
            <ChevronLeft size={16} className="text-secondary" />
          </div>
          <Separator className="bg-neutral-200 mt-3" />
        </label>
      </div>
    </>
  );
};

export default Address;
