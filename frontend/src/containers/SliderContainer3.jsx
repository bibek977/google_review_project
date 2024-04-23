import React, { useState } from 'react'
import CompanyReview from '../components/CompanyReview'
import { Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import ReviewCard from '../components/ReviewCard';

const SliderContainer3 = (props) => {
    const {data} = props
    console.log(data)
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 350, backgroundColor:'gray' }} role="presentation" onClick={toggleDrawer(false)}>
            {data.reviews?.map((text, index) => (
                <div key={index}>
                    <ReviewCard data={text}></ReviewCard>
                </div>
            ))}
        </Box>
      );

  return (
    <>
        <div>
            <div onClick={toggleDrawer(true)}>
            <CompanyReview data={data}></CompanyReview>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    </>
  )
}

export default SliderContainer3