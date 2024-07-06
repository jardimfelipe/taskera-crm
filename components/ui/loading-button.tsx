import { Loader2 } from 'lucide-react'
import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, ButtonProps } from './button'

interface LoadingButtonProps extends ButtonProps {
}

export const LoadingButton = ({ children, ...props }: PropsWithChildren<LoadingButtonProps>) => {
  const { pending } = useFormStatus()
  return (
    pending ? (
      <Button size="icon" {...props} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    ) : (
      <Button {...props}>{children}</Button>
    )
  )
}
