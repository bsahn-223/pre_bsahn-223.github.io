"use client";

import React, { ReactNode, useEffect } from "react";

const KakaoSDK = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.getElementById("kakao-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.async = true;
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
    script.integrity =
      "sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J";
    script.crossOrigin = "anonymous";

    script.onload = () => {
      window.Kakao.init("1a1b420e11557ddb2626a319a5d4b1b9");
      console.log("Kakao SDK loaded");
    };
    document.body.appendChild(script);
  }, []);

  return <>{children}</>;
};

export default KakaoSDK;
