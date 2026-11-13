"use client";

import FieldLabel from "@/components/field-label/FieldLabel";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useChangePhoneModal } from "../hook/useChangePhoneModal";

type ChangePhoneModalProps = {
  openDialog: boolean;
  handleToggleDialog: () => void;
  onSuccess: () => void;
};

export const ChangePhoneModal = ({
  openDialog,
  handleToggleDialog,
  onSuccess,
}: ChangePhoneModalProps) => {
  const { get, on } = useChangePhoneModal({
    onSuccess,
    onClose: handleToggleDialog,
  });

  useEffect(() => {
    if (!openDialog) {
      on.reset();
    }
    // Reset only when the dialog closes; hook identity is stable for this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog]);

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) handleToggleDialog();
      }}
      modal
    >
      <DialogContent className="w-[90vw] max-w-md md:max-w-lg">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex text-[16px] font-bold">
            {get.codeView ? "کد تایید را وارد کنید" : "تغییر شماره موبایل"}
          </DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={handleToggleDialog}
          />
        </DialogHeader>
        <Separator className="bg-border mt-3" />
        <section>
          <UI_Typography className="text-muted-foreground reg14">
            {get.codeView
              ? `کد تایید برای شماره ${get.phoneForm.watch("phoneNumber")} پیامک شد`
              : "شماره موبایل جدید خود را وارد کنید. کد تایید به همین شماره ارسال می‌شود."}
          </UI_Typography>

          {get.codeView ? (
            <Form {...get.codeForm} key="change-phone-code-form">
              <form
                onSubmit={get.codeForm.handleSubmit(on.onCodeSubmit)}
                className="mt-5 flex flex-col gap-4"
              >
                <FormField
                  control={get.codeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FieldLabel htmlFor="change-phone-code" title="کد تایید" />
                      <FormControl>
                        <Input
                          id="change-phone-code"
                          data-testid="change-phone-code"
                          type="text"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 4);
                            field.onChange(value);
                          }}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full md:w-auto self-end"
                  loading={get.verifyLoading}
                  disabled={get.verifyLoading}
                  data-testid="change-phone-submit"
                >
                  تایید و ذخیره
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...get.phoneForm} key="change-phone-phone-form">
              <form
                onSubmit={get.phoneForm.handleSubmit(on.onPhoneSubmit)}
                className="mt-5 flex flex-col gap-4"
              >
                <FormField
                  control={get.phoneForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FieldLabel
                        htmlFor="change-phone-number"
                        title="شماره موبایل جدید"
                      />
                      <FormControl>
                        <Input
                          id="change-phone-number"
                          data-testid="change-phone-number"
                          type="text"
                          inputMode="numeric"
                          placeholder="09122222222"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            field.onChange(value);
                          }}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full md:w-auto self-end"
                  loading={get.requestLoading}
                  disabled={get.requestLoading}
                  data-testid="change-phone-request"
                >
                  ارسال کد تایید
                </Button>
              </form>
            </Form>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};
