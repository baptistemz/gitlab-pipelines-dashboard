import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import './App.css';
import axios from 'axios';
import config from './config.json';

axios.defaults.baseURL = 'https://gitlab.com/api/v4';
axios.defaults.headers.common['PRIVATE-TOKEN'] = config.token;

const groups = withState('groups', 'setGroups', {groupList: [], selectedGroup:null });

const handlers = withHandlers({
  loadGroups: ({ setGroups }) => async () => {
    //API call to get groups
    let { data } = await axios.get('/groups');
    setGroups({
      groupList: data,
      selectedGroup: data.length && data[0]
    });
  }
});

let App = ({ groups, loadGroups, setGroups }) => {
  if(groups.groupList.length === 0){
    loadGroups()
    return <LoadingScreen/>
  }
  return (
    <div>
      <Navbar
        onGroupSelect={(selectedGroup) => setGroups({ ...groups, selectedGroup })}
        selectedGroup={groups.selectedGroup}
        groups={groups.groupList}/>
      <Dashboard selectedGroup={groups.selectedGroup} />
    </div>
  )
}

App = compose(
  groups,
  handlers,
  pure
)(App);

export default App;
