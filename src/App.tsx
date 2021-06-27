import { Button } from "./components/Button";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../src/styles/global.scss'
import { NewRoom } from "./pages/NewRoom";
import { AdminRoom} from './pages/AdminRoom';
import { createContext, useState, useEffect } from 'react';
import firebase from "firebase";
import { auth } from "./services/firebase";
import { AuthContextProvider } from './context/AuthContextProvider'
import { Rooms } from "./pages/Rooms";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/room/new' exact component={NewRoom} />
        <Route path='/room/:id' component={Rooms}/>
        <Route path='/admin/room/:id' component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;