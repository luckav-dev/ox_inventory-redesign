import React, { useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { SlotWithItem } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';
import InventorySlot from './InventorySlot';

const InventoryHotbar: React.FC = () => {
  const [hotbarVisible, setHotbarVisible] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const leftInventory = useAppSelector(selectLeftInventory);
  const items = leftInventory.items.slice(0, 4);

  const [handle, setHandle] = useState<NodeJS.Timeout>();

  useNuiEvent('setInventoryVisible', (visible: boolean) => {
    setInventoryOpen(visible);
    if (visible) {
      setHotbarVisible(true);
      if (handle) clearTimeout(handle);
    } else {
      setHotbarVisible(false);
    }
  });

  useNuiEvent('toggleHotbar', () => {
    if (inventoryOpen) return;
    if (hotbarVisible) {
      setHotbarVisible(false);
    } else {
      if (handle) clearTimeout(handle);
      setHotbarVisible(true);
      setHandle(setTimeout(() => setHotbarVisible(false), 3000));
    }
  });

  return (
    <>
      {hotbarVisible && (
        <div className="hotbar-container">
          {items.map((item) => (
            <InventorySlot
              key={`hotbar-${item.slot}`}
              item={item}
              inventoryId={leftInventory.id}
              inventoryType={leftInventory.type}
              inventoryGroups={leftInventory.groups}
              hotbar={true}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default InventoryHotbar;
