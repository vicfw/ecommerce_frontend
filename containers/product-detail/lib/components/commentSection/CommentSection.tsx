"use client";

import BottomSheet from "@/components/bottom-sheet/BottomSheet"; // Assuming this path is correct
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Assuming AddCommentModal and Comment are in the same directory or adjust path
import { AddCommentModal } from "./AddCommentModal";
import CommentComponent from "./Comment";
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
import { useCommentSection } from "./useCommentSection";
import CommentSkeleton from "./CommentSkeletion";

const CommentSection = () => {
  const { get, on } = useCommentSection();

  const renderPaginationItems = () => {
    const pageElements = [];
    const currentPage = get.page;
    const totalPages = get.totalPages;

    if (totalPages <= 0) return null;

    const pagesToDisplay = new Set<number>();
    pagesToDisplay.add(1); // Always show first page
    if (totalPages > 1) {
      pagesToDisplay.add(totalPages); // Always show last page
    }

    // Add current page and its immediate neighbors
    if (currentPage > 0 && currentPage <= totalPages) {
      // Ensure currentPage is valid before adding
      pagesToDisplay.add(currentPage);
      if (currentPage > 1) {
        pagesToDisplay.add(currentPage - 1);
      }
      if (currentPage < totalPages) {
        pagesToDisplay.add(currentPage + 1);
      }
    }

    // Filter out-of-bounds pages and sort
    const sortedPageNumbers = Array.from(pagesToDisplay)
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);

    let lastDisplayedPage = 0;
    for (const pageNum of sortedPageNumbers) {
      if (lastDisplayedPage > 0 && pageNum > lastDisplayedPage + 1) {
        // If there's a gap, add an ellipsis
        pageElements.push(
          <PaginationItem key={`ellipsis-before-${pageNum}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pageElements.push(
        <PaginationItem key={pageNum}>
          <PaginationLink
            onClick={() => on.handlePageChange(pageNum)}
            isActive={currentPage === pageNum}
            className="cursor-pointer" // Ensure links are clickable
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
      lastDisplayedPage = pageNum;
    }
    return pageElements;
  };

  return (
    <div className="border rounded-md py-4 flex items-center flex-col justify-start gap-3 mt-4 text-neutral-500 px-2 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-sm md:text-base text-black">
          دیدگاه کاربران
        </span>
        <Button onClick={on.handleOpenAddCommentModal} size="sm">
          افزودن دیدگاه
        </Button>
      </div>
      <div className="flex items-center justify-start gap-2 w-full text-xs md:text-sm">
        {/* Reviews */}
        <div className="flex items-center justify-center gap-1">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
          <span className="mt-0.5"> امتیاز 4.2</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        {/* Comments count */}
        <div className="flex items-center justify-center gap-1">
          <MessageCircle size={16} />
          <span className="mt-0.5"> دیدگاه {get.totalComments}</span>
        </div>
      </div>
      {/* Comment Images */}
      <div className="flex items-center gap-2 flex-col w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-neutral-900 text-sm md:text-base">
            تصاویر خریداران
          </span>
          <span className="text-xs md:text-sm">
            {" "}
            {get.commentsImages?.length || 0} تصویر
          </span>
        </div>
        {/* Comment Images */}
        <div className="flex items-center justify-start gap-2 w-full overflow-x-auto pb-2">
          {get.commentsImages?.map((image, index) => (
            <Image
              key={image + index} // Ensure unique key if images can be duplicated
              src={image || "/placeholder.svg"}
              alt={`comment-image-${index + 1}`}
              width={70}
              height={70}
              className="h-[70px] w-[70px] object-cover rounded-md flex-shrink-0"
            />
          ))}
          {get.commentsImages?.length === 0 && (
            <p className="text-xs text-neutral-400">
              تصویری توسط خریداران آپلود نشده است.
            </p>
          )}
        </div>
        {/* Comment List */}
        <div className="w-full space-y-3">
          {get.isLoadingComments ? (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          ) : (
            <>
              {get.comments?.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
              {get.comments?.length === 0 && (
                <p className="text-sm text-neutral-500 text-center py-4">
                  هنوز دیدگاهی ثبت نشده است.
                </p>
              )}
            </>
          )}
        </div>

        {get.totalPages > 1 && ( // Only show pagination if more than one page
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => on.handlePageChange(get.page - 1)}
                  className={cn(
                    "cursor-pointer",
                    get.page === 1 && "pointer-events-none opacity-50"
                  )}
                  aria-disabled={get.page === 1}
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => on.handlePageChange(get.page + 1)}
                  className={cn(
                    "cursor-pointer",
                    get.page === get.totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                  aria-disabled={get.page === get.totalPages}
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
            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <span className="text-sm md:text-base">
                برای افزودن دیدگاه، لطفا ابتدا وارد شوید.
              </span>
              <Link href="/register">
                <Button className="text-sm md:text-base">
                  ورود به حساب کاربری
                </Button>
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
