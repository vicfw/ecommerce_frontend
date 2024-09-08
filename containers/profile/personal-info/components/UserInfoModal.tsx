import FieldLabel from "@/components/field-label/FieldLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { X } from "lucide-react";
import React from "react";
import { useUserInfoModal } from "../hook/useUserInfoModal";
import { Button } from "@/components/ui/button";

type UserInfoModalProps = {
  openDialog: boolean;
  handleToggleDialog: () => void;
};

export const UserInfoModal = ({
  handleToggleDialog,
  openDialog,
}: UserInfoModalProps) => {
  const { get, on } = useUserInfoModal();
  return (
    <Dialog onOpenChange={handleToggleDialog} open={openDialog} modal>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex text-[16px] font-bold">
            ثبت اطلاعات شناسایی
          </DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            // onClick={on.handleToggleCreateModal}
          />
        </DialogHeader>
        <Separator className="bg-neutral-200 mt-3" />
        {/* Content */}
        <section>
          <UI_Typography className="text-neutral-800" variant="Regular/Reg14">
            لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید
            با اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
          </UI_Typography>

          <Form {...get.form}>
            <form onSubmit={get.form.handleSubmit(on.onSubmit)}>
              <div className="flex items-center w-full justify-between gap-5 mt-5 items-start ">
                {/* Name */}
                <FormField
                  control={get.form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FieldLabel htmlFor="name" title="نام" />
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name */}
                <FormField
                  control={get.form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FieldLabel htmlFor="LastName" title="نام‌خانوادگی" />
                      <FormControl>
                        <Input id="LastName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end mt-5 w-full">
                <Button
                  disabled={
                    !get.form.formState.isValid ||
                    get.form.formState.isSubmitting
                  }
                  loading={get.form.formState.isSubmitting}
                >
                  بررسی اطلاعات
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};
