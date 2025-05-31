import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn, getUserInfoFromCookies } from "@/lib/utils";
import {
  createCommentSchema,
  CreateCommentSchema,
} from "@/lib/validations/index.";
import { CommentService } from "@/services/commentService";
import { CreateCommentBody } from "@/services/types/commentService.types";
import { UploadService } from "@/services/uploadService";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProductDetailStore } from "../../store/ProductDetailStore";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const uploadService = new UploadService();
const commentService = new CommentService();

export function AddCommentModal() {
  const { productId } = useProductDetailStore();
  const user = getUserInfoFromCookies();
  const { toast } = useToast();

  const { addCommentModal, handleUpdateAddCommentModal } = useGlobalStore();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const form = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      body: "",
      productId: productId || 0,
      userId: 0,
      image: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    formState: { errors, isValid, isDirty },
  } = form;

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadService.uploadFile([file]),
    onSuccess: (response) => {
      toast({
        title: "تصویر با موفقیت آپلود شد",
        variant: "default",
        duration: 2000,
      });
      setUploadedImageUrl(response.data.data.url[0]);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast({
        title: "خطا در آپلود تصویر",
        variant: "destructive",
        duration: 2000,
      });
      setFile(null);
      setUploadedImageUrl(null);
    },
  });

  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationFn: (data: CreateCommentBody) => commentService.createComment(data),
    onSuccess: () => {
      toast({
        title: "دیدگاه شما با موفقیت ثبت شد، پس از تایید ، نمایش داده خواهد شد",
        variant: "default",
        duration: 2000,
      });
      handleUpdateAddCommentModal(false);
      form.reset();
      setFile(null);
      setUploadedImageUrl(null);
    },
    onError: (error) => {
      console.error("Create comment error:", error);
      toast({
        title: "خطا در ثبت دیدگاه",
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast({
          title: "حجم فایل نباید بیشتر از 5 مگابایت باشد",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      // Check if file is an image
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "لطفا فقط تصویر آپلود کنید",
          variant: "destructive",
          duration: 2000,
        });
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

  const onSubmit = (values: CreateCommentSchema) => {
    if (!uploadedImageUrl) {
      toast({
        title: "لطفا یک تصویر آپلود کنید",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (!productId) {
      toast({
        title: "خطا در شناسایی محصول",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (!user || !user.id) {
      toast({
        title: "لطفا وارد حساب کاربری خود شوید",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    createComment({
      body: values.body,
      productId,
      userId: +user.id,
      image: uploadedImageUrl,
    });
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-4 mt-4"
          >
            {/* Comment Text Area */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">دیدگاه شما</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="دیدگاه خود را بنویسید..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      type="button"
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
            <Button
              type="submit"
              className="mt-4"
              disabled={
                isUploading ||
                isCreatingComment ||
                !isValid ||
                !uploadedImageUrl ||
                !user?.id
              }
            >
              {isCreatingComment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                "ثبت دیدگاه"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
