import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import SliderContainer1 from '../containers/SliderContainer1'
import SliderContainer2 from '../containers/SliderContainer2'
import SliderContainer3 from '../containers/SliderContainer3'
import { SettingContext } from '../providers/SettingsProvider'

const PreviewReview = (props) => {
  const {settings} = useContext(SettingContext)
  const {align,rating,theme,ratingText,reviewDate,reviewName} = settings.settings_data[0]
  const {data} = props
  let newData = data.reviews
  if(rating==='5'){
    newData = newData?.filter((item)=>item.rate === "5 stars")
    console.log(newData)
  }
  else if(rating==='4'){
    newData = newData?.filter((item)=>item.rate === "4 stars")
    console.log(newData)
  }
  else if(rating==='3'){
    newData = newData?.filter((item)=>item.rate === "3 stars")
    console.log(newData)
  }
  else if(rating==='2'){
    newData = newData?.filter((item)=>item.rate === "2 stars")
    console.log(newData)
  }
  else if(rating==='1'){
    newData = newData?.filter((item)=>item.rate === "1 stars")
    console.log(newData)
  }
  const getPreviewId = async()=>{
    try{
      const response = await axios.get("http://127.0.0.1:8000/settings/preview/")
      // console.log(response.data.preview_id[0])
      return response.data.preview_id[0]
    }
    catch(error){
      console.log(error)
    }
  }
  const {data : previewIdData} = useQuery({
    queryKey : ['fetchPreviewId'],
    queryFn: getPreviewId
  })

  return (
    <>
    {
      previewIdData?.preview_id === 1 ? <SliderContainer1 data={newData} preview_id = {1} preview="true"></SliderContainer1>
      : previewIdData?.preview_id === 2 ? <SliderContainer2 data={data} preview_id = {2} preview="true"></SliderContainer2>
      : previewIdData?.preview_id === 3 ? <SliderContainer3 data={data} preview_id = {3} preview="true"></SliderContainer3>
      : <h1>not found ...</h1>
    }
    </>
  )
}

export default PreviewReview