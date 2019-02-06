import React from 'react';
import ProjectCard from './ProjectCard';
import Grid from '@material-ui/core/Grid';
import { withState, withHandlers, compose, pure } from 'recompose';
import axios from 'axios';

const projects = withState('projects', 'setProjects', {
  projectList: null,
  groupId: null
});

const handlers = withHandlers({
  loadProjects: ({ setProjects }) => async (groupId) => {
    //API call to get projects
    let { data } = await axios.get(`/groups/${groupId}/projects`);
    setProjects({
      projectList: data,
      groupId
    });
  }
});

let Dashboard = ({ selectedGroup, projects, loadProjects }) => {
  if(projects.groupId !== selectedGroup.id){
    loadProjects(selectedGroup.id)
  }
  const proj = projects.projectList;
  return (
    <div style={{ padding: "24px"}}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h1>{selectedGroup.full_name}</h1>
        </Grid>
        {(proj && proj.length) ?
          <Grid item xs={12} sm={12} md={6} lg={4}>
            {proj.map(p => <ProjectCard key={p.id} project={p}/>)}
          </Grid>
        : <p>No projects</p>}
      </Grid>
    </div>
  )
}

Dashboard = compose(
  projects,
  handlers,
  pure
)(Dashboard)

export default Dashboard;
