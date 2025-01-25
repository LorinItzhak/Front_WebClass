import React from 'react';
import Logopic from '../assets/logo.png';



const Logo = () => {
    return (
        <div>
            <img src={Logopic} alt="Website Logo" style={{ width: '150px', height: '50px' }} />
        </div>
    );
};

export default Logo;