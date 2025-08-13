"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Props for `ImageSlider`.
 */
export type ImageSliderProps = SliceComponentProps<Content.ImageSliderSlice>;

const ImageSlider: FC<ImageSliderProps> = ({ slice }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // tablet & small desktops
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="imageSlider"
    >
      <Slider {...settings}>
        {slice.primary.item.map((item, index) => (
          <div key={index} className="imageSlide">
            <PrismicNextImage field={item.image} />
            <PrismicRichText field={item.caption} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ImageSlider;
