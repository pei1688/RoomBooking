import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input  bg-background text-gray-400 hover:bg-accent hover:text-gray-600 duraction-200",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 ",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-stone-100 underline-offset-4 hover:underline hover:text-boshe-100 ",
        login:
          " border-input border border-boshe-300  bg-gray-300 text-gray-600 hover:bg-gray-200 duraction-200 mt-5  w-full ",
        back: "text-boshe-100 bg-boshe-400 hover:bg-boshe-300",
        check:
          "text-zinc-100 underline-offset-4 hover:underline hover:text-zinc-200",
        update:
          "text-gray-100 bg-boshe-200 mt-5 hover:bg-boshe-300  hover:text-gray-200",
        filter: " text-zinc-100  border border-boshe-300 hover:bg-boshe-400",
        reset:"p-4 py-2 hover:bg-boshe-400  duration-200 tracking-[3px] text-[16px]",
        nextprev:" rounded-full border border-boshe-300 hover:border-boshe-200 hover:bg-boshe-400  duration-200 p-3 "
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 ",
        none:""
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
