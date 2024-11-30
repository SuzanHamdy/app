import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
const Header = () => {
    
  return (
    <AppBar sx={{ boxShadow: 2}} >
      <Toolbar>
      <IconButton  edge="start" color="inherit"  sx={{ mr: 1 ,mx : 2 }}>
      <WbSunnyIcon  sx={{ fontSize: 44, fontWeight: 'medium'}} />
      </IconButton>
      <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
      weather app
      </Typography>
    </Toolbar>
    </AppBar>
  )
}

export default Header;
