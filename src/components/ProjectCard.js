import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const pipelines = withState('pipelines', 'setPipelines', []);

const selectedPipeline = withState('selectedPipeline', 'setSelectedPipeline', []);

const handlers = withHandlers({
  loadPipelines: () => (projectId) => {
    //API call to get pipelines

  }
});

let ProjectCard = ({ project, pipelines, loadPipelines }) => {
  if(pipelines.length === 0){
    loadPipelines(project.id);
  }
  return(
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

ProjectCard = compose(
  handlers,
  pipelines,
  selectedPipeline,
  pure
)(ProjectCard)

export default ProjectCard;
