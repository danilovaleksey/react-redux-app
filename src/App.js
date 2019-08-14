import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';

import UsersListContainer from "./components/UsersList/UsersListContainer";
import NewUser from './components/NewUser/NewUser';

function App() {
  return (
        <div className='users'>
            <Route exact path='/'
                   render={ () => <UsersListContainer /> }/>
            <Route path='/page/:page'
                   render={ () => <UsersListContainer /> }/>
            <Route path='/users/new'
                   render={ () => <NewUser />}
            />
        </div>
  );
}

export default App;