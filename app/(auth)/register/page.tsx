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

const RegisterPage = () => {
  const { get, on } = useRegister();
  return (
    <div className={cn("grid gap-6")}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">ساخت اکانت</h1>
        <p className="text-sm text-muted-foreground">
          ایمیل خود را برای ساخت اگانت وارد نمایید
        </p>
      </div>
      <Form {...get.form}>
        <form onSubmit={get.form.handleSubmit(on.onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={get.form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="نام خود را وارد کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={get.form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ایمیل خود را وارد کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={get.form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">ثبت نام با ایمیل</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
