// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

/**
 * A function component for inlining SVG code for animation logo loader
 */
function LoadingAnimation() {
  return (
    <svg
      width='104'
      height='104'
      viewBox='0 0 104 104'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        
        <mask id='LoadingAnimation__spinner-left-half-mask'>
          <rect
            x='0'
            y='0'
            width='52'
            height='104'
            fill='white'
          />
          <circle
            className='LoadingAnimation__spinner-mask'
            r='20'
            cx='52'
            cy='52'
            fill='black'
          />
        </mask>
        <mask id='LoadingAnimation__spinner-right-half-mask'>
          <rect
            x='52'
            y='0'
            width='52'
            height='104'
            fill='white'
          />
          <circle
            className='LoadingAnimation__spinner-mask'
            r='20'
            cx='52'
            cy='52'
            fill='black'
          />
        </mask>
        <mask id='LoadingAnimation__spinner-wipe-mask'>
          <rect
            x='0'
            y='0'
            width='104'
            height='104'
            fill='white'
          />
          <g className='LoadingAnimation__spinner-mask-container'>
            <circle
              className='LoadingAnimation__spinner-mask'
              r='27'
              cx='52'
              cy='52'
              fill='black'
              stroke='white'
              strokeWidth='54'
            />
          </g>
        </mask>
      </defs>
      <g
        className='LoadingAnimation__spinner-container'
        mask='url(#LoadingAnimation__spinner-wipe-mask)'
      >
        <g className='LoadingAnimation__spinner'>
          <circle
            r='25'
            cx='52'
            cy='52'
            fill='currentColor'
            mask='url(#LoadingAnimation__spinner-left-half-mask)'
          />
          <circle
            r='25'
            cx='52'
            cy='52'
            fill='url(#LoadingAnimation__spinner-gradient)'
            mask='url(#LoadingAnimation__spinner-right-half-mask)'
          />
        </g>
      </g>
      <g className='LoadingAnimation__compass'>
        <g
          className='LoadingAnimation__compass-base-container'
          mask='url(#LoadingAnimation__base-wipe-mask)'
        >
          <circle
            className='LoadingAnimation__compass-base'
            r='52'
            cx='52'
            cy='52'
            fill='currentColor'
            mask='url(#LoadingAnimation__base-mask)'
          />
        </g>
        <g className='LoadingAnimation__compass-needle-container'>
          <g className='LoadingAnimation__compass-needle'>
            <g transform='translate(54,46)'>
              <g transform='translate(-15,-42)'>
                <path
                  d='M29.9539 1.4977C29.9539 0.670968 29.2827 0 28.4562 0C27.9597 0 27.5192 0.242028 27.2468 0.614415C27.216 0.656555 27.1873 0.700359 27.1609 0.745666L3.66519 32.1191C1.38202 34.7479 0 38.1803 0 41.9355C0 50.207 6.70541 56.9124 14.977 56.9124C23.2485 56.9124 29.9539 50.207 29.9539 41.9355L29.9539 41.9013V1.50252C29.9539 1.50091 29.9539 1.49931 29.9539 1.4977Z'
                  fill='currentColor'
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default LoadingAnimation;
