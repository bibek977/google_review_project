import React from 'react'
import Card from '@mui/material/Card';
import { Avatar, Button, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PreviewTab = (props) => {
  const navigate = useNavigate()
  const {data} = props
  const i = data.company[0]
  console.log(i)

  const disconnectDataFunction = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/disconnect");
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
const disconnectData = ()=>{
    disconnectDataFunction()
    navigate("/search")
    }
  return (
    <div className='preview-tab'>
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
              <Button variant="contained" color='warning' onClick={disconnectData} >Disconnect</Button>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreviewTab