import React from 'react';
import './App.scss';
import {Route} from "react-router-dom";

// Containers
import UsersListContainer from "./components/UsersList/UsersListContainer";


function App() {
  return (
    <>
        <div className='users'>
            <Route exact path='/'
                   render={ () => <UsersListContainer /> }/>
        </div>
    </>
  );
}

export default App;