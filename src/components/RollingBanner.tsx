import React, { Fragment } from "react";

import Glare from "../../public/glare/glare_white.svg";
import Text from "./Text";

const BANNERS = Array.from({ length: 3 }).map(
  () => "2026년 9월 5일 토요일 오전 11시"
);
const RollingBanner = () => {
  return (
    <div
      id="rolling-banner"
      className="wrapper overflow-hidden will-change-auto"
    >
      <div className="slide-container text-white bg-black py-10pxr text-14pxr leading-25pxr will-change-auto">
        <ul className="slide-wrapper will-change-auto">
          <div className="slide-original will-change-auto">
            {BANNERS.map((banner, i) => (
              <Fragment key={i}>
                <Glare className="flex-none inline" />
                <Text>{banner}</Text>
              </Fragment>
            ))}
          </div>
          <div className="slide-clone will-change-auto">
            {BANNERS.map((banner, i) => (
              <Fragment key={i}>
                <Glare className="flex-none inline" />
                <Text>{banner}</Text>
              </Fragment>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default RollingBanner;
