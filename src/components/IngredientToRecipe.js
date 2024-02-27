import React from 'react';

const UnderConstruction = () => {
  const constructionStyles = {
    display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  marginBottom: '5vh',
  };

  return (
    <div className='const'>
    <div style={constructionStyles}>
      <a href="/home" className="menu-button">Go back to Home</a>
      </div>
    </div>
  );
};

export default UnderConstruction;
