import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import HomePage from './pages/HomePage/HomePage';
import DrawingPage from './pages/DrawingPage/DrawingPage';

const socket = io('http://localhost:8080');

function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <HomePage socket={socket} />
        </Route>
        <Route>
          <DrawingPage socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
