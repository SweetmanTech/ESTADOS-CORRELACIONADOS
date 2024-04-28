import { Address, encodeAbiParameters, maxUint64 } from 'viem';
import { merkleMinterAbi } from '../abi/merkleMinter';
import { whitelistAccount, whitelistClient } from '../clients/whitelistClient';
import { COLLECTION, FUNDS_RECIPIENT } from '@/app/config';
import { zora1155Implementation } from '../abi/zora1155Implementation';
import getSetSaleMerkleData from './getSetSaleMerkleData';
import { zoraSepolia } from 'viem/chains';

const MERKLE_MINTER = '0x5e5fD4b758076BAD940db0284b711A67E8a3B88c';

const callSaleMerkle = async (root: Address) => {
  const tokenId = 1n;
  const saleConfig = MERKLE_MINTER;
  const data = getSetSaleMerkleData(tokenId, root);
  try {
    const tx = await whitelistClient.writeContract({
      address: COLLECTION,
      abi: zora1155Implementation,
      chain: zoraSepolia,
      functionName: 'callSale',
      account: whitelistAccount,
      args: [tokenId, saleConfig, data],
    });
    return tx;
  } catch (err) {
    console.error(err);
  }
};

export default callSaleMerkle;
