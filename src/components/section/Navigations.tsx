"use client";

import React, { MouseEventHandler, useCallback } from "react";

import Flex from "../Flex";
import Kakao from "../../../public/kakaoNavi.svg";
import Link from "next/link";
import NaverMap from "../../../public/naverMap.svg";
import TMap from "../../../public/tMap.svg";

const Navigations = () => {
  const handleKakaoNavi: MouseEventHandler = useCallback((e) => {
    e.preventDefault();

    // 1. 카카오내비 모바일 앱 스킴 URL 생성 (목적지 좌표 및 이름 인코딩)
    const destinationName = encodeURIComponent("웨딩스퀘어 강변");
    const lat = 37.535889; // 위도
    const lng = 127.096018; // 경도

    // 카카오맵/내비 실행 스킴 URL
    const kakaoAppUrl = `kakaomap://route?ep=${lat},${lng}&by=CAR`;
    const kakaoWebUrl = `https://kakao.com{destinationName},${lat},${lng}`;

    // 2. 모바일 브라우저 환경에서 앱 실행 시도 후 미설치 시 웹으로 이동하는 폴백 처리
    const startTime = Date.now();
    window.location.href = kakaoAppUrl;

    setTimeout(() => {
      // 1.5초 이내에 앱이 열리지 않았다면 (화면이 백그라운드로 전환되지 않았다면) 웹 페이지 전환
      if (Date.now() - startTime < 2000) {
        window.location.href = kakaoWebUrl;
      }
    }, 1500);
  }, []);

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
      {/* 모바일에서 터치하기 편하도록 cursor-pointer 및 크기 적용 확인 */}
      <Kakao onClick={handleKakaoNavi} className="flex-none cursor-pointer" />

      {/* 네이버 지도 모바일 딥링크 호환 */}
      <Link href="https://naver.me" target="_blank" rel="noopener noreferrer">
        <NaverMap className="flex-none" />
      </Link>
      
      {/* 티맵 모바일 딥링크 호환 */}
      <Link href="https://tmap.life" target="_blank" rel="noopener noreferrer">
        <TMap className="flex-none" />
      </Link>
    </Flex>
  );
};

export default Navigations;
