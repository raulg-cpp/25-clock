/* References:
	https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-51.php
*/

import './App.css';
import { useState } from 'react';

function App() {
	//=== State ===
	const [totalTime, setTotalTime] = useState( 25 * 60e3 );
	const [initTime, setInitTime] = useState( 25 * 60e3 );

	//=== Functions ===
	function timeConvert(num) { 
		num = num / 1000;
  		var hours = Math.floor(num / 60);  
  		var minutes = Math.floor(num % 60);
  		return hours + ":" + minutes;         
	}
		
	const updateTimer = () => {
		var change_time = initTime - performance.now();
		document.getElementById("currTime").innerHTML = timeConvert(change_time); 
	}
		
	//updateTimer();
	const funcPlay = () => {
		setInitTime( totalTime + performance.now() );
		setInterval( updateTimer, 1000 );
	}

	//=== JSX === 
  return (
    <div className="App">
    	<h1 className="title">25 + 5 Clock</h1>
    	<div className="mainBox">
    		{/* Input buttons */}
    		<div className="input">
    			<div className="timer">
    				<h2>Break length</h2>
    				<span>timer</span>
    				<div className="timerButtons">
    					<button>&#9650;</button>
    					<button>&#9660;</button>
    				</div>
    			</div>
    			<div className="timer">
    				<h2>Session length</h2>
    				<span>timer</span>
    				<div className="timerButtons">
    					<button>&#9650;</button>
    					<button>&#9660;</button>    					
    				</div>	
    			</div>
    		</div>
    		<div className="output">
    			<h2>Session</h2>
    			<h1 id="currTime">25:0</h1>
    		</div>
    		{/* Output display */}
    		<div className="outputButtons">
    			<button id="play" onClick={funcPlay}> &#9658; </button> 
    			<button id="pause"> &#9724; </button> 
    			<button id="reset"> &#8635; </button> 
    		</div>
    	</div>
    </div>
  );
}

export default App;
