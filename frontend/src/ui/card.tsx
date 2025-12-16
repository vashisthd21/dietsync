import * as React from "react";
import { cn } from "./utils";

/* =========================
   Card
========================= */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        `
        flex flex-col gap-6 rounded-xl border
        bg-white text-gray-900 border-gray-200
        dark:bg-gray-800 dark:text-white dark:border-gray-700
        `,
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Card Header
========================= */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `
        grid auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 pt-6
        border-b border-gray-200
        dark:border-gray-700
        `,
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Card Title (WHITE in dark)
========================= */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn(
        "text-lg font-semibold text-gray-900 dark:text-white",
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Card Description (Muted)
========================= */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm text-gray-600 dark:text-gray-300",
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Card Action
========================= */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("self-start justify-self-end", className)}
      {...props}
    />
  );
}

/* =========================
   Card Content
========================= */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 pb-6 text-gray-800 dark:text-white",
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Card Footer
========================= */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        `
        flex items-center px-6 pb-6 pt-4
        border-t border-gray-200
        dark:border-gray-700
        `,
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
