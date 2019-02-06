import React from 'react';
import { withState, withHandlers, compose, pure } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const open = withState("open", "setOpen", false);

const anchorEl = withState("anchorEl", "setAnchorEl", null);

const handlers = withHandlers({
  onGroupSelect: ({ setOpen, onGroupSelect, setAnchorEl }) => (group) => {
    setOpen(false);
    setAnchorEl(null);
    onGroupSelect(group);
  }
})

let Navbar = ({ selectedGroup, groups, anchorEl, setAnchorEl, open, setOpen, onGroupSelect }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Icon className="fab fa-gitlab"/> 
        <Typography style={{ flexGrow: 1 }} variant="h6" color="inherit">
          Gitlab Pipelines Dashboard
        </Typography>
        <div>
          <Button
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={(e) => {
              setAnchorEl(e.currentTarget)
              setOpen(!open)
            }}
            color="inherit" >
            {selectedGroup.name}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={()=> setAnchorEl(null)}
            >
            {groups.map((group, index) => {
              return(
                <MenuItem key={index} onClick={() => onGroupSelect(group)}>
                  {group.name}
                </MenuItem>
              )
            })}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

Navbar = compose(
  open,
  anchorEl,
  handlers,
  pure
)(Navbar)

export default Navbar;
