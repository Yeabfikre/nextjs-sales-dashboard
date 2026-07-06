import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-sm border border-card-border bg-card px-7.5 py-6 shadow-default",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
