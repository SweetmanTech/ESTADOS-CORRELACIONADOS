import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { HOME_FRAME, NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata(HOME_FRAME);

export const metadata: Metadata = {
  title: 'gachapon',
  description: 'gachapon',
  openGraph: {
    title: 'gachapon',
    description: 'gachapon',
    images: [`${NEXT_PUBLIC_URL}/giphy.gif`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>gachapon.vercel.app</h1>
    </>
  );
}
