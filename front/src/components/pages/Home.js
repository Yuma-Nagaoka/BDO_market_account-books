import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Home() {
    const [resultStatus, setResultStatus] = useState("");
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get('http://ec2-3-115-26-155.ap-northeast-1.compute.amazonaws.com:80/account_books')
        .then((results) => {
            setBookList(results.data)
        })
        .catch((data) =>{
        console.log(data)
        })
    },[])

    function handleClick() { 
        const url = 'http://ec2-3-115-26-155.ap-northeast-1.compute.amazonaws.com:80/account_books/update';
        
        axios.post(url)
        .then((results) => {
        if(results.status == 204){ 
            setResultStatus("統合取引所帳簿のデータを更新しました。") 
            axios.get('http://ec2-3-115-26-155.ap-northeast-1.compute.amazonaws.com:80/account_books')        //情報が更新できたならbookilistも更新する
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
        })
        .catch((data) =>{
        console.log(data)
        setResultStatus("統合取引所帳簿のデータ更新に失敗しました。") 
        })

    }
    return (
        <div className='home'>
            <br />
            <Button variant="contained" onClick={() => {handleClick()}}>更新</Button>
            <p>{
                resultStatus.split('\n').map((str, index) => (
                    <React.Fragment key={index}>{str}<br /></React.Fragment>
                ))
            }</p>
            <BookList item={bookList}/>
        </div>
    );
}