import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } 
from 'react-router-dom';
import SignUp from './components/pages/SignUpPage/SignUp';
import LogIn from './components/pages/LoginPage/LogIn';
import Home from './components/pages/HomePage/Home';
import Chat from './components/pages/ChatPage/Chat';
import { auth } from './services/firebase';
import {useEffect, useState} from 'react';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/LogIn', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/Chat' />}
    />
  )
}



function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if(user) {
        setAuthenticated(true);
        setLoading(false);
      }
      else {
        setAuthenticated(false);
        setLoading(true);
      }
    })
  }, []);

  
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <PublicRoute authenticated={authenticated} path='/LogIn' component={LogIn} />
        <PublicRoute authenticated={authenticated} path='/SignUp' component={SignUp} />
        <PrivateRoute authenticated={authenticated} path='/Chat' component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
