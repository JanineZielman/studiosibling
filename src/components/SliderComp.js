'use client';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function SliderComp({ items }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  
  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index} className="imageSlide">
          <PrismicNextImage field={item.image} />
          <PrismicRichText field={item.caption} />
        </div>
      ))}
    </Slider>
  );
}
