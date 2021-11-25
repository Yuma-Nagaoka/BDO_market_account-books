import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactExport from "react-export-excel";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));


export default function Book(props) {
    const [book, setBook] = useState([]);
    const [bop, setBop] = useState(0);
    const [bop_arr, setBop_arr] = useState([]);
    const url = 'http://localhost:3001/account_books/' + props.match.params.date;

    useEffect(() => {
        axios.get(url)
        .then((results) => {
            setBook(results.data.items)
            setBop(results.data.BOP)
            setBop_arr([{BOP: bop}])
            
            // dataBOP = [{BOP: bop}]
            // console.log(book)
        })
        .catch((data) =>{
        console.log(data)
        })
    },[])
    
    const handleAdd = () => {
        setBook([...book, {
            "date": "",
            "time": "",
            "type": "",
            "name": "",
            "pricePerOne": 0,
            "boughtCount": 0,
            "accumulateMoneyCount": 0
        }])
    };

    const handleEdit = (index) => (event) => {
        // event.stopPropagation();
        // apiRef.current.setRowMode(index, 'edit');
    };

    const handleDelete = (index) => {
        let arr = [...book];
        arr.splice(index, 1);

        setBook(arr);
    }

    return (
        <div className='bookList'>
            <h2 align="center">{props.match.params.date}</h2>
            <TableContainer component={Paper} /*sx=
                {{
                    width: 810,
                    margin:'auto',
                    // width:'60%'
                }} */
                >
                <Table sx={{ minWidth: 700 }} aria-label="customized table" actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Item',
                    // onClick: (_, rowData) =>
                    // alert('Open edit page of ' + (rowData as any).itemName + '.'),
                },
                ]}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>アイテム名</StyledTableCell>
                            <StyledTableCell align="right">価格</StyledTableCell>
                            <StyledTableCell align="right">個数</StyledTableCell>
                            <StyledTableCell align="right">小計</StyledTableCell>
                            <StyledTableCell align="right">清算時</StyledTableCell>
                            <StyledTableCell align="right" sx={{width: 70}}>購入/販売</StyledTableCell>
                            <StyledTableCell sx={{width: 50 }}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {book.map((row, index) => (
                            <StyledTableRow key={row.name} columns={[{ field: 'name', editable: true }]}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.pricePerOne.toLocaleString()}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.type == "sell"
                                        ? row.soldCount
                                        : row.boughtCount
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.accumulateMoneyCount.toLocaleString()}</StyledTableCell>
                                <StyledTableCell align="right">{row.time}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.type == "sell"
                                        ? "販売"
                                        : "購入"
                                    }
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className="btns">
                                        <IconButton aria-label="edit" size="small">
                                            <EditIcon fontSize="inherit" onClick={() => { handleEdit(index) }}/>
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small">
                                            <CancelIcon fontSize="inherit" onClick={() => { handleDelete(index) }}/>
                                        </IconButton>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        <StyledTableRow>
                            <StyledTableCell colSpan={5} component="th" scope="row"　align="right" sx={{background: "#fffaf0"}}><b>収支</b></StyledTableCell>
                            {
                                // bop.map((row) => (
                                //     <StyledTableCell align="center"><b>{row.BOP.toLocaleString()}</b></StyledTableCell>
                                // ))
                                <StyledTableCell align="right" sx={{background: "#fffaf0"}} style={bop < 0 ? { color: "#ff0000" } : {}}><b>{bop.toLocaleString()}</b></StyledTableCell>
                            }
                            <StyledTableCell sx={{background: "#fffaf0"}}/>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            
        
            {/* <div className="addBtn" align="left"></div> */}
            

            <div className="btns">
                <div className="add_btn">
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab size="small" color="primary" aria-label="add" onClick={() => { handleAdd() }}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </div>

                <div className="download_btn">
                    <ExcelFile filename={props.match.params.date + "黒い砂漠帳簿"} element={<Button variant="contained">Excel出力</Button>}>
                        <ExcelSheet data={book} name="帳簿">
                            <ExcelColumn label="アイテム名" value="name" style={{ font: {sz: "24", name: "MS PGothic"} }}/>
                            <ExcelColumn label="価格" value="pricePerOne"/>
                            <ExcelColumn label="個数" 
                                        value={(col) => col.type==="sell" ? col.soldCount : col.boughtCount}/>
                            <ExcelColumn label="小計" value="accumulateMoneyCount"/>
                            <ExcelColumn label="清算時" value="time"/>
                            <ExcelColumn label="購入/販売"
                                        value={(col) => col.type==="sell" ? "販売" : "購入"}/>
                        </ExcelSheet>
                        <ExcelSheet data={bop_arr} name="収支">
                            <ExcelColumn label="収支" value="BOP" />
                        </ExcelSheet>
                    </ExcelFile>
                </div>
            </div>
        </div>
    );
}   