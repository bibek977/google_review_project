import React from 'react'
import Card from '@mui/material/Card';
import { Avatar, Button, CardContent, Grid, Typography } from '@mui/material';

const CompanyReview = (props) => {
    const {data} = props
    const i = data.company[0]
    const changeDesign = ()=>{
        console.log("design change")
    }
  return (
    <div>
         <Card>
        <CardContent sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <CardContent sx={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
            <Avatar alt="company image" src={i.image} variant='square' sx={{width:100,height:100}} />
            <div className="company-details">
              <Typography>{i.company}</Typography>
              <Grid container spacing={15}>
                <Grid item xs={4}>
                  {i.rating}
                </Grid>
                <Grid item xs={4}>
                  {i.reviews}
                </Grid>
              </Grid>
            </div>
            </CardContent>
            <CardContent sx={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
              <Button variant="contained" color='success' onClick={changeDesign} >Select</Button>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  )
}

export default CompanyReview