import React from 'react';
import { withHandlers, compose, pure } from 'recompose';
import { ListItem, ListItemText, ListItemIcon, Icon, IconButton } from '@material-ui/core';
import _ from 'lodash';

const handlers = withHandlers({
  retryPipeline: ({ project }) => (pipelineId) => async () => {
    console.log("retrying");
    //await axios.post(`/projects/${project.id}/pipelines/${pipelineId}/retry`);
  },
  cancelPipeline: ({ project }) => (pipelineId) => async () => {
    console.log("cancel");
    //await axios.post(`/projects/${project.id}/pipelines/${pipelineId}/cancel`);
  }
});

const canRetry = (pipeline) => _.find(['finished', 'failed'], pipeline.status) !== null

const canCancel = (pipeline) => _.find(['pending', 'running'], pipeline.status) !== null

let PipeLineListItem = ({ pipelineCalls, retryPipeline, cancelPipeline }) => {
  console.log("pipelineCalls[0]", pipelineCalls[0])
  return(
    <ListItem button>
      <ListItemText primary={`ref: ${pipelineCalls[0].ref}`} />
      <ListItemText secondary={pipelineCalls[0].sha.substring(0,7)} />
      <ListItemIcon>
        <Icon className="fa fa-exclamation-circle"/>
        <IconButton size="small" disabled={canRetry(pipelineCalls[0])} aria-label="Retry" onClick={retryPipeline(pipelineCalls[0].id)}>
          <Icon className="fa fa-redo"/>
        </IconButton>
        <IconButton size="small" disabled={canCancel(pipelineCalls[0])} aria-label="Cancel" onClick={cancelPipeline(pipelineCalls[0].id)}>
          <Icon className="fa fa-ban"/>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  )
}

PipeLineListItem = compose(
  handlers,
  pure
)(PipeLineListItem)

export default PipeLineListItem
