import { providers } from 'ethers';
import type { Filter, Log } from 'lib/interfaces';
import { getLogs } from 'lib/utils';
import type { EventGetter } from './EventGetter';

export class NodeEventGetter implements EventGetter {
  private providers: { [chainId: number]: providers.JsonRpcProvider };

  constructor(nodeUrls: { [chainId: number]: string }) {
    this.providers = Object.fromEntries(
      Object.entries(nodeUrls).map(([chainId, nodeUrl]) => [
        Number(chainId),
        new providers.JsonRpcProvider(nodeUrl as string),
      ])
    );
  }

  async getEvents(chainId: number, filter: Filter): Promise<Log[]> {
    const provider = this.providers[chainId];
    if (!provider) return [];
    return getLogs(provider, filter);
  }
}
