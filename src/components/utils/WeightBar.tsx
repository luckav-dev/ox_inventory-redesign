import React, { useMemo } from 'react';

const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
  let channelA = colorChannelA * amountToMix;
  let channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};

const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return `rgb(${r}, ${g}, ${b})`;
};

const COLORS = {
  // Colors used - https://materialui.co/flatuicolors
  primaryColor: [218, 0, 0], // Red (Pomegranate)
  secondColor: [116, 0, 0], // Green (Nephritis)
  accentColor: [116, 0, 0], // Orange (Oragne)
};

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  const color = useMemo(
    () =>
      durability
        ? percent < 50
          ? colorMixer(COLORS.accentColor, COLORS.primaryColor, percent / 100)
          : colorMixer(COLORS.secondColor, COLORS.accentColor, percent / 100)
        : percent > 50
        ? colorMixer(COLORS.primaryColor, COLORS.accentColor, percent / 100)
        : colorMixer(COLORS.accentColor, COLORS.secondColor, percent / 50),
    [durability, percent]
  );

  return (
    <div className={durability ? 'durability-bar' : 'weight-bar'} >
      <div className='custom-weight-bar2'>
                <div className='bar-dura' style={{
                visibility: percent > 0 ? 'visible' : 'hidden',
                width: `${percent}%`,
                }}>
                  <svg style={{
                    position:'absolute',
                    top: '0',
                    left: '0',
                    zIndex: 110,
                  }} width="4.5833vw" height="0.2778vh" viewBox="0 0 88 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.5C0 0.671573 0.671573 0 1.5 0H14.5C15.3284 0 16 0.671573 16 1.5C16 2.32843 15.3284 3 14.5 3H1.5C0.671573 3 0 2.32843 0 1.5Z" fill="white" fill-opacity="1"/>
                  <path d="M18 1.5C18 0.671573 18.6716 0 19.5 0H32.5C33.3284 0 34 0.671573 34 1.5C34 2.32843 33.3284 3 32.5 3H19.5C18.6716 3 18 2.32843 18 1.5Z" fill="white" fill-opacity="1"/>
                  <path d="M36 1.5C36 0.671573 36.6716 0 37.5 0H50.5C51.3284 0 52 0.671573 52 1.5C52 2.32843 51.3284 3 50.5 3H37.5C36.6716 3 36 2.32843 36 1.5Z" fill="white" fill-opacity="1"/>
                  <path d="M54 1.5C54 0.671573 54.6716 0 55.5 0H68.5C69.3284 0 70 0.671573 70 1.5C70 2.32843 69.3284 3 68.5 3H55.5C54.6716 3 54 2.32843 54 1.5Z" fill="white" fill-opacity="1"/>
                  <path d="M72 1.5C72 0.671573 72.6716 0 73.5 0H86.5C87.3284 0 88 0.671573 88 1.5C88 2.32843 87.3284 3 86.5 3H73.5C72.6716 3 72 2.32843 72 1.5Z" fill="white" fill-opacity="1"/>
                </svg>                 
                </div>
                  <svg style={{
                   position:'absolute',
                   top: '0',
                   left: '0',
                  }} width="4.5833vw" height="0.2778vh" viewBox="0 0 88 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.5C0 0.671573 0.671573 0 1.5 0H14.5C15.3284 0 16 0.671573 16 1.5C16 2.32843 15.3284 3 14.5 3H1.5C0.671573 3 0 2.32843 0 1.5Z" fill="white" fill-opacity="0.15"/>
                  <path d="M18 1.5C18 0.671573 18.6716 0 19.5 0H32.5C33.3284 0 34 0.671573 34 1.5C34 2.32843 33.3284 3 32.5 3H19.5C18.6716 3 18 2.32843 18 1.5Z" fill="white" fill-opacity="0.15"/>
                  <path d="M36 1.5C36 0.671573 36.6716 0 37.5 0H50.5C51.3284 0 52 0.671573 52 1.5C52 2.32843 51.3284 3 50.5 3H37.5C36.6716 3 36 2.32843 36 1.5Z" fill="white" fill-opacity="0.15"/>
                  <path d="M54 1.5C54 0.671573 54.6716 0 55.5 0H68.5C69.3284 0 70 0.671573 70 1.5C70 2.32843 69.3284 3 68.5 3H55.5C54.6716 3 54 2.32843 54 1.5Z" fill="white" fill-opacity="0.15"/>
                  <path d="M72 1.5C72 0.671573 72.6716 0 73.5 0H86.5C87.3284 0 88 0.671573 88 1.5C88 2.32843 87.3284 3 86.5 3H73.5C72.6716 3 72 2.32843 72 1.5Z" fill="white" fill-opacity="0.15"/>
                </svg>
              </div>

        

      {/* <div
        style={{
          visibility: percent > 0 ? 'visible' : 'hidden',
          height: '8px',
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #6FFFB1  0%, #6FFFB1  100%)',
          boxShadow: '0px 0px 16px 0px #6FFFB1',
          transition: `background ${0.3}s ease, width ${0.3}s ease`,
        }}
      ></div> */}
    </div>
  );
};
export default WeightBar;
