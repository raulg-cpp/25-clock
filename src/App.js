/* References:
	https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-51.php
	https://www.npmjs.com/package/react-countdown
*/

import './App.css';
import { useState } from 'react';
import Countdown from 'react-countdown';

// Timer adjustment
const Timer = (props) => {
	//=== functions ===
	const incTime = () => {
		props.func(props.state + 1); 	
	};
	
	const decTime = () => {
		var state = props.state;
		if( state > 1 ) {
			props.func(state - 1);
		}
	};
	
	//=== JSX ===
	return (
    	<div className="timer">
    		<h2>{props.title}</h2>
    		<span>{props.state}</span>
    		
    		<div className="timerButtons">
    			<button onClick={incTime}> &#9650; </button>
    			<button onClick={decTime}> &#9660; </button>
    		</div>
    	</div>
	);
}; 

function App() {	
	//=== state ===
	const [breakTime, setBreakTime] = useState(1);
	const [sessionTime, setSessionTime] = useState(1);
	
	//=== functions ===
	function minToMs(value) {
		return value * 60e3;	
	}
	
	// Count down 
	const renderer = ({ total, hours, minutes, seconds, completed, api }) => {
		// === Functions ===
		// 1. buttons
		const playFunc = () => { api.start() };
		const pauseFunc = () => { api.pause() };
		const resetFunc = () => { api.stop() };
  	   	
  	   	// 2. transition
  		var title = "Session";
  		var titleStyle = "";
  			
  		if( total > minToMs(breakTime) ) {
  			minutes -= breakTime;
  		} else {
  			title = "Break";
  			titleStyle = "breakStyle";
  		}
  		
  		// 3. finished round
  		if( completed ) {
  			// indicate
			title = "Pomodoro!";
			titleStyle = "completeStyle";
			
			// reset timer
			const funcComplete = () => {
				api.stop();
			};
			setTimeout(funcComplete, 5000);	// Wait 5 seconds
		}
  	
 		// === JSX ===
		return ( 
			<div>
    			{/* display output */}
    			<div className="output">
 		    		<h2 className={titleStyle}>{title}</h2>
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
	
	//=== JSX === 
	return (
    <div className="App">
    	<h1 className="title">25 + 5 Clock</h1>
    	<div className="mainBox">
    		{/* Input buttons */}
    		<div className="input">
				<Timer func={setBreakTime} state={breakTime} title={"Break minute"} />
				<Timer func={setSessionTime} state={sessionTime} title={"Session minute"} />
    		</div>
    		
    		{/* Timer */}
    		<Countdown
    			date={ Date.now() + minToMs(sessionTime + breakTime) }
    			renderer={renderer}
    			controlled={false}
    			autoStart={false}
  			/>
    	</div>
    </div>
  );
}

export default App;
