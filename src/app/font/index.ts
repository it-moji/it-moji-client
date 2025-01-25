import localFont from 'next/font/local'

export const Pretendard = localFont({
  src: [
    {
      path: './pretendard-black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './pretendard-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './pretendard-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './pretendard-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--pretendard',
})
