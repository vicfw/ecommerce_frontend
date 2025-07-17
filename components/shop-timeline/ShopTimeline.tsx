import { ShoppingCart, Truck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type CartTimelineProps = {
  currentStep?: "cart" | "shipping" | "checkout";
};

export const ShopTimeline = ({ currentStep = "cart" }: CartTimelineProps) => {
  const steps = [
    {
      id: "cart",
      icon: ShoppingCart,
      isActive: currentStep === "cart",
      isCompleted: currentStep !== "cart",
    },
    {
      id: "shipping",
      icon: Truck,
      isActive: currentStep === "shipping",
      isCompleted: currentStep === "checkout",
    },
    {
      id: "checkout",
      icon: CreditCard,
      isActive: currentStep === "checkout",
      isCompleted: false,
    },
  ];

  // Determine line color based on completion status
  const getLineColor = () => {
    if (currentStep === "checkout") return "bg-black";
    if (currentStep === "shipping") return "bg-black";
    return "bg-gray-200";
  };

  return (
    <div className="w-full relative mb-2">
      {/* Steps with icons positioned on the line */}
      <div className="relative flex justify-between items-center px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
              <step.icon
                size={20}
                className={cn(
                  "transition-colors duration-200",
                  step.isActive
                    ? "text-primary"
                    : step.isCompleted
                    ? "text-primary"
                    : "text-gray-400"
                )}
              />
            </div>
          </div>
        ))}

        {/* Single line connecting all icons */}
        <div
          className={cn(
            "absolute top-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-8rem)] h-0.5 transition-colors duration-200",
            getLineColor()
          )}
        />
      </div>
    </div>
  );
};
