import React from 'react';
import ProjectCard from './ProjectCard';
import Grid from '@material-ui/core/Grid';
import { withState, withHandlers, compose, pure } from 'recompose';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "20px",
  }
});

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

let Dashboard = ({ selectedGroup, projects, loadProjects, classes }) => {
  if(projects.groupId !== selectedGroup.id){
    loadProjects(selectedGroup.id)
  }
  const proj = projects.projectList;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h1>{selectedGroup.full_name}</h1>
        </Grid>
        {(proj && proj.length) ?
            proj.map(p => {
              return(
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ProjectCard key={p.id} project={p}/>
                </Grid>
              )
            })
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

export default withStyles(styles)(Dashboard);
