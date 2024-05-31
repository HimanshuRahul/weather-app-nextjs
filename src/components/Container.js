import React from "react";
import { cn } from "@/utils/cn";

function Container({ className, children, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-gray-200 border rounded-xl flex shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
