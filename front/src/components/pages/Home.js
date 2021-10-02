import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function Home() {
    const [resultStatus, setResultStatus] = useState("");
    const [bookList, setBookList] = useState([]);
    const [onUpdate, setOnUpdate] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/account_books')
        .then((results) => {
            setBookList(results.data)
        })
        .catch((data) =>{
        console.log(data)
        })
    },[])

    function handleClick() {
        setOnUpdate(true); 
        setResultStatus("");
        const url = 'http://localhost:3001/account_books/update';
        
        setTimeout(() => {
            axios.post(url)
            .then((results) => {
                if(results.status == 204){ 
                    setResultStatus("統合取引所帳簿のデータを更新しました。") 
                    axios.get('http://localhost:3001/account_books')        //情報が更新できたならbookilistも更新する
                    .then((results) => {
                        setBookList(results.data)
                    })
                    .catch((data) =>{
                    console.log(data)
                    })
                }else if(results.status == 200) {
                    setResultStatus(results.data.error.msg + '\nクッキーを更新してください') 
                }else {
                    setResultStatus("統合取引所帳簿のデータ更新に失敗しました。") 
                }
                console.log(resultStatus)
                setOnUpdate(false); 
            })
            .catch((data) =>{
                console.log(data)
                setResultStatus("統合取引所帳簿のデータ更新に失敗しました。") 
                setOnUpdate(false); 
            })
        }, 1000)
        
    }
    return (
        <div className='container'>
            <br />
            <div className="update">
                {onUpdate 
                    ? <LoadingButton sx={{float: "right", right: "12px"}}
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        >
                            更新
                        </LoadingButton>
                    : <Button variant="contained" color="secoundary" style={{backgroundColor: "#1e90ff", color: "white", float: "right", right: "12px"}} onClick={() => {handleClick()}}>更新</Button>
                }
                <div className="status-msg">
                    {resultStatus == ""
                        ? <div ><br /></div>
                        : resultStatus
                        .split('\n').map((str, index) => (
                            <React.Fragment key={index} textAlign="center">{str}<br /></React.Fragment>
                        ))
                    }
                </div>
            </div>
            <BookList item={bookList}/>
        </div>
    );
}