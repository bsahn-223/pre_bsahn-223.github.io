"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Account from "./Account";
import Arcodion from "../Arcodion";
import FooterSection from "./FooterSection";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["GIFT", "FOR", "WEDDING", "CEREMONY"];

const AccountSection = ({ onDone }: { onDone: () => void }) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const [startTransition, setStartTransition] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 50);
  useIsInView(ref, () => setStartTransition(true));

  const [callTimeout, setCallTimeout] = useState(false);

  useInterval(() => {
    if (!callTimeout || transitionIds.length >= TITLE.length + 2) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 50);

  useEffect(() => {
    if (!startTransition) return;

    setTimeout(() => {
      setCallTimeout(true);
    }, 200);

    const intervalId = setInterval(() => {
      setTransitionIds((prev) => {
        if (prev.length === TITLE.length + 2) {
          clearInterval(intervalId);
          return prev;
        }
        return prev.concat(prev.length);
      });
    }, 50);

    const timeoutId = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(TITLE.length + 2));
      clearTimeout(timeoutId);
    }, 200);
    onDone();
  }, [startTransition]);

  return (
    <>
      <section ref={ref} id="account-section" className="w-full px-24pxr">
        {TITLE.map((title, i) => (
          <SlideUp key={title} show={transitionIds.includes(i)}>
            <Title>{title}</Title>
          </SlideUp>
        ))}
        <Spacing size={20} />
        
        {/* 신랑측 아코디언 */}
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-black">
              <Text>신랑측 계좌번호</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              {/* 신랑 본인 */}
              <Account
                name="안병섭"
                bankInfo={{
                  bankName: "토스뱅크",
                  accountNumber: "100166342894"
                }}
              />
              <Spacing size={12} />
              {/* 신랑 아버님 계좌 */}
              <Account
                name="아버지 OOO"
                bankInfo={{
                  bankName: "OO은행",
                  accountNumber: "000-000-000000"
                }}
              />
              <Spacing size={12} />
              {/* 신랑 어머님 계좌 (필요 없으시다면 이 <Account />와 바로 위 <Spacing />을 지우시면 됩니다) */}
              <Account
                name="어머니 OOO"
                bankInfo={{
                  bankName: "OO은행",
                  accountNumber: "000-000-000000"
                }}
              />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
        
        <Spacing size={20} />
        
        {/* 신부측 아코디언 */}
        <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-black">
              <Text>신부측 계좌번호</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              {/* 신부 본인 */}
              <Account
                name="안희연"
                bankInfo={{
                  bankName: "토스뱅크",
                  accountNumber: "100062438989"
                }}
              />
              <Spacing size={12} />
              {/* 신부 아버님 계좌 */}
              <Account
                name="아버지 OOO"
                bankInfo={{
                  bankName: "OO은행",
                  accountNumber: "000-000-000000"
                }}
              />
              <Spacing size={12} />
              {/* 신부 어머님 계좌 */}
              <Account
                name="어머니 OOO"
                bankInfo={{
                  bankName: "OO은행",
                  accountNumber: "000-000-000000"
                }}
              />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
      </section>
      
      <Spacing size={100} />
      
      <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
        <FooterSection />
      </SlideUp>
    </>
  );
};

export default AccountSection;
