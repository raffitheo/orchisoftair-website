'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 tactical-text transform hover:scale-105',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-orchi-red to-orchi-red/90 text-white hover:from-orchi-gold hover:to-orchi-gold/90 shadow-lg hover:shadow-xl',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl',
        outline:
          'border-2 border-orchi-gray/50 bg-transparent text-orchi-light hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 backdrop-blur-sm',
        secondary:
          'bg-gradient-to-r from-orchi-gold to-orchi-gold/90 text-orchi hover:from-orchi-gold/80 hover:to-orchi-gold/70 shadow-lg hover:shadow-xl',
        ghost: 'hover:bg-orchi-gray/20 hover:text-orchi-gold text-orchi-light backdrop-blur-sm',
        link: 'text-orchi-gold underline-offset-4 hover:underline hover:text-orchi-red transform-none hover:scale-100',
      },
      size: {
        default: 'h-12 px-8 py-3 text-base',
        sm: 'h-10 rounded-md px-6 text-sm',
        lg: 'h-14 rounded-lg px-10 text-lg',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
