import UI_Typography from "@/components/ui/typography/UI_Typography";
import Link from "next/link";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div className="container relative grid  h-[100dvh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <UI_Typography variant="Medium/Med18">زعفران گل سرخ</UI_Typography>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
            <UI_Typography
              variant="Regular/Reg12"
              className="px-8 text-center text-sm text-muted-foreground"
            >
              {" "}
              ورود شما به معنای پذیزش{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                شرایط
              </Link>{" "}
              و{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                قوانین حریم خصوصی{" "}
              </Link>
              است
            </UI_Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
