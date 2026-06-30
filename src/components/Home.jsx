import React from 'react';
import Card from './Card';
import Signup from './Signup';
import { useState } from 'react';



const Home = () => {
    
  const [IsClicked, setIsClicked] = useState(false)
    return (
        <div className="w-full h-screen bg-cover bg-center overflow-hidden"
            // style={{ backgroundImage: "url('/download.jpg')" }}
            
            >
            {/* <Card/> */}
            {/* <Signup/> */}
            {IsClicked ? <Signup IsClicked={IsClicked} setIsClicked={setIsClicked} /> : <Card setIsClicked={setIsClicked} IsClicked={IsClicked} />}
        </div>
    );
}

export default Home;
