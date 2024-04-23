import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

const ReviewCard = (props) => {
    const {data} = props
  return (
    <Card sx={{padding:2,margin:2}}>
        <CardHeader 
            avatar =  {<Avatar alt="profile image" src={data.profile_pic} variant='rounded' sx={{width:50,height:50}} />}
            title = {data.name}
            subheader = {data.date}
            action={
                <>
                <Avatar alt="google photo" src='https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png' variant='rounded' sx={{width:50,height:50,cursor:'pointer'}}></Avatar>
                <Typography>{data.rate}</Typography>
                </>
              }
        >
        </CardHeader>
        <CardContent sx={{height:200}}>
                <Typography>
                    {data.review}
                </Typography>
            </CardContent>
    </Card>
  )
}

export default ReviewCard