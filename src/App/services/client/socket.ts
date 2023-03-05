import { WebsocketClient } from "@cosmjs/tendermint-rpc";

export function waitingIbcTransfer(rpc: string, query: string, id: string) {
  const wsUrl = rpc.replace('http', 'ws')
  const client = new WebsocketClient(wsUrl)

  const stream = client.listen({
    jsonrpc: "2.0",
    id: "ibcnft-"+id,
    method: "subscribe",
    params: {
      query,
    },
  });

  return new Promise((resolve, reject) => {
    const sub = stream.subscribe({
      next: (tx) => {
        sub.unsubscribe()
        client.disconnect()
        resolve(tx)
      },
      complete: () => {},
      error: (err) => {
        console.log("error", err)
        reject(err)
      }
    });
  });
}
