import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type ProxyOwnerConfig = {
    ownerAddress: Address
    deployerAddress: Address
    royaltyAddress: Address
};

export type ProxyOwnerDeployBodyConfig = {
    saleContractAddress: Address
    nftAddress: Address
}

export function deployerConfigToCell(config: ProxyOwnerConfig): Cell {
    var dataCell = beginCell()
        .storeAddress(config.ownerAddress)
        .storeAddress(config.deployerAddress)
        .storeAddress(config.royaltyAddress)
        .endCell();

    return dataCell;
}

export class ProxyOwner implements Contract {

    constructor(readonly address: Address, readonly config: ProxyOwnerConfig, readonly init?: { code: Cell; data: Cell }) { }

    static createFromConfig(config: ProxyOwnerConfig, code: Cell, workchain = 0) {
        const data = deployerConfigToCell(config);
        const init = { code, data };
        return new ProxyOwner(contractAddress(workchain, init), config, init);
    }
        
    async sendCancel(provider: ContractProvider, via: Sender, value: bigint, nftAddress: Address) {
        const bodyCell = beginCell()
            .storeUint(0x00000003, 32) // op_code = po_cancel
            .storeUint(0, 64) // query_id
            .storeAddress(nftAddress)
            .endCell();

        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: bodyCell
        });
    }

}
