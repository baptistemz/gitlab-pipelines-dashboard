import React from 'react';
import ProjectCard from './ProjectCard';
import Grid from '@material-ui/core/Grid';
import { withState, withHandlers, compose, pure } from 'recompose';

const projects = withState('projects', 'setProjects', []);

const selectedProject = withState('selectedProject', 'setSelectedProject', []);

const handlers = withHandlers({
  loadProjects: () => (groupId) => {
    //API call to get projects

  }
});

let Dashboard = ({ selectedGroup, projects, loadProjects, selectedProject }) => {
  if(projects.length === 0){
    loadProjects(selectedGroup.id)
  }
  return (
    <div style={{ padding: "24px"}}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h1>{selectedGroup.name}</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <ProjectCard project={selectedProject}/>
        </Grid>
      </Grid>
    </div>
  )
}

Dashboard = compose(
  projects,
  selectedProject,
  handlers,
  pure
)(Dashboard)

export default Dashboard;
