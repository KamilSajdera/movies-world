import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import classes from "./TrendingSection.module.css";
import "./custom-swiper.css";

const TrendingSection = ({ items }) => {

  const navigate = useNavigate();

  const navigateHandle = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/movie?id=${id}-${urlName}`);
  }

  return (
    <div className={classes.trendingSection}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className={classes.mySwiper}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} onClick={() => navigateHandle(item.id, item.title)}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title}
            />
            <h3>{item.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingSection;
