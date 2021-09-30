import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory } from 'react-router-dom'

export default function ButtonAppBar() {
    const history = useHistory();
    function handleClick() { 
        history.push('/HowTo');
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}>
            <Toolbar>
            {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to={`/`} style={{ color: '#FFFF', textDecoration: 'none', float: 'left' }}>
                    BDO.AccountBooks
                    {/* <div align="left">BDO.AccountBooks</div> */}
                </Link>
            </Typography>
            <Button color="inherit" style={{textTransform: 'none'}}　onClick={() => {handleClick()}}>使い方</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
