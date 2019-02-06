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

const pipelines = withState('pipelines', 'setPipelines', null);


const handlers = withHandlers({
  loadPipelines: ({ setPipelines }) => async (groupId, projectId) => {
    //API call to get pipelines
    let { data } = await axios.get(`/groups/${groupId}/projects/${projectId}/pipelines`);
    setPipelines(data);
  }
});

let ProjectCard = ({ project, pipelines, loadPipelines }) => {
  if(!pipelines && project){
    loadPipelines(project.id);
  }
  return(
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {project.branch}
        </Typography>
        <Typography variant="h5" component="h2">
          be
          nev
          lent
        </Typography>
        <Typography color="textSecondary">
          adjective
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" aria-label="Retry">
          <PhotoCamera />
        </IconButton>
        <IconButton size="small" aria-label="Cancel">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

ProjectCard = compose(
  handlers,
  pipelines,
  pure
)(ProjectCard)

export default ProjectCard;
