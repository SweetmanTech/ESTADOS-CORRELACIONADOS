import { FrameMetadataType } from "@coinbase/onchainkit";
import { Address } from "viem";

// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://estados-correlacionados.vercel.app';
export const BUENOS_AIRES_SONG_CAMP = '0xe88035cbc6703b18e2899fe2b5f6e435f00ade41' as Address;
export const FUNDS_RECIPIENT = BUENOS_AIRES_SONG_CAMP
export const COLLECTION = "0x0e108d94d20e9301a5646ad1daefd83f9584e3d5"
export const MERKLE_MINTER = '0x5e5fD4b758076BAD940db0284b711A67E8a3B88c';
export const HOME_FRAME = {
  buttons: [
    {
      label: 'join whitelist',
    },
    {
      action: 'link',
      label: 'newtro',
      target: 'https://newtro.xyz'
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/giphy.gif`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
} as FrameMetadataType
