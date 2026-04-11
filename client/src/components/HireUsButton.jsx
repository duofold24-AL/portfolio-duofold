import React from 'react';

export default function HireUsButton({ onClick }) {
  return (
    <>
      <style>
        {`


          .hire-btn-wrapper {
            position: relative;
            display: inline-flex;
            justify-content: center;
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            outline: none;
            text-decoration: none !important;
            margin-left: 1rem;
          }

          .hire-btn-label {
            position: relative;
            z-index: 10;
            background: #0d0d12;
            color: #fff;
            font-size: 13px;
            font-weight: 700;
            padding: 8px 18px;
            border-radius: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
          }
          @keyframes hire-jump-scare {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(2deg); }
            100% { transform: scale(1) rotate(0deg); }
          }

          .hire-btn-wrapper:hover .hire-btn-label {
            text-shadow: 0 0 8px #fff;
            animation: hire-jump-scare 0.3s ease-in-out;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            border-color: rgba(255,255,255,0.3);
          }
          .hire-btn-wrapper:active .hire-btn-label {
            transform: translateY(1px);
            background: #111;
          }


        `}
      </style>

      {/* Shared SVG Filter (Invisibly appended to DOM) */}


      <a href="#contact" className="hire-btn-wrapper" onClick={onClick}>
        <div className="hire-btn-label">Hire Us</div>
      </a>
    </>
  );
}
