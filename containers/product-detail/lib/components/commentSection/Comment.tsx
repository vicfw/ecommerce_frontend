import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Comment as CommentType } from "@/types/globalTypes";
import { format } from "date-fns-jalali";
import React from "react";

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="border-t px-2 w-full pt-2">
      {/* Name & Date */}
      <div className="flex items-center justify-between">
        <UI_Typography>{comment.user.name}</UI_Typography>
        <UI_Typography>
          {format(new Date(comment.createdAt), "yyyy/MM/dd")}
        </UI_Typography>
      </div>

      {/* Comment */}
      <UI_Typography>{comment.body}</UI_Typography>
    </div>
  );
};

export default Comment;
