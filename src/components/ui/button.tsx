import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Editorial button styling. Exported as classes so it can be applied to
 * both <button> and next/link without wrapper components.
 */
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-none text-[0.8125rem] font-medium tracking-[0.02em] whitespace-nowrap transition-colors duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        onDark:
          "border border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
        link: "text-foreground underline decoration-border-strong decoration-1 underline-offset-4 hover:decoration-accent",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
