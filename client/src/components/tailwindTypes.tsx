// lib/variants/button.ts  (or your preferred path)
import { tv } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center",
    " w-full",
    "px-4 py-1.5 rounded-full",
    "font-medium transition-all duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60"
  ],
  variants: {
    color: {
      primary: "bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:outline-gray-400",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-400",
      // Add more as needed
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-1.5", // default
      lg: "px-6 py-2 text-lg",
    },
    flat: {
      true: "", // will be overridden in compoundVariants
    },
    disabled: {
      true: "opacity-60 cursor-not-allowed",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
  compoundVariants: [
    // Flat + primary → blue tint
    {
      color: "primary",
      flat: true,
      class: "bg-blue-500/40 text-blue-800 hover:bg-blue-500/60 focus-visible:outline-blue-500",
    },
    // Flat + secondary
    {
      color: "secondary",
      flat: true,
      class: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50",
    },
    // Ensure `disabled` works with any combo
    {
      disabled: true,
      class: "pointer-events-none",
    },
  ],
});

const scroll=tv({base:[
  " [&::-webkit-scrollbar]:w-2",
    "[&::-webkit-scrollbar-track]:bg-gray-100",
     " [&::-webkit-scrollbar-track]:rounded-full",
    "[&::-webkit-scrollbar-thumb]:bg-red-500",
     " [&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:h-10 ",
         "[&::-webkit-scrollbar-thumb]:w-10",
    "dark:[&::-webkit-scrollbar-track]:bg-neutral-700",
   " dark:[&::-webkit-scrollbar-thumb]:bg-red-500"
]})
export { button,scroll };