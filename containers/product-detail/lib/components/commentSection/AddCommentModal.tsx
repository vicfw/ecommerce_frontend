import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGlobalStore } from "@/store/globalStore";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UploadService } from "@/services/uploadService";
import { useMutation } from "@tanstack/react-query";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export function AddCommentModal() {
  const { addCommentModal, handleUpdateAddCommentModal } = useGlobalStore();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const uploadService = new UploadService();

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadService.uploadFile(file),
    onSuccess: (response) => {
      toast.success("تصویر با موفقیت آپلود شد");
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error("خطا در آپلود تصویر");
      setFile(null);
      setUploadedImageUrl(null);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("حجم فایل نباید بیشتر از 5 مگابایت باشد");
        return;
      }

      // Check if file is an image
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("لطفا فقط تصویر آپلود کنید");
        return;
      }

      setFile(selectedFile);
      uploadFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadedImageUrl(null);
  };

  return (
    <Dialog
      open={addCommentModal.open}
      onOpenChange={handleUpdateAddCommentModal}
    >
      <DialogContent
        className={cn(
          "sm:max-w-[425px] h-[100dvh]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]",
          "flex flex-col justify-start"
        )}
      >
        <DialogHeader className="flex justify-end mt-10">
          <DialogTitle className="text-right">افزودن دیدگاه</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col justify-start gap-4 mt-4">
          {/* Comment Text Area */}
          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="text-sm font-medium text-right">
              دیدگاه شما
            </label>
            <Textarea
              id="comment"
              placeholder="دیدگاه خود را بنویسید..."
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* File Upload Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-right">
              تصویر (حداکثر 5 مگابایت)
            </label>
            <div className="border-2 border-dashed rounded-lg p-4">
              {!file ? (
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="file-upload"
                    className={cn(
                      "flex flex-col items-center gap-2 cursor-pointer",
                      isUploading && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {isUploading
                        ? "در حال آپلود..."
                        : "برای آپلود تصویر کلیک کنید"}
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : null}
                  <img
                    src={uploadedImageUrl || URL.createObjectURL(file)}
                    alt="Preview"
                    className={cn(
                      "w-full h-full object-cover",
                      isUploading && "opacity-50"
                    )}
                  />
                  <button
                    onClick={removeFile}
                    className="absolute top-1 right-1 p-1 bg-background/80 rounded-full hover:bg-background"
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button className="mt-4" disabled={isUploading}>
            ثبت دیدگاه
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
