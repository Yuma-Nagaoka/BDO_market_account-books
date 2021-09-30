// import { HelpOutline } from "@material-ui/icons";
// import React from "react";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// const dataSet1 = [
//     {
//         name: "Johson",
//         amount: 30000,
//         sex: 'M',
//         is_married: true
//     },
//     {
//         name: "Monika",
//         amount: 355000,
//         sex: 'F',
//         is_married: false
//     },
//     {
//         name: "John",
//         amount: 250000,
//         sex: 'M',
//         is_married: false
//     },
//     {
//         name: "Josef",
//         amount: 450500,
//         sex: 'M',
//         is_married: true
//     }
// ];

// const dataSet2 = [
//     {
//         name: "Johnson",
//         total: 25,
//         remainig: 16
//     },
//     {
//         name: "Josef",
//         total: 25,
//         remainig: 7
//     }
// ];

// export default function MakeXlsx() {
//     return (
//         <ExcelFile>
//             <ExcelSheet data={dataSet1} name="AccountBook">
//                 <ExcelColumn label="アイテム名" value="name"/>
//                 <ExcelColumn label="価格" value="amount"/>
//                 <ExcelColumn label="個数" value="sex"/>
//                 <ExcelColumn label="小計" value="sex"/>
//                 <ExcelColumn label="清算時" value="sex"/>
//                 <ExcelColumn label="購入/販売"
//                              value={(col) => col.is_married ? "Married" : "Single"}/>
//             </ExcelSheet>
//         </ExcelFile>
//     );
// }