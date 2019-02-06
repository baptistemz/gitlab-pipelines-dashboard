import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const LoadingScreen = () => {
  return(
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Gitlab Pipelines Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "24px"}}>
        Loading....
      </div>
    </div>
  )
}


export default LoadingScreen;
