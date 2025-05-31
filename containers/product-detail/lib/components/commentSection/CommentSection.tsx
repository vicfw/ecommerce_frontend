import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddCommentModal } from "./AddCommentModal";
import Comment from "./Comment";
import { useCommentSection } from "./useCommentSection";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const CommentSection = () => {
  const { get, on } = useCommentSection();

  return (
    <div className="border rounded-md py-4 flex items-center flex-col justify-start gap-3 mt-4 text-neutral-500 px-2">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <span className="font-bold reg14 text-black">دیدگاه کاربران</span>
        <Button onClick={on.handleOpenAddCommentModal}>افزودن دیدگاه</Button>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        {/* Reviews */}
        <div className="flex items-center justify-center gap-1">
          <Star className="fill-yellow-400 text-yellow-400" size={20} />
          <span className="mt-1"> امتیاز 4.2</span>
        </div>
        <Separator orientation="vertical" />
        {/* Comments count */}
        <div className="flex items-center justify-center gap-1">
          <MessageCircle size={20} />
          <span className="mt-1"> دیدگاه {get.totalComments}</span>
        </div>
      </div>
      {/* Comment Images */}
      <div className="flex items-center gap-2 flex-col w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-neutral-900 reg14">تصاویر خریداران</span>
          <span> {get.commentsImages?.length || 0} تصویر</span>
        </div>
        {/* Comment Images */}
        <div className="flex items-center justify-start gap-2 w-full overflow-auto">
          {get.commentsImages?.map((image) => (
            <Image
              key={image}
              src={image}
              alt="comment-image"
              width={90}
              height={90}
              className="h-[73px]"
            />
          ))}
        </div>
        {/* Comment */}
        {get.comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        {get.totalPages > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => on.handlePageChange(get.page - 1)}
                  className={cn(
                    get.page === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {Array.from({ length: get.totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  if (
                    pageNum === 1 ||
                    pageNum === get.totalPages ||
                    (pageNum >= get.page - 1 && pageNum <= get.page + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => on.handlePageChange(pageNum)}
                          isActive={get.page === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    pageNum === get.page - 2 ||
                    pageNum === get.page + 2
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => on.handlePageChange(get.page + 1)}
                  className={cn(
                    get.page === get.totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Login Bottom Sheet */}
        {!get.token ? (
          <BottomSheet
            open={get.openLoginSheet}
            onOpenChange={on.handleLoginSheetOpenChange}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="med14">
                برای افزودن دیدگاه، لطفا ابتدا وارد شوید.
              </span>
              <Link href="/register">
                <Button className="reg14">ورود به حساب کاربری</Button>
              </Link>
            </div>
          </BottomSheet>
        ) : null}
        <AddCommentModal />
      </div>
    </div>
  );
};

export default CommentSection;
