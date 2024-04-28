import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
  toNano,
} from '@ton/core';

export type DeployerConfig = {
  ownerAddress: Address;
  royaltyAddress: Address;
  proxyOwnerCode: Cell;
};

export type NftSaleInfo = {
  price: number;
  originalCreatorRoyaltyPercent: number;
  marketplaceRoyaltyPercent: number;
  marketplaceAddress: Address;
  marketplaceFeeAddress: Address;
};

export function deployerConfigToCell(config: DeployerConfig): Cell {
  var dataCell = beginCell()
    .storeAddress(config.ownerAddress)
    .storeAddress(config.royaltyAddress)
    .storeRef(config.proxyOwnerCode)
    .endCell();

  return dataCell;
}

export class Deployer implements Contract {
  readonly #fixedSaleContractCodeCell = Cell.fromBase64(
    'te6cckECCwEAArkAART/APSkE/S88sgLAQIBIAIDAgFIBAUAfvIw7UTQ0wDTH/pA+kD6QPoA1NMAMMABjh34AHAHyMsAFssfUATPFljPFgHPFgH6AszLAMntVOBfB4IA//7y8AICzQYHAFegOFnaiaGmAaY/9IH0gfSB9AGppgBgYaH0gfQB9IH0AGEEIIySsKAVgAKrAQH30A6GmBgLjYSS+CcH0gGHaiaGmAaY/9IH0gfSB9AGppgBgYOCmE44BgAEqYhOmPhW8Q4YBKGATpn8cIxbMbC3MbK2QV44LJOZlvKAVxFWAAyS+G8BJrpOEBFcCBFd0VYACRWdjYKdxjgthOjq+G6hhoaYPqGAD9gHAU4ADAgB92YIQO5rKAFJgoFIwvvLhwiTQ+kD6APpA+gAwU5KhIaFQh6EWoFKQcIAQyMsFUAPPFgH6AstqyXH7ACXCACXXScICsI4XUEVwgBDIywVQA88WAfoCy2rJcfsAECOSNDTiWnCAEMjLBVADzxYB+gLLaslx+wBwIIIQX8w9FIKAejy0ZSzjkIxMzk5U1LHBZJfCeBRUccF8uH0ghAFE42RFrry4fUD+kAwRlAQNFlwB8jLABbLH1AEzxZYzxYBzxYB+gLMywDJ7VTgMDcowAPjAijAAJw2NxA4R2UUQzBw8AXgCMACmFVEECQQI/AF4F8KhA/y8AkA1Dg5ghA7msoAGL7y4clTRscFUVLHBRWx8uHKcCCCEF/MPRQhgBDIywUozxYh+gLLassfFcs/J88WJ88WFMoAI/oCE8oAyYMG+wBxUGZFFQRwB8jLABbLH1AEzxZYzxYBzxYB+gLMywDJ7VQAlsjLHxPLPyPPFlADzxbKAIIJycOA+gLKAMlxgBjIywUmzxZw+gLLaszJgwb7AHFVUHAHyMsAFssfUATPFljPFgHPFgH6AszLAMntVNZeZYk='
  );

  constructor(
    readonly address: Address,
    readonly config: DeployerConfig,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromConfig(config: DeployerConfig, code: Cell, workchain = 0) {
    const data = deployerConfigToCell(config);
    const init = { code, data };

    return new Deployer(contractAddress(workchain, init), config, init);
  }

  async sendNftOnSale(
    provider: ContractProvider,
    via: Sender,
    value: bigint,
    nftSaleInfo: NftSaleInfo
  ) {
    const royaltyFeesCell = beginCell()
      .storeAddress(nftSaleInfo.marketplaceAddress)
      .storeAddress(nftSaleInfo.marketplaceFeeAddress)
      .storeCoins(toNano(nftSaleInfo.price * nftSaleInfo.marketplaceRoyaltyPercent)) // marketplace_royalty
      .storeCoins(toNano(nftSaleInfo.price * nftSaleInfo.originalCreatorRoyaltyPercent)) // creator_royalty
      .endCell();

    const bodyCell = beginCell()
      .storeUint(0x5fcc3d14, 32) // op_code = NFT transfer OP
      .storeUint(0, 64) // query_id
      .storeAddress(this.address) // new_owner
      .storeAddress(via.address) // recipient_address
      .storeUint(0, 1) // custom_payload
      .storeCoins(toNano(value)) // forward_amout
      .storeUint(0x0fe0ede, 32) // op_code = do_sale
      .storeRef(this.#fixedSaleContractCodeCell)
      .storeUint(Math.floor(Date.now() / 1000), 32) // created_at
      .storeRef(royaltyFeesCell)
      .storeCoins(toNano(nftSaleInfo.price)) // full_price
      .endCell();

    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: bodyCell,
    });
  }
}
