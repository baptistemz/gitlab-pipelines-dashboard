import React from 'react';
import { ListItem, ListItemText, ListItemIcon, Icon } from '@material-ui/core';

const PipeLineListItem = ({ pipelineCalls }) => {
  console.log("pipelineCalls[0]", pipelineCalls[0])
  return(
    <ListItem button>
      <ListItemText primary={`ref: ${pipelineCalls[0].ref}`} />
      <ListItemText secondary={pipelineCalls[0].sha.substring(0,7)} />
      <ListItemText><Icon className="fa fa-exclamation-circle"/></ListItemText>
      <ListItemIcon>
      </ListItemIcon>
    </ListItem>
  )
}

export default PipeLineListItem
