import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { Avatar, Button, CardContent, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const CompanyReview = (props) => {
    const {data,preview_id} = props
    const i = data.company[0]

    const [initPreviewID,setPreviewId] = useState({
      "preview_id" : 1
    })
    const previewID = async()=>{
      try{
          const response = await axios.patch("http://127.0.0.1:8000/settings/preview/",initPreviewID)
      console.log(response.data)
      return response.data
      }
      catch(error){
          throw new Error(error)
      }
      }
      const {
          mutate:postPreviewId,
          data : previewIdData,
      } = useMutation({
          mutationKey : ['previewId'],
          mutationFn : previewID
      })

    const changeDesign = ()=>{
        // console.log("design change")
        setPreviewId({'preview_id':preview_id})
        postPreviewId()
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