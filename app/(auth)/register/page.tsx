"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRegister } from "./_hook/useRegister";
import UI_Typography from "@/components/ui/typography/UI_Typography";

const RegisterPage = () => {
  const { get, on } = useRegister();
  return (
    <div className={cn("grid gap-6")}>
      <div className="flex flex-col space-y-2 text-center">
        <UI_Typography variant="Medium/Med18" component="h1">
          {get.codeView ? "کد تایید را وارد کنید" : "ورود | ثبت‌ نام"}
        </UI_Typography>
        <UI_Typography
          variant="Regular/Reg16"
          component="p"
          className="text-sm text-muted-foreground"
        >
          {get.codeView
            ? `کد تایید برای شماره ${get.registerForm.watch(
                "phoneNumber"
              )} پیامک شد`
            : "لطفا شماره موبایل یا ایمیل خود را وارد کنید"}
        </UI_Typography>
      </div>
      {get.codeView ? (
        <Form {...get.loginForm} key="login">
          <form onSubmit={get.loginForm.handleSubmit(on.loginOnSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={get.loginForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className="placeholder:text-lg text-lg"
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

                    <FormMessage className="text-base" />
                  </FormItem>
                )}
              />

              <Button type="submit" loading={get.registerUserLoading}>
                <UI_Typography variant="Regular/Reg16">تایید</UI_Typography>
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...get.registerForm} key="register">
          <form onSubmit={get.registerForm.handleSubmit(on.registerOnSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={get.registerForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="09122222222"
                        className="placeholder:text-lg text-lg"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage className="text-base" />
                  </FormItem>
                )}
              />

              <Button type="submit" loading={get.registerUserLoading}>
                <UI_Typography variant="Regular/Reg16">
                  ثبت نام با ایمیل
                </UI_Typography>
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default RegisterPage;
