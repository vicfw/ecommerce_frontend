"use client";

import Loader from "@/components/Loader/Loader";
import { Price } from "@/components/price/Price";
import { Separator } from "@/components/ui/separator";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { addDays } from "date-fns";
import { format } from "date-fns-jalali";
import { ArrowRight, Dot } from "lucide-react";
import Image from "next/image";
import { useOrderDetail } from "./useOrderDetail";

const OrderDetail = () => {
  const { get, on } = useOrderDetail();
  return (
    <section className="py-4">
      <header className="pb-4 px-3 flex items-center border-b gap-2">
        <ArrowRight
          className="text-neutral-700 cursor-pointer"
          onClick={on.routerBack}
          size={20}
        />
        <UI_Typography className="text-neutral-900 reg14 md:reg16">
          جزئیات سفارش
        </UI_Typography>
      </header>

      {get.orderDetailIsPending ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {/* general info */}
          <div className="px-3 md:px-5 py-4 border-b">
            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-3 pb-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <UI_Typography className="text-neutral-500 reg12">
                    کد پیگیری سفارش
                  </UI_Typography>
                  <UI_Typography className="text-neutral-800 reg12">
                    {get.orderDetailData?.id}
                  </UI_Typography>
                </div>
                <div className="flex gap-2">
                  <UI_Typography className="text-neutral-500 reg12">
                    تاریخ ثبت سفارش
                  </UI_Typography>
                  {get.orderDetailData?.createdAt && (
                    <UI_Typography className="text-neutral-800 reg12">
                      {format(
                        new Date(get.orderDetailData?.createdAt),
                        "d LLLL yyyy"
                      )}
                    </UI_Typography>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center gap-4 pb-4">
              <div className="flex gap-2">
                <UI_Typography className="text-neutral-500">
                  کد پیگیری سفارش
                </UI_Typography>
                <UI_Typography className="text-neutral-800">
                  {get.orderDetailData?.id}
                </UI_Typography>
              </div>
              <Dot className="text-neutral-300" />
              <div className="flex gap-2">
                <UI_Typography className="text-neutral-500">
                  تاریخ ثبت سفارش
                </UI_Typography>
                {get.orderDetailData?.createdAt && (
                  <UI_Typography className="text-neutral-800">
                    {format(
                      new Date(get.orderDetailData?.createdAt),
                      "d LLLL yyyy"
                    )}
                  </UI_Typography>
                )}
              </div>
            </div>

            <Separator className="bg-neutral-100" />

            {/* Mobile User Info */}
            <div className="md:hidden flex flex-col gap-3 pb-2 pt-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <UI_Typography className="text-neutral-500 reg12">
                    تحویل گیرنده
                  </UI_Typography>
                  <UI_Typography className="text-neutral-800 reg12">
                    {get.orderDetailData?.user.name}{" "}
                    {get.orderDetailData?.user.lastName}
                  </UI_Typography>
                </div>
                <div className="flex gap-2">
                  <UI_Typography className="text-neutral-500 reg12">
                    شماره موبایل
                  </UI_Typography>
                  <UI_Typography className="text-neutral-800 reg12">
                    {get.orderDetailData?.user.phoneNumber}
                  </UI_Typography>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <UI_Typography className="text-neutral-500 reg12">
                  آدرس
                </UI_Typography>
                <UI_Typography className="text-neutral-800 reg12">
                  {get.orderDetailData?.address.address}
                </UI_Typography>
              </div>
            </div>

            {/* Desktop User Info */}
            <div className="hidden md:flex gap-3 pb-2 pt-4">
              <div className="flex gap-2">
                <UI_Typography className="text-neutral-500">
                  تحویل گیرنده
                </UI_Typography>
                <UI_Typography className="text-neutral-800">
                  {get.orderDetailData?.user.name}{" "}
                  {get.orderDetailData?.user.lastName}
                </UI_Typography>
              </div>
              <Dot className="text-neutral-300" />
              <div className="flex gap-2">
                <UI_Typography className="text-neutral-500">
                  شماره موبایل
                </UI_Typography>
                <UI_Typography className="text-neutral-800">
                  {get.orderDetailData?.user.phoneNumber}
                </UI_Typography>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <UI_Typography className="text-neutral-500">آدرس</UI_Typography>
              <UI_Typography className="text-neutral-800">
                {get.orderDetailData?.address.address}
              </UI_Typography>
            </div>
          </div>

          {/* price info */}
          <div className="px-3 md:px-5 py-4 flex flex-col gap-2 border-b">
            {/* Mobile Price Layout */}
            <div className="md:hidden flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <UI_Typography className="text-neutral-500 reg12">
                    مبلغ
                  </UI_Typography>
                  {get.orderDetailData?.totalAmount && (
                    <UI_Typography className="text-neutral-800 reg12">
                      <Price
                        price={get.orderDetailData?.totalAmount}
                        className="reg12"
                      />
                    </UI_Typography>
                  )}
                </div>
                <div className="flex gap-2">
                  <UI_Typography className="text-neutral-500 reg12">
                    پرداخت اینترنتی
                  </UI_Typography>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <UI_Typography className="text-neutral-500 reg12">
                  هزینه ارسال (بر اساس وزن و حجم)
                </UI_Typography>
                {get.deliveryCostData?.cost && (
                  <UI_Typography className="text-neutral-800 reg12">
                    <Price
                      price={get.orderDetailData?.deliveryAmount || 0}
                      className="reg12"
                    />
                  </UI_Typography>
                )}
              </div>
            </div>

            {/* Desktop Price Layout */}
            <div className="hidden md:flex gap-4 items-center">
              <div className="flex gap-2">
                <UI_Typography className="text-neutral-500">مبلغ</UI_Typography>
                {get.orderDetailData?.totalAmount && (
                  <UI_Typography className="text-neutral-800">
                    <Price price={get.orderDetailData?.totalAmount} />
                  </UI_Typography>
                )}
              </div>
              <Dot className="text-neutral-300" />
              <div className="flex gap-2">
                <UI_Typography className="text-neutral-500">
                  پرداخت اینترنتی
                </UI_Typography>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <UI_Typography className="text-neutral-500">
                هزینه ارسال (بر اساس وزن و حجم)
              </UI_Typography>
              {get.deliveryCostData?.cost && (
                <UI_Typography className="text-neutral-800">
                  <Price price={get.orderDetailData?.deliveryAmount || 0} />
                </UI_Typography>
              )}
            </div>
          </div>

          {get.orderDetailData && (
            <div className="border rounded-lg py-4 mt-4 mx-3 md:mx-4 px-3 md:px-4">
              <UI_Typography className="text-neutral-500 reg12 md:reg14">
                زمان تحویل :{" "}
              </UI_Typography>
              <UI_Typography className="text-neutral-800 reg12 md:reg14">
                {format(
                  addDays(get.orderDetailData.createdAt, 2),
                  "d LLLL yyyy"
                )}
              </UI_Typography>
              <Separator className="my-3" />
              <div className="flex flex-col gap-3 md:gap-5">
                {get.orderDetailData?.orderItem.map((orderItem) => (
                  <div
                    className="flex items-center gap-3 md:gap-5"
                    key={orderItem.product.id}
                  >
                    <Image
                      src={orderItem.product.images[0]}
                      width={60}
                      height={60}
                      alt={orderItem.product.enName}
                      className="md:w-[100px] md:h-[100px] rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <UI_Typography className="reg12 md:reg14">
                        {orderItem.product.prName}
                      </UI_Typography>
                      <div className="flex items-center gap-2 mt-1">
                        <UI_Typography className="text-neutral-500 reg10 md:reg12">
                          تعداد: {orderItem.quantity}
                        </UI_Typography>
                        <UI_Typography className="text-neutral-500 reg10 md:reg12">
                          قیمت:{" "}
                          <Price
                            price={orderItem.itemPrice}
                            className="reg10 md:reg12"
                          />
                        </UI_Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default OrderDetail;
