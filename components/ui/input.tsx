import * as React from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  error?: string[]
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, error, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <div className="flex flex-col gap-1">
        <div className="flex justify-center gap-2 items-center rounded-md border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          {startIcon && startIcon}
          <input
            type={type}
            disabled={props.disabled || pending}
            className={cn(
              "focus:outline-none flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error ? (
          <div className="flex flex-col gap-1">
            {error.map((error, index) => (
              <span key={`${props.id}-${index}`} className="text-xs text-red-500">
                {error}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
