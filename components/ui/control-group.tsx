import * as React from 'react';

import { Primitive } from '@radix-ui/react-primitive';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

const ControlGroupContext = React.createContext<Pick<ControlGroupProps, 'orientation'>>({
  orientation: 'horizontal',
});

function useControlGroup() {
  const context = React.useContext(ControlGroupContext);
  if (!context) {
    throw new Error('useControlGroup must be used within a <ControlGroup />.');
  }

  return context;
}

export interface ControlGroupProps extends React.ComponentProps<typeof Primitive.div> {
  orientation?: 'horizontal' | 'vertical';
}

function ControlGroup({ className, orientation = 'horizontal', ...props }: ControlGroupProps) {
  return (
    <ControlGroupContext.Provider value={{ orientation }}>
      <Primitive.div
        data-slot="control-group"
        data-orientation={orientation}
        className={cn(
          'inline-flex rounded-md border border-orchi-gray bg-orchi-gray/20 text-orchi-light shadow-xs',
          orientation === 'vertical' ? 'flex-col' : 'flex',
          className
        )}
        {...props}
      />
    </ControlGroupContext.Provider>
  );
}

function ControlGroupItem({ className, ...props }: React.ComponentProps<typeof Slot>) {
  const { orientation } = useControlGroup();

  return (
    <Slot
      data-slot="control-group-item"
      className={cn(
        'focus-within:z-10 border-orchi-gray bg-transparent text-orchi-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchi-gold',
        orientation === 'horizontal' && '-me-px h-auto rounded-none first:rounded-s-md last:rounded-e-md last:-me-0',
        orientation === 'vertical' &&
          'w-auto rounded-none [margin-block-end:-1px] first:rounded-ss-md first:rounded-se-md last:rounded-es-md last:rounded-ee-md last:[margin-block-end:0]',
        className
      )}
      {...props}
    />
  );
}

export { ControlGroup, ControlGroupItem };
