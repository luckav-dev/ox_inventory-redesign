import { flip, FloatingPortal, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../store';
import SlotTooltip from '../inventory/SlotTooltip';

const Tooltip: React.FC = () => {
  const hoverData = useAppSelector((state) => state.tooltip);
  const clientX = hoverData.coords?.x || 0;
  const clientY = hoverData.coords?.y || 0;

  const { refs, context, floatingStyles } = useFloating({
    middleware: [flip(), shift(), offset({ mainAxis: 10, crossAxis: 10 })],
    open: hoverData.open,
    placement: 'right-start',
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
  });

  styles.transform = `translate(${clientX}px, ${clientY}px)`;

  return (
    <>
      {isMounted && hoverData.item && hoverData.inventoryType && (
        <FloatingPortal>
          <SlotTooltip
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...styles }}
            item={hoverData.item!}
            inventoryType={hoverData.inventoryType!}
            coords={hoverData.coords ? { x: hoverData.coords.x, y: hoverData.coords.y } : { x: 0, y: 0 }}
          />
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;