"use client";

import React, { MouseEventHandler, useCallback } from "react";

import Flex from "../Flex";
import Kakao from "../../../public/kakaoNavi.svg";
import Link from "next/link";
import NaverMap from "../../../public/naverMap.svg";
import TMap from "../../../public/tMap.svg";

const Navigations = () => {
  const destinationName = "웨딩스퀘어 강변";
  const encodedName = encodeURIComponent(destinationName);
  const lat = 37.535889; // 위도
  const lng = 127.096018; // 경도

  // 1. 카카오내비 실행 함수
  const handleKakaoNavi: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    const kakaoAppUrl = `kakaomap://route?ep=${lat},${lng}&by=CAR`;
    const kakaoWebUrl = `https://kakao.com{encodedName},${lat},${lng}`;

    const startTime = Date.now();
    window.location.href = kakaoAppUrl;

    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = kakaoWebUrl;
      }
    }, 1500);
  }, [encodedName]);

  // 2. 네이버 지도 모바일 딥링크 
  // 앱이 있으면 네이버 지도 앱 길찾기로 바로 연결, 없으면 모바일 웹 주소로 전환됩니다.
  const naverMapUrl = `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=${encodeURIComponent("wedding-invitation")}`;
  const fallbackNaverUrl = `https://naver.com{encodedName}&ex=${lng}&ey=${lat}&pathType=0`;

  const handleNaverMap: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    const startTime = Date.now();
    window.location.href = naverMapUrl;

    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = fallbackNaverUrl;
      }
    }, 1500);
  }, [naverMapUrl, fallbackNaverUrl]);

  // 3. 티맵 모바일 딥링크
  // 앱이 있으면 티맵 앱이 켜지며 목적지가 지정되고, 없으면 티맵 모바일 웹 다운로드/안내 페이지로 연결됩니다.
  const tMapUrl = `tmap://route?rGoName=${encodedName}&rGoX=${lng}&rGoY=${lat}`;
  const fallbackTMapUrl = `https://tmap.co.kr{encodedName}&x=${lng}&y=${lat}`;

  const handleTMap: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    const startTime = Date.now();
    window.location.href = tMapUrl;

    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = fallbackTMapUrl;
      }
    }, 1500);
  }, [tMapUrl, fallbackTMapUrl]);

  return (
    <Flex
      id="navigations"
      direction="row"
      justify="flex-end"
      align="center"
      className="gap-x-8pxr"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Kakao onClick={handleKakaoNavi} className="flex-none cursor-pointer" />
      <NaverMap onClick={handleNaverMap} className="flex-none cursor-pointer" />
      <TMap onClick={handleTMap} className="flex-none cursor-pointer" />
    </Flex>
  );
};

export default Navigations;
