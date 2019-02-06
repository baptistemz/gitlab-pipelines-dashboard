import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';

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
let ProjectCard = ({ project, pipelines, loadPipelines }) => {
  if(pipelines.projectId !== project.id){
    loadPipelines(project.id);
  }
  return(
    <Card>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {project.name_with_namespace}
          <Icon className={"fa fa-" + STATUS_ICONS[project.import_status]}
            aria-label={project.import_status} />
        </Typography>
      </CardContent>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {project.name_with_namespace}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" aria-label="Retry">
          <Icon className="fa fa-redo"/>
        </IconButton>
        <IconButton size="small" aria-label="Cancel">
          <Icon className="fa fa-trash"/>
        </IconButton>
        <IconButton size="small" aria-label="Gitlab">
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
