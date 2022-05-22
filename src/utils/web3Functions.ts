export const shortenAddress = (address: string) => `${address.slice(0, 5)}...${address.slice(-4)}`

export const chainIdToHexString = (chain_id: number) => `0x${chain_id.toString(16)}`
