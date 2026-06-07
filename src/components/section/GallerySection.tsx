"use client";

import "swiper/css";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import FadeIn from "../FadeIn";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";

const getGalleryImageLoader = (number: number) => {
  return `/gallery/gallery_${number < 10 ? `0${number}` : number}.JPEG`;
};
const IMAGES = Array.from({ length: 11 }, (_, i) => ({
  url: getGalleryImageLoader(i + 1)
}));

const GallerySection = () => {
  const [selectedIndex, setSlectedIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass>();

  useEffect(() => {
    if (!sliderRef.current) return;

    const target = document.getElementById(`small-image-${selectedIndex}`);
    if (!target) return;
    const slider = sliderRef.current;

    const targetWidth = target.offsetWidth;
    const targetLeft = target.offsetLeft;
    const targetCenter = targetLeft + targetWidth / 2;

    const sliderWidth = slider.offsetWidth;
    const sliderCenter = sliderWidth / 2;

    slider.scrollTo({
      left: targetCenter - sliderCenter,
      behavior: "smooth"
    });
  }, [selectedIndex]);

  const handleTransition = useCallback(() => {
    setTransitionIds((prev) => prev.concat(prev.length));
  }, []);

  const { isInView } = useIsInView(ref, handleTransition);

  const progressPercent = useMemo(
    () => ((selectedIndex + 1) / IMAGES.length) * 100,
    [selectedIndex]
  );

  return (
    <>
      <section ref={ref} id="gallery-section" className="w-full">
        <SlideUp className="w-full px-24pxr" show={transitionIds.includes(0)}>
          <Title>GALLERY</Title>
        </SlideUp>

        <Spacing size={10} />

        <FadeIn show={isInView}>
          {/* 1. 이미지 크기를 작게 조절하는 부분 (px-24pxr -> max-w 및 mx-auto 추가) */}
          <div className="w-full max-w-400pxr mx-auto px-24pxr">
            <Swiper
              loop
              initialSlide={selectedIndex}
              slidesPerView={1}
              onSlideChange={(slider) => setSlectedIndex(slider.realIndex)}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {IMAGES.map((image, index) => (
                <SwiperSlide key={index}>
                  {/* 2. 클릭 시 사랑(모달) 안 뜨게 하고 커서 모양 기본으로 수정 */}
                  <img
                    className="w-full object-contain"
                    alt="selected-image"
                    src={image.url}
                    width={764}
                    height={1146}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <Spacing size={16} />
          <div className="w-full px-24pxr">
            <ProgressBar width={`${progressPercent}%`} />
          </div>

          <Spacing size={16} />
          <div
            ref={sliderRef}
            className="flex flex-row flex-nowrap gap-4pxr overflow-y-scroll px-24pxr"
          >
            {IMAGES.map((image, index) => (
              <div
                id={`small-image-${index}`}
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  swiper?.slideToLoop(index);
                }}
                className="relative cursor-pointer w-60pxr h-90pxr flex-none"
              >
                <Image
                  quality={100}
                  loading="lazy"
                  alt="preview"
                  src={image.url}
                  width={120}
                  height={180}
                />
                <div
                  className="w-full h-full absolute left-0 top-0"
                  style={
                    index === selectedIndex
                      ? { boxShadow: `0 0 0 2px #000 inset` }
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
      
      {/* 사용하지 않는 ImageDetails 모달 컴포넌트 코드 삭제 */}
    </>
  );
};

export default GallerySection;
