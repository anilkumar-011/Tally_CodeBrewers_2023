import React from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate=useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to Tally Typo Practice!</h1>
            <p className="text-lg text-center mb-8">
                Tally Typo Practice is a website where friends compete to stand out in typing speed and accuracy.
            </p>
            <button className="w-full max-w-md border rounded-lg p-4 mb-4 bg-blue-800"  onClick={()=>{navigate('/pratice')}}>
                <h2 className="text-xl font-bold mb-2">Practice Mode</h2>
                <p className="text-sm">
                    In practice mode, users can select the time and level of difficulty and start practicing their typing speed.
                    At the end of the session, they can see their accuracy and words per minute (WPM) metrics.
                </p>
            </button>
            <button
             className="w-full max-w-md border rounded-lg p-4 bg-purple-800 shadow-2xl" onClick={()=>{navigate('/compete')}}>
                <h2 className="text-xl font-bold mb-2">Compete Mode</h2>
                <p className="text-sm">
                    In compete mode, users can create a room ID and share it with their friends to connect from their end.
                    They can then compete against each other and determine the winner based on accuracy and WPM factors of each individual user.
                </p>
            </button>
        </div>
    );
}

export default Home;