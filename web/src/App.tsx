import InventoryComponent from './components/inventory';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory } from './typings';
import { useAppDispatch } from './store';
import { debugData } from './utils/debugData';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';

debugData([
  {
    action: 'init',
    data: {
      locale: {
        ui_use: 'Use',
        ui_give: 'Give',
        ui_close: 'Close',
        ui_matches: 'Matches',
      },
      items: {
        iron: { name: 'iron', label: 'Iron', weight: 100, stack: true },
        powersaw: { name: 'powersaw', label: 'Powersaw', weight: 5000, stack: false },
        copper: { name: 'copper', label: 'Copper', weight: 50, stack: true },
        water: { name: 'water', label: 'Water', weight: 500, stack: true },
        backwoods: { name: 'backwoods', label: 'Backwoods', weight: 10, stack: true },
        weapon_pistol: { name: 'weapon_pistol', label: 'Pistol', weight: 1000, stack: false },
        lockpick: { name: 'lockpick', label: 'Lockpick', weight: 100, stack: true },
      },
      imagepath: 'images',
      leftInventory: {
        id: 'player-1',
        type: 'player',
        slots: 50,
        label: 'Player',
        weight: 0,
        maxWeight: 50000,
        items: [],
      }
    },
  },
  {
    action: 'setupInventory',
    data: {
      playerData: {
        playerID: '1',
      },
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 50,
        label: 'Inventory',
        weight: 3000,
        maxWeight: 50000,
        backpackDisabled: false,
        items: [
          {
            slot: 1,
            name: 'iron',
            weight: 3000,
            metadata: {
              description: `name: Svetozar Miletic  \n Gender: Male`,
              ammo: 3,
              mustard: '60%',
              ketchup: '30%',
              mayo: '10%',
            },
            count: 5,
          },
          { slot: 2, name: 'powersaw', weight: 0, count: 1, metadata: { durability: 75 } },
          { slot: 3, name: 'copper', weight: 100, count: 12, metadata: { type: 'Special' } },
          {
            slot: 4,
            name: 'water',
            weight: 10000,
            count: 1,
            metadata: { description: 'Generic item description' },
          },
          { slot: 5, name: 'water', weight: 100, count: 1 },
          {
            slot: 6,
            name: 'backwoods',
            weight: 100,
            count: 1,
            metadata: {
              label: 'Cream',
              imageurl: 'https://i.imgur.com/2xHhTTz.png',
            },
          },
          {
            slot: 7, name: 'weapon_pistol', weight: 10, count: 1, metadata: {
              durability: 75,
              description: `name: Svetozar Miletic  \n Gender: Male`,
              ammo: 3,
              mustard: '60%',
              ketchup: '30%',
              mayo: '10%',

            }
          },
        ],
      },
      rightInventory: {
        id: 'shop',
        type: 'shop',
        slots: 5000,
        label: 'Shop',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'lockpick',
            weight: 500,
            price: 300,
            ingredients: {
              iron: 5,
              copper: 12,
              powersaw: 0.1,
            },
            metadata: {
              description: 'Simple lockpick that breaks easily and can pick basic door locks',
            },
          },
        ],
      },

    },
  },
  {
    action: 'setInventoryVisible',
    data: true,
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();

  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
  }>('init', ({ locale, items, leftInventory, imagepath }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory }));
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  return (
    <div className="app-wrapper">
      <InventoryComponent />
      <DragPreview />
      <KeyPress />
    </div>
  );
};

addEventListener("dragstart", function (event) {
  event.preventDefault()
})

export default App;
