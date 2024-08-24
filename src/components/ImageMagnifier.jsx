import React, { useState } from 'react';

const ImageMagnifier = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseHover = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });

    setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      className='w-full img-magnifier-container'
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
      style={{ position: 'relative' }}
    >
      <img src={imageUrl} alt="" className='magnifier-img' />

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            left: `${cursorPosition.x - 100}px`,
            top: `${cursorPosition.y - 100}px`,
            width: '200px', // size of the magnifier
            height: '200px', // size of the magnifier
            pointerEvents: 'none',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // light background to see the border
          }}
        >
          <div
            className='magnifier-image'
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              borderRadius: '50%',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;