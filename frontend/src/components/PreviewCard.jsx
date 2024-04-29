import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SettingContext } from '../providers/SettingsProvider'

const PreviewCard = (props) => {
    const {settings} = useContext(SettingContext)
    const { settings_data } = settings || {}
    const { align, rating, theme, ratingText, reviewDate, reviewName } = (settings_data && settings_data.length > 0) ? settings_data[0] : {};
    const {data} = props
  return (
    <Card sx={{padding:2,margin:2, 
    backgroundColor:theme==='dark'?'black':'white',
    color:theme==='dark'?'white':'black'}}>
        <CardHeader 
            avatar =  {<Avatar alt="profile image" src={data.profile_pic} variant='rounded' sx={{width:50,height:50}} />}
            title = {reviewName?"":data.name}
            subheader = {reviewDate?"":data.date}
            action={
                <>
                <Avatar alt="google photo" src='https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png' variant='rounded' sx={{width:50,height:50,cursor:'pointer'}}></Avatar>
                <Typography>{data.rate}</Typography>
                </>
              }
        >
        </CardHeader>
        <CardContent sx={{height:200}}>
                <Typography sx={{textAlign:align}}>
                    {ratingText?"":data.review}
                </Typography>
            </CardContent>
    </Card>
  )
}

export default PreviewCard