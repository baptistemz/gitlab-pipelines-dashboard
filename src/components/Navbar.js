import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Gitlab Pipelines Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
