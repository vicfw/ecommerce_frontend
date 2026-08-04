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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import UI_Typography from "@/components/ui/typography/UI_Typography";

import { X } from "lucide-react";
import FieldLabel from "@/components/field-label/FieldLabel";
import { citiesStaticData, provincesStaticData } from "@/lib/staticData";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateEditAddressModal } from "../../hooks/useCreateEditAddressModal";

const CreateEditAddressModal = () => {
  const { get, on } = useCreateEditAddressModal();

  return (
    <Dialog
      open={get.openCreateModal}
      onOpenChange={on.handleToggleCreateModal}
      key="create-address"
    >
      <DialogContent className="inset-0 flex h-dvh max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-0 p-0 sm:rounded-none">
        <DialogHeader className="shrink-0 flex-row items-center justify-between space-y-0 border-b border-neutral-200 px-4 py-4">
          <DialogTitle className="text-[16px] font-bold">
            انتخاب آدرس
          </DialogTitle>
          <X
            className="cursor-pointer"
            size={20}
            onClick={on.handleToggleCreateModal}
          />
        </DialogHeader>
        <Form {...get.form}>
          <form
            onSubmit={get.form.handleSubmit(on.onSubmit)}
            className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-5"
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
                  <FormItem className="w-full">
                    <FieldLabel title="استان" htmlFor="province" />
                    <FormControl>
                      <Combobox
                        onChange={(value: string) => {
                          field.onChange(value);
                          get.form.setValue("city", "");
                        }}
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
              {/* City */}
              <FormField
                control={get.form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FieldLabel title="شهر" htmlFor="city" />
                    <FormControl>
                      <Combobox
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="انتخاب کنید"
                        data={
                          citiesStaticData[
                            get.form.watch(
                              "province",
                            ) as keyof typeof citiesStaticData
                          ] || []
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City */}
            </div>
            <div className="flex">
              <FormField
                control={get.form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FieldLabel title="محله" htmlFor="street" />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex gap-3 flex-1">
                <FormField
                  control={get.form.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel title="پلاک" htmlFor="plate" />

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={get.form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel title="واحد" htmlFor="floor" removeStar />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={get.form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel title="کد پستی" htmlFor="zipCode" />

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        <UI_Typography className="text-neutral-300 reg12">
                          کد‌پستی باید ۱۰ رقم و بدون خط تیره باشد.
                        </UI_Typography>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="flex gap-2 items-center">
              <Checkbox
                id="receiver"
                checked={get.isForHimSelf}
                onCheckedChange={on.handleChangeIsForHimSelf}
              />
              <UI_Typography
                className="reg14"
                component="label"
                htmlFor="receiver"
              >
                گیرنده سفارش خودم هستم.
              </UI_Typography>
            </div>

            <div className="flex gap-2 items-center">
              <Checkbox
                id="isDefault"
                checked={get.form.watch("isDefault")}
                onCheckedChange={(checked) => {
                  get.form.setValue("isDefault", checked as boolean);
                }}
              />
              <UI_Typography
                className="reg14"
                component="label"
                htmlFor="isDefault"
              >
                این آدرس را به عنوان آدرس پیش‌فرض تنظیم کن
              </UI_Typography>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <FormField
                control={get.form.control}
                name="receiverName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FieldLabel title="نام گیرنده" htmlFor="receiverName" />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={get.form.control}
                name="receiverLastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FieldLabel title="نام‌خانوادگی گیرنده" htmlFor="zipCode" />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-3">
              <FormField
                control={get.form.control}
                name="receiverPhoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FieldLabel
                      title="شماره موبایل"
                      htmlFor="receiverPhoneNumber"
                    />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full" />
            </div>

            <Button type="submit">
              <UI_Typography className="reg16">ثبت آدرس</UI_Typography>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditAddressModal;
