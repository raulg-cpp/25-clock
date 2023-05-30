import './App.css';

function App() {
  return (
    <div className="App">
    	<h1 className="title">25 + 5 Clock</h1>
    	<div className="mainBox">
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
    			<h1>timer</h1>
    		</div>
    		
    		<div className="outputButtons">
    			<button>&#9658;</button> 
    			<button>&#9724;</button> 
    			<button>&#8635; </button> 
    		</div>
    	</div>
    </div>
  );
}

export default App;
