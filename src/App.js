/* References:
	https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-51.php
	https://www.npmjs.com/package/react-countdown
	https://www.npmjs.com/package/use-sound
*/

import './App.css';
import { useState } from 'react';
import Countdown from 'react-countdown';
import useSound from 'use-sound';

// sound link
import completeSfx from './sounds/complete.mp3';

//=== Components ===

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
	const [breakTime, setBreakTime] = useState(5);
	const [sessionTime, setSessionTime] = useState(25);
	const [inSession, setInSession] = useState(true);	
	
	// sound
	const [playComplete] = useSound(completeSfx);	
	
	//=== functions ===
	function minToMs(value) {
		return value * 60e3;	
	}
	
	function dateFunc() {
		return Date.now() + minToMs( inSession ? sessionTime : breakTime );
	}
	  		
	//=== Count down === 
	const renderer = ({ total, hours, minutes, seconds, api }) => {
		// 1. buttons
		const playFunc = () => { api.start() };
		const pauseFunc = () => { api.pause() };
		const resetFunc = () => { api.stop(); setInSession(true); };
  	   	
  	   	// 2. cycle states
  	   	if( api.isCompleted() ) {
  	   		api.stop();
  	   		api.start();
  	   		setInSession( !inSession );
  	   		playComplete();
  	   	}
  	   	  	   	
  	   	// 2. transition
  		var title = inSession ? "Session" : "Break";
  		var titleStyle = inSession ? "sessionStyle" : "breakStyle";
  		  	  	
 		// === JSX ===
		return ( 
			<div>
    			{/* display output */}
    			<div className="output">
 		    		<h2 id="title" className={titleStyle}>{title}</h2>
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
    			date={ dateFunc() }
    			renderer={renderer}
    			controlled={false}
    			autoStart={false}
  			/>
    	</div>
    </div>
  );
}

export default App;
