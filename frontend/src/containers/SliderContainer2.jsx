import React from 'react'
import ReviewCard from '../components/ReviewCard'

const SliderContainer2 = (props) => {
    const {data} = props
  return (
        <div className="custom-scrollbar border-0">
        <div className="scroll-content">


        {/* <Card > */}
            <div className='row' >
            {
            data.reviews?.map((e,i)=>{
                return(
                <div className='slider-two' key={i}>
                    <ReviewCard data={e}></ReviewCard>
                </div>
                )
            })
            }
            
            </div>
        {/* </Card> */}

        
        </div>
        </div>
  )
}

export default SliderContainer2