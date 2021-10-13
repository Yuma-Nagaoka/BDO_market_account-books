import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory, useLocation } from 'react-router-dom'

export default function ButtonAppBar() {
    const history = useHistory();
    const location = useLocation();
    function handleClick(where) { 
        history.push('/'+ where);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={location.pathname === "/"
            ? { color: "#e0f2f1", backgroundColor: "#004d40" }
            : { color: "#e0f2f1", backgroundColor: "#004d40" }
            }>
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
                <Link to={`/AccountBooks`} style={{ color: '#FFFF', textDecoration: 'none', float: 'left' }}>
                    BDO.AccountBooks
                    {/* <div align="left">BDO.AccountBooks</div> */}
                </Link>
            </Typography>
            <Button color="inherit" style={{textTransform: 'none'}}　onClick={() => {handleClick('')}}>Home</Button>
            <Button color="inherit" style={{textTransform: 'none'}}　onClick={() => {handleClick('AccountBooks')}}>帳簿</Button>
            <Button color="inherit" style={{textTransform: 'none'}}　onClick={() => {handleClick('HowTo')}}>使い方</Button>
            <Button color="inherit" style={{textTransform: 'none'}}　onClick={() => {handleClick('CredentialUpdate')}}>認証情報の更新</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
