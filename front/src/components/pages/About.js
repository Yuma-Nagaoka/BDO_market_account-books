import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom'



export default function About() {
    const history = useHistory();
    const handleClick = () => {
        history.push('/AccountBooks');
    }

    return (
        <div className="backGround">
            <div className="mask">
            <div className="container" style={{paddingBottom: '0px'}}>
                <Typography variant="h5" component="div" sx={{ fontSize: 30, marginTop: '20px', color: 'white'}}>
                MMORPG 黒い砂漠でお金を貯めたいあなたへ
                <br /><br />
                日々の収支を可視化します。
                </Typography>
                <br /><br />
                <div className="start_btn">
                    <Button variant="contained" size="large" style={{backgroundColor: "#1e90ff", color: "white"}} onClick={() => {handleClick()}}>
                        始める</Button>
                </div>
                <br />
            </div>
            </div>
        </div>
    );
}
