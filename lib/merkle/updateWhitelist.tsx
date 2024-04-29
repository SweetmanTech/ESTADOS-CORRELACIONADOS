import { Address } from 'viem';
import { supabase } from '../supabase';
import { MerkleEntry } from '../types';
import { makeTree } from './merkle';
import callSaleMerkle from '../zora/callSaleMerkle';

const updateWhitelist = async (minter: Address) => {
  const { data: existingEntries } = (await supabase.from('entries').select()) as {
    data: any[];
  };
  // Check if the minter already exists in the entries
  let found = false;
  for (let entry of existingEntries) {
    if (entry.minter === minter) {
      entry.maxCount = (BigInt(entry.maxCount) + 1n).toString();
      found = true;
      break;
    }
  }

  // If minter is not found, add a new entry
  if (!found) {
    existingEntries.push({
      minter: minter,
      maxCount: 1n,
      price: 0n, // You might need to set an appropriate price or fetch it from somewhere
    });
  }
  const { root, entries } = makeTree(existingEntries as MerkleEntry[]);
  await supabase.from('root').upsert({ root, id: 1 });
  console.log('SWEETS entries', entries);
  const supabaseEntries = entries.map((entry: MerkleEntry) => ({
    proof: entry.proof,
    minter: entry.minter,
    maxCount: entry.maxCount.toString(),
    price: entry.price.toString(),
  }));
  await supabase.from('entries').upsert(supabaseEntries);
  await callSaleMerkle(root as Address);
};

export default updateWhitelist;
