import React from 'react';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';

function BookList(props) {

    return (
        <div className="book-list">
          {props.item.map((date) => {
            return (
                <div className='book-item'>
                    <Link to={`/AccountBooks/${date}`}>
                        <div className='book-date' >{date}</div>
                    </Link>
                </div>
                // <div>
                // // <Card variant="outlined">
                // //     {/*  */}
                // //     <React.Fragment>
                // //         <Link to={`/book/${date}`}>
                // //         <CardContent>
                // //             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                // //             {date}
                // //             </Typography>
                // //         </CardContent>
                // //         <CardActions>
                // //             <Button size="small">Learn More</Button>
                // //         </CardActions>
                // //         </Link>
                // //     </React.Fragment>
                // // </Card>
                // </div>
            )
          })}
          {/* <Route path="/:date" component={Sample1} /> */}
        </div>
    );
}
export default BookList;