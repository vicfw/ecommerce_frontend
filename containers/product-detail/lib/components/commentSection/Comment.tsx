import UI_Typography from "@/components/ui/typography/UI_Typography";
import { format } from "date-fns-jalali";
import React from "react";

const Comment = () => {
  return (
    <div className="border-t px-2 w-full pt-2">
      {/* Name & Date */}
      <div className="flex items-center justify-between">
        <UI_Typography>سما محسنی</UI_Typography>
        <UI_Typography>{format(new Date(), "yyyy/MM/dd")}</UI_Typography>
      </div>

      {/* Comment */}
      <UI_Typography>
        من شماره 1 رو سفارش دادم. خیلی پر رنگ تر از تصویرش هست، تازه من تو نور
        عکس گرفتم، روی لب خیلی پر رنگ هستش. ولی خیلی روی لب کشیده میشه. در کل بد
        نیست ولی کاش رنگاش واقعی بود.
      </UI_Typography>
    </div>
  );
};

export default Comment;
