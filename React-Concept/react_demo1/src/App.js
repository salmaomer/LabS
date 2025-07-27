import logo from './logo.svg';
import './App.css';
/* Import And Use This Component. */
import Welcome from './Components/welcome';

/* This Is The Main App Component. It Serves As The Root Component For The React Application. */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* This Is Where Your Custom Welcome Component Is Rendered. */}
        <Welcome />
      </header>
    </div>
  );
}

export default App;
