/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 이 줄을 추가합니다.
  images: {
    unoptimized: true, // 깃허브 페이지에서 이미지 깨짐을 방지합니다.
  },
};

export default nextConfig;
