import { Address } from 'viem';
import { supabase } from '../supabase';
import { MerkleEntry } from '../types';
import { makeTree } from './merkle';
import callSaleMerkle from '../zora/callSaleMerkle';

const updateWhitelist = async () => {
  const { data: existingEntries } = await supabase.from('entries').select();
  const { root, entries } = makeTree(existingEntries as MerkleEntry[]);
  await supabase.from('root').upsert({ root, id: 1 });
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
