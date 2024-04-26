import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ReviewCard from '../components/ReviewCard';
import PreviewCard from '../components/PreviewCard';

const SliderContainer1 = (props) => {
    const {data,preview} = props
    // console.log(data)
  return (
    <div className='swiper-main-div'>

    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={3}
      navigation={{ clickable: true, nextEl: '.swiper-next-1', prevEl: '.swiper-prev-1' }}
      pagination={{ clickable: true, el: '.swiper-pagination-1' }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay:3*1000,
        disableOnInteraction: false,
      }}
      ref={null}
      breakpoints={{
        1200: {
          slidesPerView: 3,
        },
        900: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      }}
    >
        {preview?
         data?.map((e,i)=>{
          return(
              <SwiperSlide key={i}>
                  <PreviewCard data={e}></PreviewCard>
              </SwiperSlide>
          )
      })
        :
        data.reviews?.map((e,i)=>{
            return(
                <SwiperSlide key={i}>
                    <ReviewCard data={e}></ReviewCard>
                </SwiperSlide>
            )
        })}

    </Swiper>
        <div className='swiper-button-next swiper-next-1'></div>
        <div className='swiper-button-prev swiper-prev-1'></div>
    </div>

  )
}

export default SliderContainer1