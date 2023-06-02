/* References:
	https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-51.php
	https://www.npmjs.com/package/react-countdown
*/

import './App.css';
import { useState } from 'react';
import Countdown from 'react-countdown';

// Count down 
const renderer = ({ hours, minutes, seconds, completed, api }) => {
	// === Functions ===
	// buttons
	const playFunc = () => { api.start() };
	const pauseFunc = () => { api.pause() };
	const resetFunc = () => { api.stop() };
  
 	// === JSX ===
	return ( 
	<div>
    	{/* display output */}
    	<div className="output">
    		<h2>Session</h2>
    		<h1>{hours}:{minutes}:{seconds}</h1>
    	</div>
    	
    	{/* control buttons */}
    	<div className="outputButtons">
    		<button id="play" onClick={playFunc}> &#9658; </button> 
    		<button id="pause" onClick={pauseFunc}> &#9724; </button> 
    		<button id="reset" onClick={resetFunc}> &#8635; </button> 
    	</div>
	</div>
	);
};

// Timer adjustment
const Timer = (props) => {
	//=== functions ===
	const incTime = () => {
		props.func(props.state + 1); 	
	};
	
	const decTime = () => {
		var state = props.state;
		if( state > 0 ) {
			props.func(state - 1);
		}
	};
	
	//=== JSX ===
	return (
    	<div className="timer">
    		<h2>{props.title}</h2>
    		<span>{props.state}</span>
    		
    		<div className="timerButtons">
    			<button onClick={ incTime }> &#9650; </button>
    			<button onClick={ decTime }> &#9660; </button>
    		</div>
    	</div>
	);
}; 

function App() {	
	//=== state ===
	const [breakTime, setBreakTime] = useState(5);
	const [sessionTime, setSessionTime] = useState(25);
	
	//=== functions ===
	function minToMs(value) {
		return value * 60e3;	
	}
	
	//=== JSX === 
	return (
    <div className="App">
    	<h1 className="title">25 + 5 Clock</h1>
    	<div className="mainBox">
    		{/* Input buttons */}
    		<div className="input">
				<Timer func={setBreakTime} state={breakTime} title={"Break Length"} />
				<Timer func={setSessionTime} state={sessionTime} title={"Session Length"} />
    		</div>
    		
    		{/* Timer */}
    		<Countdown
    			date={ Date.now() + minToMs(sessionTime) }
    			intervalDelay={0}
    			precision={3}
    			renderer={renderer}
    			controlled={false}
    			autoStart={false}
  			/>
    	</div>
    </div>
  );
}

export default App;
