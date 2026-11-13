"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { useToast } from "@/hooks/use-toast";
import { OrderService } from "@/services/oderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const orderService = new OrderService();

const STATUS_LABEL: Record<string, string> = {
  pending: "درخواست مرجوعی در انتظار بررسی است",
  approved: "درخواست مرجوعی تایید شد",
  rejected: "درخواست مرجوعی رد شد",
};

type ReturnRequestSectionProps = {
  orderId: number;
  orderStatus: string;
};

export const ReturnRequestSection = ({
  orderId,
  orderStatus,
}: ReturnRequestSectionProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const { data: returnRequest } = useQuery({
    queryKey: ["return-request", orderId],
    queryFn: () => orderService.getReturnRequest(orderId),
    select: (res) => res.data.data,
  });

  const { mutate: submitReturn, isPending } = useMutation({
    mutationFn: () => orderService.createReturnRequest(orderId, reason.trim()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["return-request", orderId] });
      setOpen(false);
      setReason("");
      toast({ title: "درخواست مرجوعی ثبت شد" });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast({
        title: "خطا",
        description:
          error?.response?.data?.message || "ثبت درخواست مرجوعی ممکن نشد",
        variant: "destructive",
      });
    },
  });

  if (returnRequest) {
    return (
      <div className="mx-3 md:mx-4 mt-4 p-3 border rounded-lg">
        <UI_Typography className="text-foreground reg14">
          {STATUS_LABEL[returnRequest.status] || returnRequest.status}
        </UI_Typography>
      </div>
    );
  }

  if (orderStatus !== "delivered") {
    return null;
  }

  return (
    <>
      <div className="mx-3 md:mx-4 mt-4">
        <Button
          type="button"
          variant="outline"
          data-testid="order-return-request"
          onClick={() => setOpen(true)}
        >
          درخواست مرجوعی
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle>درخواست مرجوعی</DialogTitle>
          </DialogHeader>
          <UI_Typography className="text-muted-foreground reg14">
            دلیل مرجوعی را بنویسید.
          </UI_Typography>
          <Textarea
            id="return-reason"
            data-testid="order-return-reason"
            aria-label="دلیل مرجوعی"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />
          <Button
            type="button"
            data-testid="order-return-submit"
            disabled={isPending || !reason.trim()}
            onClick={() => submitReturn()}
          >
            ثبت درخواست
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
