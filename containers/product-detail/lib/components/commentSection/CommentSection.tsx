import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Star } from "lucide-react";
import React from "react";
import Image from "next/image";
import Comment from "./Comment";
import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { useCommentSection } from "./useCommentSection";
import Link from "next/link";

const CommentSection = () => {
  const { get, on } = useCommentSection();

  return (
    <div className="border rounded-md py-4 flex items-center flex-col justify-start gap-3 mt-4 text-neutral-500 px-2">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <UI_Typography className="font-bold reg14 text-black">
          دیدگاه کاربران
        </UI_Typography>
        <Button onClick={on.handleOpenLoginSheet}>افزودن دیدگاه</Button>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        {/* Reviews */}
        <div className="flex items-center justify-center gap-1">
          <Star className="fill-yellow-400 text-yellow-400" size={20} />
          <UI_Typography className="mt-1"> امتیاز 4.2</UI_Typography>
        </div>
        <Separator orientation="vertical" />
        {/* Comments count */}
        <div className="flex items-center justify-center gap-1">
          <MessageCircle size={20} />
          <UI_Typography className="mt-1"> دیدگاه 74</UI_Typography>
        </div>
      </div>
      {/* Comment Images */}
      <div className="flex items-center gap-2 flex-col w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <UI_Typography className="text-neutral-900 reg14">
            تصاویر خریداران
          </UI_Typography>
          <UI_Typography> 3 تصویر</UI_Typography>
        </div>
        {/* Comment Images */}
        <div className="flex items-center justify-start gap-2 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <Image
              key={index}
              src="/images/saffron-auth.png"
              alt="comment-image"
              width={90}
              height={90}
            />
          ))}
        </div>
        {/* Comment */}
        {Array.from({ length: 3 }).map((_, index) => (
          <Comment key={index} />
        ))}

        {/* Login Bottom Sheet */}
        {!get.token ? (
          <BottomSheet
            open={get.openLoginSheet}
            onOpenChange={on.handleLoginSheetOpenChange}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <UI_Typography className="med14">
                برای افزودن دیدگاه، لطفا ابتدا وارد شوید.
              </UI_Typography>
              <Link href="/register">
                <Button className="reg14">ورود به حساب کاربری</Button>
              </Link>
            </div>
          </BottomSheet>
        ) : null}
      </div>
    </div>
  );
};

export default CommentSection;
