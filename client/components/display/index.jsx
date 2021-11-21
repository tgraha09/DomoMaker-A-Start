import React from 'react';
import PropTypes from 'prop-types';
import './display.css';

export const Display = ({ backgroundColor, ...props }) => {
    
    
    return (<main 
    className="main"
    style={backgroundColor && {backgroundColor}}
    {...props}>
    <section className="main-inner">
    {props.children}
    </section>
    </main>)
}



Display.propTypes = {
    backgroundColor: PropTypes.string,
    content: PropTypes.string.isRequired,
};

Display.defaultProps = {
    backgroundColor: "rgb(25, 25, 51)",
    content:"Display"
};
