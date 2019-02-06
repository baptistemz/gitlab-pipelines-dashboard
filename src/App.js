import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://gitlab.com/api/v4';
axios.defaults.headers.common['PRIVATE-TOKEN'] = '5MmDnNLv3SZhm6nQRqAG';

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

let App = ({ groups, loadGroups }) => {
  if(groups.groupList.length === 0){
    loadGroups()
    return <LoadingScreen/>
  }
  return (
    <div>
      <Navbar groups={groups.groupList}/>
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
