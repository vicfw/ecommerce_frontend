import { getClientSideCookie } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import { useProductDetailStore } from "../../store/ProductDetailStore";
import { CommentService } from "@/services/commentService";

const commentService = new CommentService();

const LIMIT = 4;

export const useCommentSection = () => {
  const token = getClientSideCookie("jwt");
  const { productId } = useProductDetailStore();
  const { handleUpdateAddCommentModal } = useGlobalStore();

  const [openLoginSheet, setOpenLoginSheet] = useState(false);
  const [page, setPage] = useState(1);

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", productId, page],
    queryFn: () =>
      commentService.getComments({
        productId: productId!,
        page: page,
        limit: LIMIT,
      }),
    enabled: !!productId,
  });

  const handleLoginSheetOpenChange = (open: boolean) => {
    setOpenLoginSheet(open);
  };

  const handleOpenAddCommentModal = () => {
    if (!token) {
      setOpenLoginSheet(true);
    } else {
      handleUpdateAddCommentModal(true);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const commentsImages = useMemo(() => {
    return comments?.data.data.slice(0, 4).map((comment) => comment.image);
  }, [comments]);

  const totalPages = comments?.data.total
    ? Math.ceil(comments?.data.total / LIMIT)
    : 0;

  return {
    get: {
      openLoginSheet,
      token,
      comments: comments?.data.data,
      totalComments: comments?.data.total,
      isLoadingComments,
      commentsImages,
      page,
      totalPages,
    },
    on: {
      handleLoginSheetOpenChange,
      handleOpenAddCommentModal,
      handlePageChange,
    },
  };
};
