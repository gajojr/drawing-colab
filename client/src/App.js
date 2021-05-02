import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import DrawingPage from './pages/DrawingPage/DrawingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/drawing-page" component={DrawingPage} />
      </Switch>
    </Router>
  );
}

export default App;
