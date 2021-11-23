import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import { apiURL } from '../../config'
import axios from 'axios';
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function Credential() {
    const client = axios.create({
        baseURL: apiURL
    })
    const [onUpdate, setOnUpdate] = useState(false);
    const [cookies, setCookies] = useState("")
    const [resultStatus, setResultStatus] = useState("");

    function handleClick() {
        setOnUpdate(true); 
        setTimeout(() => {
            client.post('/credential_update', {cookies: cookies})
            .then((results) => {
                console.log(results)
                setCookies("");
                setOnUpdate(false);
                setResultStatus("認証情報を更新しました。");
            })
            .catch((data) =>{
                console.log(data)
                setOnUpdate(false); 
                setResultStatus("認証情報の更新に失敗しました。");
            })
        }, 1000)
        
    }

    return (
        <div className="container">
            <br />
            統合取引所にログインし、二次パスワード入力後のクッキーを入力してください。
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField value={cookies} onChange={e => setCookies(e.target.value)} id="standard-basic" label="cookie" variant="standard" />
            </Box>
            <br />
            {onUpdate 
                ? <LoadingButton 
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    >
                        更新
                    </LoadingButton>
                : <Button variant="contained" color="secoundary" style={{backgroundColor: "#1e90ff", color: "white"}} onClick={() => {handleClick()}}>更新</Button>
            }
            <br /><br /><br />
            {resultStatus}
        </div>
    );
}