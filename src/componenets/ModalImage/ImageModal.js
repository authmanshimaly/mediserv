// src/components/ImageDisplay.js
import React from 'react';

const ImageDisplay = ({ imageSrc, onClose }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'white',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                }}
            >
                Close
            </button>
            <img src={imageSrc} alt="Display" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </div>
    );
};

export default ImageDisplay;
