import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import './App.css';


const groups = withState('groups', 'setGroups', []);

const selectedGroup = withState('selectedGroup', 'setSelectedGroup', []);

const handlers = withHandlers({
  loadGroups: () => () => {
    //API call to get groups

  }
});

let App = ({ groups, selectedGroup, loadGroups }) => {
  if(groups.length === 0){
    loadGroups()
    return <LoadingScreen/>
  }
  return (
    <div>
      <Navbar groups={groups}/>
      <Dashboard selectedgroup={selectedGroup} />
    </div>
  )
}

App = compose(
  groups,
  selectedGroup,
  handlers,
  pure
)(App);

export default App;
