import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import PipeLineList from './PipeLineList';
import { CardContent, CardActions, Card, Button, Icon, List, IconButton, Typography } from '@material-ui/core';
import axios from 'axios';

const pipelines = withState('pipelines', 'setPipelines', {
  pipelineList: null,
  projectId: null
});

const handlers = withHandlers({
  loadPipelines: ({ setPipelines }) => async (projectId) => {
    //API call to get pipelines
    let { data } = await axios.get(`/projects/${projectId}/pipelines`);
    setPipelines({
      pipelineList: data,
      projectId
    });
  }
});

const STATUS_ICONS = {
  "failed": "times",
  "finished": "check",
}; 
let ProjectCard = ({ project, pipelines, loadPipelines, retryPipeline, cancelPipeline }) => {
  if(pipelines.projectId !== project.id){
    loadPipelines(project.id);
  }
  return(
    <Card>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {project.name}
          <Icon className={"fa fa-" + STATUS_ICONS[project.import_status]}
            aria-label={project.import_status} />
        </Typography>
        <List component="nav">
          {pipelines.pipelineList && <PipeLineList list={pipelines.pipelineList}/>}
        </List>
      </CardContent>
      <CardActions>
        <IconButton size="small" href={project.web_url} aria-label="Gitlab">
          <Icon className="fab fa-gitlab"/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

ProjectCard = compose(
  pipelines,
  handlers,
  pure
)(ProjectCard)

export default ProjectCard;
