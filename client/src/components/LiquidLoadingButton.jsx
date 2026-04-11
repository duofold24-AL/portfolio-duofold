import React, { useState } from 'react';

export default function LiquidLoadingButton({ 
  text = 'Submit', 
  loadingText = 'Sending...', 
  onClick,
  className = ''
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (isLoading) return;
    setIsLoading(true);
    if (onClick) {
      await onClick(e);
    } else {
      // Demo timeout if no onClick provided
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    setIsLoading(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes loading-jump-scare {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.05) rotate(1deg); }
            100% { transform: scale(1) rotate(0deg); }
          }

          @keyframes loading-drop {
            0% { bottom: 0px; opacity: 1; transform: scale(1); }
            80% { opacity: 1; }
            100% { bottom: -80px; opacity: 0; transform: scale(0.4); }
          }

          .loading-btn-wrapper {
            position: relative;
            display: inline-flex;
            justify-content: center;
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            outline: none;
          }

          .loading-btn-label {
            position: relative;
            z-index: 10;
            background: #000;
            background-image: radial-gradient(circle 100px at 50% 100%, #333, #000);
            color: #fff;
            font-size: 14px;
            font-weight: 700;
            padding: 14px 32px;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap;
          }

          .loading-btn-wrapper:hover .loading-btn-label {
            text-shadow: 0 0 10px #fff;
            box-shadow: 0 15px 30px rgba(0,0,0,0.5);
            border-color: rgba(255,255,255,0.25);
            transform: translateY(-2px);
          }

          .loading-btn-wrapper:active .loading-btn-label {
            transform: translateY(1px);
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
          }

          .loading-drops-container {
            filter: url("#liquid-loading-goo");
            position: absolute;
            top: 60%;
            left: 0;
            right: 0;
            height: 60px;
            pointer-events: none;
            z-index: 5;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .loading-btn-wrapper.is-loading .loading-drops-container {
            opacity: 1;
          }

          .loading-drop {
            background: #000;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 50%;
          }

          .loading-drop-base {
            width: 90%;
            height: 15px;
            bottom: 35px;
            border-radius: 4px;
          }

          .loading-drop-animate {
            width: 14px;
            height: 18px;
            animation: loading-drop 1s cubic-bezier(1, 0.19, 0.66, 0.12) infinite;
          }

          .loading-drop-2 { animation-delay: 0.3s; width: 10px; }
          .loading-drop-3 { animation-delay: 0.6s; width: 12px; }

          .is-loading .loading-btn-label {
            cursor: wait;
            background-image: radial-gradient(circle 120px at 50% 100%, #444, #111);
          }
        `}
      </style>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="liquid-loading-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
          </filter>
        </defs>
      </svg>

      <button 
        className={`loading-btn-wrapper ${isLoading ? 'is-loading' : ''} ${className}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        <div className="loading-btn-label">
          {isLoading ? loadingText : text}
        </div>
        <div className="loading-drops-container">
          <div className="loading-drop loading-drop-base"></div>
          <div className="loading-drop loading-drop-animate loading-drop-1"></div>
          <div className="loading-drop loading-drop-animate loading-drop-2"></div>
          <div className="loading-drop loading-drop-animate loading-drop-3"></div>
        </div>
      </button>
    </>
  );
}
