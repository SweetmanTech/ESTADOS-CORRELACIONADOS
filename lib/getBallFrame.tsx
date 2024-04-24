import { NEXT_PUBLIC_URL } from '@/app/config';
import { FrameMetadataType } from '@coinbase/onchainkit';

const getBallFrame = (isCollector: boolean) => {
  const txLabel = isCollector ? 'Collect New Prize' : 'Insert Token';
  const actionLabel = isCollector ? 'OPEN CAPSULE' : 'START OVER';
  const src = isCollector
    ? `${NEXT_PUBLIC_URL}/pokeball.gif`
    : `${NEXT_PUBLIC_URL}/insert-token.gif`;
  const image = {
    src,
  } as any;
  if (isCollector) {
    image.aspectRatio = '1:1';
  }
  return {
    buttons: [
      {
        label: actionLabel,
      },
      {
        action: 'tx',
        label: txLabel,
        target: `${NEXT_PUBLIC_URL}/api/tx`,
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      },
    ],
    image,
    postUrl: isCollector ? `${NEXT_PUBLIC_URL}/api/success` : `${NEXT_PUBLIC_URL}/api/home`,
    state: {
      time: new Date().toISOString(),
    },
  } as FrameMetadataType;
};

export default getBallFrame;
