import React, { createContext, useReducer} from 'react'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Registration'
import Logout from './pages/Logout'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import error from './pages/errorpage'
import {initialState, reducer} from '../src/reducer/useReducer';

export const UserContext = createContext();

const Routing = () =>
{
  return(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/pages/About" component={About}/>
        <Route exact path="/pages/Contact" component={Contact}/>
        <Route exact path="/pages/Login" component={Login}/>
        <Route exact path="/pages/Registration" component={Register}/>
        <Route exact path="/pages/Logout" component={Logout}/>
        <Route component={error}></Route>
      </Switch>

  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <div>
        <UserContext.Provider value={{state, dispatch}}>
          <Navbar/>
          <Routing />

        </UserContext.Provider>
    </div>
    </Router>
    
  )
}

export default App

