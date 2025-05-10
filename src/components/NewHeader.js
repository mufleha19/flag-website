import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { Link as ScrollLink } from 'react-scroll';

const NewHeader = () => {
  return (
    <header id="home">
      <div className="title">
        <div><FontAwesomeIcon icon={faFlag} className="icon heading" /></div>
        <div className="smallsep heading"></div>
        <h1 className="heading">Flag Explorer</h1>
        <h2 className="heading">Discover Countries of the World</h2>
        <ScrollLink 
          to="about" 
          smooth={true} 
          duration={800} 
          className="smoothscroll"
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </ScrollLink>
      </div>
      <ScrollLink 
        to="about" 
        smooth={true} 
        duration={800} 
        className="smoothscroll"
      >
        <div className="scroll-down"></div>
      </ScrollLink>
    </header>
  );
};

export default NewHeader;