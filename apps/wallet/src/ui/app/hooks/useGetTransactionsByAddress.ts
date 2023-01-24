// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    normalizeSuiAddress,
    type SuiAddress,
    type SuiTransactionResponse,
} from '@mysten/sui.js';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { api } from '_redux/store/thunk-extras';
const STALE_TIME = 1000 * 1;

async function getTransactionsByAddress(
    address: string,
    cursor?: string
): Promise<SuiTransactionResponse[]> {
    const rpc = api.instance.fullNode;
    const txnsIds = await api.instance.fullNode.getTransactions(
        {
            FromAddress: address,
        },
        cursor
    );
    return rpc.getTransactionWithEffectsBatch(txnsIds.data);
}

// Fetch transactions on mount and every 2 seconds
export function useGetTransactionsByAddress(
    address: SuiAddress
): UseQueryResult<SuiTransactionResponse[], unknown> {
    const normalizedAddress = normalizeSuiAddress(address);
    return useQuery(
        ['transactions-by-address', normalizedAddress],
        () => getTransactionsByAddress(normalizedAddress),
        {
            enabled: !!address,
            refetchOnMount: true,
            staleTime: STALE_TIME,
        }
    );
}
