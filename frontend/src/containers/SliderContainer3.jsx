import React, { useState } from 'react'
import CompanyReview from '../components/CompanyReview'
import { Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import ReviewCard from '../components/ReviewCard';
import PreviewCard from '../components/PreviewCard';

const SliderContainer3 = (props) => {
    const {data,preview_id,preview} = props
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 350, backgroundColor:'gray' }} role="presentation" onClick={toggleDrawer(false)}>
            {preview?
                        data?.map((text, index) => (
                            <div key={index}>
                                <PreviewCard data={text}></PreviewCard>
                            </div>
                        ))
                        :
            data?.map((text, index) => (
                <div key={index}>
                    <ReviewCard data={text}></ReviewCard>
                </div>
            ))
        }
        </Box>
      );

  return (
    <>
        <div>
            <div onClick={toggleDrawer(true)}>
            <CompanyReview data={data} preview_id={preview_id}></CompanyReview>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    </>
  )
}

export default SliderContainer3