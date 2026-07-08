import React from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import { useState } from 'react';



const Home = () => {
    
  const [IsClicked, setIsClicked] = useState(false)
    return (
        <div className="w-full h-screen bg-cover bg-center overflow-hidden">
            {IsClicked ? <Signup IsClicked={IsClicked} setIsClicked={setIsClicked} /> : <SignIn setIsClicked={setIsClicked} IsClicked={IsClicked} />}
        </div>
    );
}

export default Home;
