import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Delete from '@material-ui/icons/Delete';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ReactExport from "react-export-excel";
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { apiURL } from '../../config'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const tableIcons = {
    Add: forwardRef((props, ref) => <AddCircleIcon color="primary" style={{ color: "#1e90ff", fontSize: "40px" }} {...props} ref={ref} />),
    // Add: forwardRef((props, ref) =>
    //         <div>
    //         {/* アイテムの追加 */}
    //         {/* <Fab size="small" color="primary" aria-label="add" {...props} ref={ref}> */}
    //             <AddIcon color="primary"/>
    //         {/* </Fab> */}
    //         </div> 
    //     ),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
    height: "100%",
    paddingTop: 3,
  }));

export default function Book(props) {
    const [book, setBook] = useState([]);
    const [book_origin, setBook_origin] = useState([]);
    const [bop, setBop] = useState(0);
    const [bop_arr, setBop_arr] = useState([]);
    // const url = 'http://localhost:3001/account_books/' + props.match.params.date;
    const client = axios.create({
        baseURL: apiURL
    })

    const numberFormat = (num) => {
        if (num == null) {
            return 0
        }
        return Number(num.replace(",", "")).toLocaleString();
    }

    const bookFormat = (old_book) => {
        let new_book = {}
        return new_book = {
                "id": old_book.id,
                "date": old_book.date,
                "time": old_book.time,
                "type": old_book.type,
                "name": old_book.name,
                "pricePerOne": numberFormat(old_book.pricePerOne),
                "tradeCount": numberFormat(old_book.tradeCount),
                "accumulateMoneyCount": numberFormat(old_book.accumulateMoneyCount)
        }
    }

    useEffect(() => {
        
        client.get('/account_books/' + props.match.params.date)
        .then((results) => {
            setBook(results.data.items)
            setBop(results.data.BOP)
            setBop_arr([{"BOP": results.data.BOP.toLocaleString()}])
            
        })
        .catch((data) =>{
        console.log(data)
        })


    },[])

    // const getData = () => {
    //     client.get('/account_books/' + props.match.params.date)
    //     .then((results) => {
    //         setBook(results.data.items)
    //         setBop(results.data.BOP)
    //         setBop_arr([{"BOP": results.data.BOP.toLocaleString()}])
            
    //     })
    //     .catch((data) =>{
    //     console.log(data)
    //     })
    // }

    // const handleAdd = () => {
    //     setBook([...book, {
    //         "id": book.length,
    //         "date": "",
    //         "time": "",
    //         "type": "",
    //         "name": "",
    //         "pricePerOne": 0,
    //         "boughtCount": 0,
    //         "accumulateMoneyCount": 0
    //     }])
    // }

        // const handleEdit = (index) => (event) => {
        //     // event.stopPropagation();
        //     // apiRef.current.setRowMode(index, 'edit');
        // }

        // const handleDelete = (id) => {
        //     let arr = [...book];
        //     arr.splice(id, 1); //このデータにおいて、id=index

        //     setBook(arr);
        // }

    return (
        <div className="container" style={{ maxWidth: "100%" }}>
            <MaterialTable icons={tableIcons} title={props.match.params.date}
                columns={[
                { title: "アイテム名", field: "name", width: "100%", headerStyle: { whiteSpace: 'nowrap' } },
                { title: "価格", field: "pricePerOne", headerStyle: { whiteSpace: 'nowrap' } },
                { title: "個数", field: "tradeCount", headerStyle: { whiteSpace: 'nowrap' }},
                { title: "小計", field: "accumulateMoneyCount", headerStyle: { whiteSpace: 'nowrap' } },
                { title: "清算時", field: "time" , headerStyle: { whiteSpace: 'nowrap' }},
                { title: "購入/販売", field: "type", headerStyle: { whiteSpace: 'nowrap' }, lookup: { '購入': '購入', '販売': '販売' },},
                ]}
                data={book}
                editable={{
                    // isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
                    // isEditHidden: rowData => rowData.name === 'x',
                    // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                    // isDeleteHidden: rowData => rowData.name === 'y',
                    // onBulkUpdate: changes => 
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //             // setBook([...data, newBook]);
            
                    //             resolve();
                    //         }, 1000);
                    //     }),
                    onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                    onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                    onRowAdd: newBook =>
                        new Promise((resolve, reject) => {
                            // setTimeout(() => {
                                // setBook([...book, bookFormat(newBook)]);
                                // if (newBook.type == "販売") {
                                //     setBop(bop + parseInt(newBook.accumulateMoneyCount))
                                // }else if (newBook.type == "購入") {
                                //     setBop(bop - parseInt(newBook.accumulateMoneyCount))
                                // }
                                console.log(newBook)

                                client.post('/account_books/' + props.match.params.date, newBook)
                                .then((results) => {
                                    setBook(results.data.items)
                                    setBop(results.data.BOP)
                                    setBop_arr([{"BOP": results.data.BOP.toLocaleString()}])
                                })
                                .catch((data) =>{
                                    console.log(data)
                                })

                                resolve();
                            // }, 100);
                            
                        }),
                    onRowUpdate: (newBook, oldBook) =>
                        new Promise((resolve, reject) => {
                            // setTimeout(() => {
                                // const bookUpdate = [...book];
                                // const id = oldBook.id;
                                // bookUpdate.findIndex(({id}) => id === id);
                                // setBook([...bookUpdate]);

                                // const url_update = 'http://localhost:3001/account_books/' + props.match.params.date;
                                // newBook.id = id
                                client.patch('/account_books/' + props.match.params.date, newBook)
                                .then((results) => {
                                    setBook(results.data.items)
                                    setBop(results.data.BOP)
                                    setBop_arr([{"BOP": results.data.BOP.toLocaleString()}])
                                })
                                .catch((data) =>{
                                    console.log(data)
                                })

                                resolve();
                            // }, 100);
                        }),
                    onRowDelete: oldBook =>
                        new Promise((resolve, reject) => {
                            // setTimeout(() => {
                                const bookDelete = [...book];
                                const id = oldBook.id; //oldBook.tableData.idはidというよりindex.配列の番号そのもの
                                // bookDelete.splice(index, 1);
                                // setBook([...bookDelete]);
                                // if (newBook.type == "販売") {
                                //     setBop(bop - parseInt(newBook.accumulateMoneyCount))
                                // }else if (newBook.type == "購入") {
                                //     setBop(bop + parseInt(newBook.accumulateMoneyCount))
                                // }

                                // const url_delete = 'http://localhost:3001/account_books/' + props.match.params.date;
                                client.delete('/account_books/' + props.match.params.date, {data: {id: id, accumulateMoneyCount: oldBook.accumulateMoneyCount, type: oldBook.type}}) //左辺のindexはキー名、右辺は変数
                                .then((results) => {
                                    setBook(results.data.items)
                                    setBop(results.data.BOP)
                                    setBop_arr([{"BOP": results.data.BOP.toLocaleString()}])
                                })
                                .catch((data) =>{
                                    console.log(data)
                                })
            
                                resolve();
                            // }, 100);
                        })
                }}
                options={{
                    search: false
                }}
            />
                <Card sx={{ minWidth: 200 }} style={{float: "right", height: '60px', marginTop: '10px'}}>
                    <CardContent >
                        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                        </Typography> */}
                        {/* <Typography align="center" sx={{ fontSize: 18 }} style={bop < 0 ? { color: "#ff0000" } : {}}> */}
                        <div style={{fontSize: 17}}>
                            <span class="mgr-10">収支 :</span>
                                {bop>=0 
                                    ? <span>+{bop.toLocaleString()}</span>
                                    : <span class="red">{bop.toLocaleString()}</span>
                                }   
                        </div>
                        {/* </Typography> */}
                    </CardContent>
                </Card>

                <div className="download_btn">
                    <ExcelFile filename={props.match.params.date + "黒い砂漠帳簿"} element={<Button variant="contained" style={{backgroundColor: "#1e90ff", color: "white"}}>Excel出力</Button>}>
                        <ExcelSheet data={book} name="帳簿">
                            <ExcelColumn label="アイテム名" value="name" style={{ font: {sz: "24", name: "MS PGothic"} }}/>
                            <ExcelColumn label="価格" value="pricePerOne"/>
                            <ExcelColumn label="個数" value="tradeCount"/>
                            <ExcelColumn label="小計" value="accumulateMoneyCount"/>
                            <ExcelColumn label="清算時" value="time"/>
                            <ExcelColumn label="購入/販売" value="type"/>
                        </ExcelSheet>
                        <ExcelSheet data={bop_arr} name="収支">
                            <ExcelColumn label="収支" value="BOP" />
                        </ExcelSheet>
                    </ExcelFile>
                </div>
        </div>
    );
}