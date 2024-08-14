import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Import Slot to use any component or native element as a root node.
import { cva } from "class-variance-authority"; // Import CVA for handling conditional classes based on props.
import { cn } from "../../lib/utils"; // Utility for combining class names.

// Define base and variant styles using CVA.
const buttonVariants = cva(
  // Base styles applied to all buttons.
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Forward ref to allow ref passing to the component.
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Decide to use a Slot component or a 'button' element as the root based on `asChild` prop.
    const Comp = asChild ? Slot : "button";

    // Apply dynamic classes based on the variant and size while allowing custom classes to be combined.
    const componentClasses = buttonVariants({ variant, size, className });

    return (
      <Comp
        className={cn(componentClasses)} // Combine computed classes with utility.
        ref={ref}
        {...props} // Spread additional props to support attributes like 'type', 'onClick', etc.
      />
    );
  }
);

Button.displayName = "Button"; // Set displayName for better debugging in React DevTools.

export { Button, buttonVariants };
