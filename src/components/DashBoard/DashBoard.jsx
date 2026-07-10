import React, { useState, useRef } from 'react';
import Menu from './Menu';


const DashBoard = () => {
    
    return (
        <>
            <div className='flex flex-row w-full min-h-screen'>
                <div className='w-50 border'>
                    <Menu/>
                </div>
                <div className='flex-1 h-screen '>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
