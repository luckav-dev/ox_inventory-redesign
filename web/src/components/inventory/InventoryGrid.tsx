import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);
  const renderIcon = () => {
    if (inventory.label === 'hotbar') {
      return (
        <svg style={{
          zIndex: 200,
        }} xmlns="http://www.w3.org/2000/svg" width="1.3021vw" height="2.3148vh" viewBox="0 0 25 25" fill="none">
          <path d="M24.9974 6.25123C24.9974 6.25123 22.8892 10.6951 22.3184 12.9691C21.5718 15.9439 22.4268 18.1921 21.3418 21.0769C19.467 24.46 19.3403 25.0074 12.4983 24.9999C9.99097 24.9974 2.81064 23.0859 2.81064 23.0859C1.82071 22.8317 0 22.9817 0 21.8751C0 20.7686 1.29491 19.9619 2.4465 19.9586L6.97868 20.3569C8.08027 20.2878 9.23269 19.6436 9.26769 18.2029C9.24936 16.0714 9.03854 14.4348 7.95695 12.7033L3.75557 6.1479C3.50476 5.62627 3.44476 4.73634 4.17138 4.33886C4.89799 3.94139 5.72293 4.53218 6.00458 5.04631L10.6968 11.4292C11.1984 11.895 12.0892 11.985 12.0133 10.9926L9.94097 1.4924C9.81182 0.817443 10.1543 0 10.9359 0C11.9617 0 12.5916 0.391639 12.5716 1.01076L14.8498 10.3843C15.0281 10.8401 15.6597 10.7801 15.8297 10.3584L16.4789 1.24325C16.5122 0.952434 16.8913 0.445802 17.6196 0.550795C18.3479 0.655788 18.767 1.43657 18.6904 1.73738L18.4795 10.7443C18.627 11.5425 19.2545 11.6592 19.7436 11.2134L22.9326 5.51128C23.1259 5.03298 23.885 4.93382 24.3241 5.12298C24.7333 5.38962 24.9991 5.74627 24.9991 6.24873L24.9974 6.25123Z" fill="white" />
        </svg>
      );
    } else {
      return (
        <svg style={{
          zIndex: 200,
        }} xmlns="http://www.w3.org/2000/svg" width="1.3021vw" height="2.3148vh" viewBox="0 0 25 25" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66112 0.326598C4.88448 0.138468 5.16146 0.0255302 5.45268 0.00383796C5.74391 -0.0178543 6.03456 0.052803 6.28333 0.205766C11.0833 3.15991 13.7138 6.89738 15.1166 11.0112C15.4638 12.0293 15.7346 13.0668 15.9444 14.1168C17.3735 11.714 19.6568 9.80846 23.0957 8.43347C23.3382 8.33664 23.603 8.31012 23.8599 8.35695C24.1167 8.40378 24.3552 8.52207 24.5479 8.69824C24.7406 8.87442 24.8797 9.10134 24.9494 9.35298C25.019 9.60462 25.0163 9.8708 24.9415 10.121L24.6901 10.9598C22.8012 17.2487 22.2221 19.1751 22.2221 23.6111C22.2221 23.9795 22.0758 24.3327 21.8153 24.5932C21.5548 24.8537 21.2016 25 20.8332 25H4.16668C3.79833 25 3.44506 24.8537 3.1846 24.5932C2.92413 24.3327 2.7778 23.9795 2.7778 23.6111C2.7778 18.2445 2.12225 14.9237 0.0708814 8.77236C-0.0126051 8.52115 -0.0225629 8.25132 0.0421813 7.99464C0.106926 7.73797 0.243675 7.50514 0.436321 7.32358C0.628968 7.14203 0.869487 7.01931 1.12955 6.96988C1.38961 6.92046 1.65838 6.94638 1.9042 7.0446C3.84168 7.8182 5.31389 8.85153 6.42499 10.0723C6.05478 7.26964 5.32952 4.52541 4.26668 1.90575C4.15793 1.6345 4.13751 1.33586 4.20833 1.05234C4.27915 0.768814 4.4376 0.514851 4.66112 0.326598Z" fill="white" />
        </svg>
      );
    }
  };
  const renderText = () => {
    if (inventory.label === 'hotbar') {
      return (
        <p className="inv-desc">Quickly equip your items</p>
      );
    } else if (inventory.type === 'player') {
      return (
        <p className="inv-desc">The items on your character</p>
      );
    } else {
      return (
        <p className="inv-desc">Find and pickup items</p>
      );
    }
  };
  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <>
      {inventory.label !== 'hotbar' && (
        <div className="inventory-grid-wrapper"
          style={{
            pointerEvents: isBusy ? 'none' : 'auto',
          }}
        >
          <div className="inventory-head"
            style={{
              display: (inventory.type === 'player' ? 'none' : 'flex'),
            }}
          >
            <div className="inventory-grid-header-wrapper">
              <div className='inventory-icon-box'>
                <div style={{
                  display: 'flex',
                  width: '2.0833vw',
                  height: '3.7037vh',
                  borderRadius: '.1563vw',
                  background: 'rgba(255, 255, 255, 0.10)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {renderIcon()}
                </div>
              </div>
              <div className='inventory-txt-box'>
                <p className='inventory-label-text'>{inventory.label}</p>
                {renderText()}
              </div>
            </div>
            <div className='inventory-grid-header-bottom'>
              {inventory.maxWeight && inventory.label !== 'hotbar' && (
                <div className='weight-text-area'>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '0.9vw',
                    height: '1.6vh',
                    borderRadius: '.1vw',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width=".55vw" height="1vh" viewBox="0 0 15 15" fill="none">
                      <path d="M14.1155 4.60045C14.0162 4.50043 13.898 4.42111 13.7679 4.36709C13.6377 4.31306 13.4981 4.2854 13.3571 4.28571H11.2143V3.75C11.2143 2.75544 10.8192 1.80161 10.1159 1.09835C9.41267 0.395088 8.45885 0 7.46428 0C6.46972 0 5.5159 0.395088 4.81264 1.09835C4.10937 1.80161 3.71429 2.75544 3.71429 3.75V4.28571H1.57143C1.28727 4.28571 1.01475 4.3986 0.813814 4.59953C0.612882 4.80046 0.5 5.07298 0.5 5.35714V12.5893C0.5 13.8951 1.60491 15 2.91071 15H12.0179C12.6495 15.0002 13.2561 14.7532 13.708 14.3119C13.9355 14.095 14.1165 13.8342 14.2404 13.5453C14.3642 13.2564 14.4282 12.9454 14.4286 12.6311V5.35714C14.429 5.21658 14.4016 5.07733 14.3478 4.94744C14.2941 4.81755 14.2151 4.69961 14.1155 4.60045ZM4.78571 3.75C4.78571 3.0396 5.06792 2.35829 5.57025 1.85596C6.07258 1.35363 6.75388 1.07143 7.46428 1.07143C8.17469 1.07143 8.85599 1.35363 9.35832 1.85596C9.86065 2.35829 10.1429 3.0396 10.1429 3.75V4.28571H4.78571V3.75Z" fill="white" />
                    </svg>
                  </div>
                  <p className='weight1'>{weight / 1000}/ </p><span className='weight2'>{inventory.maxWeight / 1000}kg</span>
                </div>
              )}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '9vw',
                height: '0.8vh',
                borderRadius: '.1vw',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(68, 68, 68, 0.15)',
                display: 'flex',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div className='custom-weight-bar'>
                  <div className='bar' style={{
                    width: `${inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0}%`,

                  }}>
                    <svg style={{
                      position: 'absolute',

                      zIndex: 110,
                      width: '100%',
                      height: '100%',
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 10" fill="none" preserveAspectRatio="none">
                      <rect x="0" y="0" width="160" height="10" rx="2" fill="white" fill-opacity="1" />
                    </svg>
                  </div>
                  <svg style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 10" fill="none" preserveAspectRatio="none">
                    <path d="M0 2C0 0.89543 0.895431 0 2 0H38C39.1046 0 40 0.895431 40 2V8C40 9.10457 39.1046 10 38 10H2C0.89543 10 0 9.10457 0 8V2Z" fill="white" fill-opacity="0.05" />
                    <path d="M43 2C43 0.89543 43.8954 0 45 0H78C79.1046 0 80 0.895431 80 2V8C80 9.10457 79.1046 10 78 10H45C43.8954 10 43 9.10457 43 8V2Z" fill="white" fill-opacity="0.05" />
                    <path d="M83 2C83 0.89543 83.8954 0 85 0H118C119.105 0 120 0.895431 120 2V8C120 9.10457 119.105 10 118 10H85C83.8954 10 83 9.10457 83 8V2Z" fill="white" fill-opacity="0.05" />
                    <path d="M123 2C123 0.89543 123.895 0 125 0H158C159.105 0 160 0.895431 160 2V8C160 9.10457 159.105 10 158 10H125C123.895 10 123 9.10457 123 8V2Z" fill="white" fill-opacity="0.05" />
                  </svg>
                </div>
              </div>



            </div>

          </div>
          <div className="inventory-head"
            style={{
              display: (inventory.type === 'player' ? 'flex' : 'none'),
              justifyContent: 'space-between',
            }}
          ><div className="inventory-grid-header-wrapper">
              <div className='inventory-icon-box'>
                <div style={{
                  display: 'flex',
                  width: '2.0833vw',
                  height: '3.7037vh',
                  borderRadius: '.1563vw',
                  background: 'rgba(255, 255, 255, 0.10)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {renderIcon()}
                </div>
              </div>
              <div className='inventory-txt-box'>
                <p className='inventory-label-text'>{inventory.label}</p>
                {renderText()}
              </div>
            </div>
            <div className='inventory-grid-header-bottom'>
              {inventory.maxWeight && inventory.label !== 'hotbar' && (
                <div className='weight-text-area'>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '0.9vw',
                    height: '1.6vh',
                    borderRadius: '.1vw',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width=".55vw" height="1vh" viewBox="0 0 15 15" fill="none">
                      <path d="M14.1155 4.60045C14.0162 4.50043 13.898 4.42111 13.7679 4.36709C13.6377 4.31306 13.4981 4.2854 13.3571 4.28571H11.2143V3.75C11.2143 2.75544 10.8192 1.80161 10.1159 1.09835C9.41267 0.395088 8.45885 0 7.46428 0C6.46972 0 5.5159 0.395088 4.81264 1.09835C4.10937 1.80161 3.71429 2.75544 3.71429 3.75V4.28571H1.57143C1.28727 4.28571 1.01475 4.3986 0.813814 4.59953C0.612882 4.80046 0.5 5.07298 0.5 5.35714V12.5893C0.5 13.8951 1.60491 15 2.91071 15H12.0179C12.6495 15.0002 13.2561 14.7532 13.708 14.3119C13.9355 14.095 14.1165 13.8342 14.2404 13.5453C14.3642 13.2564 14.4282 12.9454 14.4286 12.6311V5.35714C14.429 5.21658 14.4016 5.07733 14.3478 4.94744C14.2941 4.81755 14.2151 4.69961 14.1155 4.60045ZM4.78571 3.75C4.78571 3.0396 5.06792 2.35829 5.57025 1.85596C6.07258 1.35363 6.75388 1.07143 7.46428 1.07143C8.17469 1.07143 8.85599 1.35363 9.35832 1.85596C9.86065 2.35829 10.1429 3.0396 10.1429 3.75V4.28571H4.78571V3.75Z" fill="white" />
                    </svg>
                  </div>
                  <p className='weight1'>{weight / 1000}/ </p><span className='weight2'>{inventory.maxWeight / 1000}kg</span>
                </div>
              )}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '9vw',
                height: '0.8vh',
                borderRadius: '.1vw',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(68, 68, 68, 0.15)',
                display: 'flex',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div className='custom-weight-bar'>
                  <div className='bar' style={{
                    width: `${inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0}%`,

                  }}>
                    <svg style={{
                      position: 'absolute',

                      zIndex: 110,
                      width: '100%',
                      height: '100%',
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 10" fill="none" preserveAspectRatio="none">
                      <rect x="0" y="0" width="160" height="10" rx="2" fill="white" fill-opacity="1" />
                    </svg>
                  </div>
                  <svg style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 10" fill="none" preserveAspectRatio="none">
                    <path d="M0 2C0 0.89543 0.895431 0 2 0H38C39.1046 0 40 0.895431 40 2V8C40 9.10457 39.1046 10 38 10H2C0.89543 10 0 9.10457 0 8V2Z" fill="white" fill-opacity="0.05" />
                    <path d="M43 2C43 0.89543 43.8954 0 45 0H78C79.1046 0 80 0.895431 80 2V8C80 9.10457 79.1046 10 78 10H45C43.8954 10 43 9.10457 43 8V2Z" fill="white" fill-opacity="0.05" />
                    <path d="M83 2C83 0.89543 83.8954 0 85 0H118C119.105 0 120 0.895431 120 2V8C120 9.10457 119.105 10 118 10H85C83.8954 10 83 9.10457 83 8V2Z" fill="white" fill-opacity="0.05" />
                    <path d="M123 2C123 0.89543 123.895 0 125 0H158C159.105 0 160 0.895431 160 2V8C160 9.10457 159.105 10 158 10H125C123.895 10 123 9.10457 123 8V2Z" fill="white" fill-opacity="0.05" />
                  </svg>
                </div>
              </div>



            </div>

          </div>
          <div className="inventory-grid-container">
            <>
              {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
                <InventorySlot
                  key={`${inventory.type}-${inventory.id}-${item.slot}`}
                  item={item}
                  ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                  hotbar={inventory.label === 'hotbar'}
                />
              ))}
            </>
          </div>
        </div >
      )}

      {
        inventory.label == 'hotbar' && (
          <div
            className="inventory-grid-wrapper"
            style={{
              pointerEvents: isBusy ? 'none' : 'auto',
            }}
          >
            <div className="inventory-head">
              <div className="inventory-grid-header-wrapper">
                <div className='inventory-icon-box'>
                  <div style={{
                    display: 'flex',
                    width: '2.0833vw',
                    height: '3.7037vh',
                    borderRadius: '.1563vw',
                    background: 'rgba(255, 255, 255, 0.10)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {renderIcon()}
                  </div>
                </div>
                <div className='inventory-txt-box'>
                  <p className='inventory-label-text'>{inventory.label}</p>
                  {renderText()}
                </div>
              </div>
              <div className='inventory-grid-header-bottom'>
                {inventory.maxWeight && (
                  <div className='weight-text-area'>
                    <p className='weight1'>{weight / 1000}/ </p><span className='weight2'> {inventory.maxWeight / 1000}kg</span>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '1.3021vw',
                      height: '2.3148vh',
                      borderRadius: '.1563vw',
                      background: 'rgba(255, 255, 255, 0.05)',
                      marginLeft: '.5208vw',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width=".7813vw" height="1.3889vh" viewBox="0 0 15 15" fill="none">
                        <path d="M14.1155 4.60045C14.0162 4.50043 13.898 4.42111 13.7679 4.36709C13.6377 4.31306 13.4981 4.2854 13.3571 4.28571H11.2143V3.75C11.2143 2.75544 10.8192 1.80161 10.1159 1.09835C9.41267 0.395088 8.45885 0 7.46428 0C6.46972 0 5.5159 0.395088 4.81264 1.09835C4.10937 1.80161 3.71429 2.75544 3.71429 3.75V4.28571H1.57143C1.28727 4.28571 1.01475 4.3986 0.813814 4.59953C0.612882 4.80046 0.5 5.07298 0.5 5.35714V12.5893C0.5 13.8951 1.60491 15 2.91071 15H12.0179C12.6495 15.0002 13.2561 14.7532 13.708 14.3119C13.9355 14.095 14.1165 13.8342 14.2404 13.5453C14.3642 13.2564 14.4282 12.9454 14.4286 12.6311V5.35714C14.429 5.21658 14.4016 5.07733 14.3478 4.94744C14.2941 4.81755 14.2151 4.69961 14.1155 4.60045ZM4.78571 3.75C4.78571 3.0396 5.06792 2.35829 5.57025 1.85596C6.07258 1.35363 6.75388 1.07143 7.46428 1.07143C8.17469 1.07143 8.85599 1.35363 9.35832 1.85596C9.86065 2.35829 10.1429 3.0396 10.1429 3.75V4.28571H4.78571V3.75Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                )}
                <div style={{
                  position: 'relative',
                  width: '10.6771vw',
                  height: '1.8519vh',
                  borderRadius: '.1563vw',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(68, 68, 68, 0.15)',
                  display: 'flex',

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div className='custom-weight-bar'>
                    <div className='bar' style={{
                      width: `${inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0}%`,

                    }}>
                      <svg style={{
                        position: 'absolute',

                        zIndex: 110,
                      }} xmlns="http://www.w3.org/2000/svg" width="10.1563vw" height="0.9259vh" viewBox="0 0 195 10" fill="none">
                        <path d="M0 2C0 0.89543 0.895431 0 2 0H33C34.1046 0 35 0.895431 35 2V8C35 9.10457 34.1046 10 33 10H2C0.89543 10 0 9.10457 0 8V2Z" fill="white" fill-opacity="1" />
                        <path d="M40 2C40 0.89543 40.8954 0 42 0H73C74.1046 0 75 0.895431 75 2V8C75 9.10457 74.1046 10 73 10H42C40.8954 10 40 9.10457 40 8V2Z" fill="white" fill-opacity="1" />
                        <path d="M80 2C80 0.89543 80.8954 0 82 0H113C114.105 0 115 0.895431 115 2V8C115 9.10457 114.105 10 113 10H82C80.8954 10 80 9.10457 80 8V2Z" fill="white" fill-opacity="1" />
                        <path d="M120 2C120 0.89543 120.895 0 122 0H153C154.105 0 155 0.895431 155 2V8C155 9.10457 154.105 10 153 10H122C120.895 10 120 9.10457 120 8V2Z" fill="white" fill-opacity="1" />
                        <path d="M160 2C160 0.89543 160.895 0 162 0H193C194.105 0 195 0.895431 195 2V8C195 9.10457 194.105 10 193 10H162C160.895 10 160 9.10457 160 8V2Z" fill="white" fill-opacity="1" />
                      </svg>
                    </div>
                    <svg style={{
                      position: 'absolute',

                    }} xmlns="http://www.w3.org/2000/svg" width="10.1563vw" height="0.9259vh" viewBox="0 0 195 10" fill="none">
                      <path d="M0 2C0 0.89543 0.895431 0 2 0H33C34.1046 0 35 0.895431 35 2V8C35 9.10457 34.1046 10 33 10H2C0.89543 10 0 9.10457 0 8V2Z" fill="white" fill-opacity="0.05" />
                      <path d="M40 2C40 0.89543 40.8954 0 42 0H73C74.1046 0 75 0.895431 75 2V8C75 9.10457 74.1046 10 73 10H42C40.8954 10 40 9.10457 40 8V2Z" fill="white" fill-opacity="0.05" />
                      <path d="M80 2C80 0.89543 80.8954 0 82 0H113C114.105 0 115 0.895431 115 2V8C115 9.10457 114.105 10 113 10H82C80.8954 10 80 9.10457 80 8V2Z" fill="white" fill-opacity="0.05" />
                      <path d="M120 2C120 0.89543 120.895 0 122 0H153C154.105 0 155 0.895431 155 2V8C155 9.10457 154.105 10 153 10H122C120.895 10 120 9.10457 120 8V2Z" fill="white" fill-opacity="0.05" />
                      <path d="M160 2C160 0.89543 160.895 0 162 0H193C194.105 0 195 0.895431 195 2V8C195 9.10457 194.105 10 193 10H162C160.895 10 160 9.10457 160 8V2Z" fill="white" fill-opacity="0.05" />
                    </svg>
                  </div>
                </div>



              </div>

            </div>
            <div className="inventory-grid-container" ref={containerRef}>
              <>
                {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
                  <InventorySlot
                    key={`${inventory.type}-${inventory.id}-${item.slot}`}
                    item={item}
                    ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                    inventoryType={inventory.type}
                    inventoryGroups={inventory.groups}
                    inventoryId={inventory.id}
                    hotbar={inventory.label === 'hotbar'}
                  />
                ))}
              </>
            </div>
          </div>



        )
      }


    </>
  );
};

export default InventoryGrid;
