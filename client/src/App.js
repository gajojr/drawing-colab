import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import DrawingPage from './pages/DrawingPage/DrawingPage';

import { socket, SocketContext } from './context/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/drawing-page'>
            <DrawingPage />
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
