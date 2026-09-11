"use client";

import { Container } from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const REFUND_HINT =
  "اگر مبلغی از حساب شما کم شده باشد، معمولاً طی ۷۲ ساعت به همان حساب بازمی‌گردد.";

const FAIL_COPY: Record<string, { title: string; description: string }> = {
  cancelled: {
    title: "پرداخت لغو شد",
    description: `پرداخت سفارش انجام نشد. ${REFUND_HINT}`,
  },
  expired: {
    title: "مهلت پرداخت به پایان رسید",
    description:
      "رزرو موجودی این سفارش منقضی شده است. لطفاً دوباره از فروشگاه سفارش ثبت کنید.",
  },
  error: {
    title: "مشکلی در بررسی پرداخت پیش آمد",
    description: `نتوانستیم نتیجه پرداخت را تأیید کنیم. ${REFUND_HINT}`,
  },
  failed: {
    title: "پرداخت ناموفق بود",
    description: `سفارش شما پرداخت نشده است. ${REFUND_HINT}`,
  },
};

const PaymentFail = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const reason = searchParams.get("reason") || "failed";
  const copy = FAIL_COPY[reason] ?? FAIL_COPY.failed;

  return (
    <Container component="main">
      <div className="flex w-full flex-col items-center px-4 py-8 text-center md:justify-center md:gap-8 md:py-8">
        <div className="mb-6 md:mb-0 md:flex md:items-center md:gap-4 md:text-right">
          <CircleX
            size={64}
            className="mx-auto text-destructive md:mx-0 md:h-12 md:w-12"
          />
          <div className="mt-4 md:mt-0">
            <UI_Typography className="mb-2 text-lg font-medium text-destructive md:text-2xl">
              {copy.title}
            </UI_Typography>
            <UI_Typography className="hidden text-sm text-muted-foreground md:block md:text-base">
              {copy.description}
            </UI_Typography>
          </div>
        </div>

        <div className="mb-6 w-full max-w-lg rounded-lg bg-muted p-4 md:mb-0 md:border md:border-border md:bg-card md:p-6">
          <UI_Typography className="mb-4 hidden text-right text-lg font-medium text-card-foreground md:block">
            جزئیات سفارش
          </UI_Typography>

          <UI_Typography
            component="p"
            className="mb-4 text-sm text-muted-foreground md:hidden"
          >
            {copy.description}
          </UI_Typography>

          {orderId ? (
            <div className="flex items-center justify-between md:flex-col md:items-start md:gap-2">
              <UI_Typography className="text-sm text-muted-foreground">
                شماره سفارش:
              </UI_Typography>
              <UI_Typography className="font-medium text-foreground md:text-lg">
                {orderId}
              </UI_Typography>
            </div>
          ) : (
            <UI_Typography className="text-sm text-muted-foreground">
              می‌توانید از صفحه سفارش‌ها وضعیت خریدهای قبلی را ببینید.
            </UI_Typography>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-4">
          <Link href="/" className="w-full md:w-auto">
            <Button className="w-full md:px-8" size="lg">
              <UI_Typography className="text-sm font-medium text-primary-foreground md:text-base">
                بازگشت به صفحه اصلی
              </UI_Typography>
            </Button>
          </Link>

          <Link
            href="/profile/orders?activeTab=processing"
            className="w-full md:w-auto"
          >
            <Button variant="outline" className="w-full md:px-8" size="lg">
              <UI_Typography className="text-sm font-medium text-foreground md:text-base">
                مشاهده سفارش‌ها
              </UI_Typography>
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PaymentFail;
