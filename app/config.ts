import { FrameMetadataType } from "@coinbase/onchainkit";
import { Address } from "viem";

// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://gachapon.vercel.app';
export const BUENOS_AIRES_SONG_CAMP = '0xe88035cbc6703b18e2899fe2b5f6e435f00ade41' as Address;
export const HOME_FRAME = {
  buttons: [
    {
      label: 'view works',
    },
    {
      label: 'join whitelist',
    },
    {
      label: 'newtro',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/giphy.gif`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
} as FrameMetadataType
