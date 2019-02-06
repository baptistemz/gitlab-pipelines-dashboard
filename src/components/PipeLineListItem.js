import React from 'react';
import { withHandlers, withState, compose, pure } from 'recompose';
import { ListItem, ListItemText, ListItemIcon, Icon, IconButton, Snackbar } from '@material-ui/core';
import _ from 'lodash';
import axios from 'axios';

const snack = withState('snack', 'setSnack', {
  open: false,
  message: '',
  duration: 6000
});

const handlers = withHandlers({
  retryPipeline: ({ project, setSnack }) => (pipelineId) => async () => {
    const { status } = await axios.post(`/projects/${project.id}/pipelines/${pipelineId}/retry`);
    setSnack({
      open: true,
      className: "success-background",
      message: status === 200 ? "Pipeline retry asked"
    });
  },
  cancelPipeline: ({ project, setSnack }) => (pipelineId) => async () => {
    const { status } = await axios.post(`/projects/${project.id}/pipelines/${pipelineId}/cancel`);
    setSnack({
      open: true,
      message: status === 200 ? "Pipeline cancelled"
    });
  }
});

const canRetry = (pipeline) => _.find(['finished', 'failed'], pipeline.status) !== null

const canCancel = (pipeline) => _.find(['pending', 'running'], pipeline.status) !== null

let PipeLineListItem = ({ project, pipelineCalls, retryPipeline, cancelPipeline, snack }) => {
  console.log("pipelineCalls[0]", pipelineCalls[0])
  return(
    <ListItem button>
      <ListItemText primary={`ref: ${pipelineCalls[0].ref}`} />
      <ListItemText secondary={pipelineCalls[0].sha.substring(0,7)} />
      <ListItemIcon>
        <Icon className="fa fa-exclamation-circle"/>
        <IconButton size="small" disabled={!canRetry(pipelineCalls[0])} aria-label="Retry" onClick={retryPipeline(pipelineCalls[0].id)}>
          <Icon className="fa fa-redo"/>
        </IconButton>
        <IconButton size="small" disabled={!canCancel(pipelineCalls[0])} aria-label="Cancel" onClick={cancelPipeline(pipelineCalls[0].id)}>
          <Icon className="fa fa-ban"/>
        </IconButton>
      </ListItemIcon>
      <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          className={snack.className}
          open={snack.open}
          autoHideDuration={snack.duration}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snack.message}</span>}
        />
    </ListItem>
  )
}

PipeLineListItem = compose(
  snack,
  handlers,
  pure
)(PipeLineListItem)

export default PipeLineListItem
