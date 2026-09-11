import { SiteLogo } from "@/components/site-logo/SiteLogo";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { getSiteSettingsSafe } from "@/lib/siteSettings";
import Link from "next/link";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const jwtCookie = cookies().get("jwt");
  if (jwtCookie) {
    redirect("/");
  }

  const siteSettings = await getSiteSettingsSafe();

  return (
    <>
      <div className="container relative grid  h-[100dvh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-secondary p-10 text-secondary-foreground lg:flex dark:border-r">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <SiteLogo
              settings={siteSettings}
              showName
              className="h-20 w-auto object-contain"
            />
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
