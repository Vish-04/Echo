import React, { useState } from 'react';
import Theatre from './theatre';
function Navigation() {
  // State to hold the current index
  const [index, setIndex] = useState(0);

  // Function to render content based on the current index
  const renderContent = () => {
    switch(index) {
      case 0:
        return <Theatre />;
     
    }
  };

  return (
    <div>
      <div>
        {renderContent()}
      </div>
      <div>
        <button onClick={() => setIndex(0)}>Theatre</button>
       
      </div>
    </div>
  );
}

export default Navigation;
