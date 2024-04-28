import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import getVerifiedAddressBalanceOf from '@/lib/zora/getVerifiedAddressBalanceOf';
import getBallFrame from '@/lib/getBallFrame';
import getVerifiedAddressesFromBody from '@/lib/farcaster/getVerifiedAddressesFromBody';
import { Address, parseEther } from 'viem';
import { makeTree } from '@/lib/merkle/merkle';
import { MerkleEntry } from '@/lib/types';
import callSaleMerkle from '@/lib/zora/callSaleMerkle';
import { supabase } from '@/lib/supabase';


async function getResponse(req: NextRequest): Promise<NextResponse> {
  const { data: existingEntries } = await supabase
    .from('entries')
    .select()
  const {root, entries} = makeTree(existingEntries as MerkleEntry[])
  const rootResponse = await supabase
    .from('root')
    .upsert({ root, id: 1 })
  const supabaseEntries =  entries.map((entry: MerkleEntry) => ({proof: entry.proof, minter: entry.minter, maxCount: entry.maxCount.toString(), price: entry.price.toString() }))
  const entriesResponse = await supabase
    .from('entries')
    .upsert(supabaseEntries)

  const txResponse =  await callSaleMerkle(root as Address)
  const body: FrameRequest = await req.json();
  const verifiedAddresses = await getVerifiedAddressesFromBody(body)
  const balanceOf = await getVerifiedAddressBalanceOf(verifiedAddresses as Address[])
  const isCollector = balanceOf > 0n 

  return new NextResponse(
    getFrameHtmlResponse(getBallFrame(isCollector)),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
