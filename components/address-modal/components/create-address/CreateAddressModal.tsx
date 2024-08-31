"use client";

import Combobox from "@/components/combobox/Combobox";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import UI_Typography from "@/components/ui/typography/UI_Typography";

import { X } from "lucide-react";
import { useCreateAddressModal } from "../../hooks/useCreateAddressModal";
import FieldLabel from "./FieldLabel";
import { provincesStaticData } from "@/lib/staticData";

const CreateAddressModal = () => {
  const { get, on } = useCreateAddressModal();

  return (
    <Dialog
      open={get.openCreateModal}
      onOpenChange={on.handleToggleCreateModal}
      key="create-address"
    >
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">انتخاب آدرس</DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={on.handleToggleCreateModal}
          />
        </DialogHeader>
        <Separator className="bg-neutral-200 mt-3" />
        <Form {...get.form}>
          <form
            onSubmit={get.form.handleSubmit(on.onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Address */}
            <FormField
              control={get.form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel title="نشانی پستی" htmlFor="address" />
                  <FormControl>
                    <Textarea
                      placeholder="آدرس خود را وارد نمایید"
                      id="address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address end */}
            <div className="flex gap-3">
              {/* Province */}
              <FormField
                control={get.form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel title="استان" htmlFor="province" />
                    <FormControl>
                      <Combobox
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="انتخاب کنید"
                        data={provincesStaticData}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Province end */}
            </div>
            <Button type="submit">
              <UI_Typography variant="Regular/Reg16">ثبت آدرس</UI_Typography>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAddressModal;
