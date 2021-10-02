import { Link } from 'react-router-dom'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
  height: "100%",
  paddingTop: 3,
}));

// const section = {
    
//     backgroundColor: "#fff"
//   };

function FormRow(props) {
    return (
        <React.Fragment>
            {props.row.map((date) => {
                return (
                    <Grid item xs={4} > 
                        <Link to={`/book/${date}`} style={{ textDecoration: 'none' }}>
                            <Item><br />{date}<br /></Item>
                        </Link>
                    </Grid>
                );
            })}
        </React.Fragment>
    );
}

export default function BookList(props) {

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <FormRow row={props.item}/>
                    </Grid>
                    {/* <Grid container item spacing={3}>
                    <FormRow />
                    </Grid>
                    <Grid container item spacing={3}>
                    <FormRow />
                    </Grid> */}
                </Grid>
            </Box>
        </div>
    );
}