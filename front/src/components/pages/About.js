import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom'



export default function HowTo() {
    const history = useHistory();
    const handleClick = () => {
        history.push('/AccountBooks');
    }

    return (
        <div className="container">
            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{textAlign: "left"}}>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                    </Typography> */}
                    <Typography variant="h5" component="div" sx={{ fontSize: 30}}>
                    BDO.AccountBooksとは
                    </Typography>
                    <br />
                    <Typography variant="body2"　sx={{ fontSize: 18}}>
                    <br />
                    MMORPG、黒い砂漠の帳簿作成アプリです。
                    <br/><br />
                    統合取引所で予約購入/販売したアイテムを自動で反映させることができます。
                    <br />
                    NPCから購入したり、統合取引所でその場で取引が完了したアイテムに関しては手動で追加してください。
                    <br /><br/>
                    お金を貯めることが重要な黒い砂漠。毎日の収支を明確にし、建設的に大金持ちになりましょう。
                    </Typography>
                </CardContent>
            </Card>
            <br />
            <div className="start_btn">
                <Button variant="contained" style={{backgroundColor: "#1e90ff", color: "white"}} onClick={() => {handleClick()}}>
                    始める</Button>
            </div>
            <br />
        </div>
    );
}
