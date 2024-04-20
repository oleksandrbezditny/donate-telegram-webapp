import { TonClient4, Sender, OpenedContract, Address, Cell, toNano } from '@ton/ton';
import { getHttpEndpoint, Network } from "@orbs-network/ton-access";
import { Deployer, DeployerConfig, NftSaleInfo } from "./wrappers/Deployer";
import { ProxyOwner } from "./wrappers/ProxyOwner";

export type ContractProviderConfig = {
    sender: Sender
    collectionAddress: Address
    collectionRoyaltyAddress: Address
    deployerConfig: DeployerConfig
}

export class AppContractProvider {

    readonly sender: Sender;
    readonly collectionAddress: Address;

    get proxyOwnerAddress() {
        return this.#proxyOwnerContract.address;
    }
    
    readonly #client: TonClient4;
    readonly #deployerContract: OpenedContract<Deployer>;
    readonly #proxyOwnerContract: OpenedContract<ProxyOwner>;

    constructor(client: TonClient4, sender: Sender, collectionAddress: Address, deployer: Deployer, proxyOwner: ProxyOwner) {
        this.sender = sender;
        this.collectionAddress = collectionAddress;
        this.#client = client;
        this.#deployerContract = client.open(deployer);
        this.#proxyOwnerContract = client.open(proxyOwner);
    }

    static async createFromConfig(network: Network, config: ContractProviderConfig) {
        const client = new TonClient4({ endpoint: await getHttpEndpoint({ network }) });

        const deployer = Deployer.createFromConfig(
            config.deployerConfig,
            Cell.fromBase64("te6cckECEQEAAp4AART/APSkE/S88sgLAQIC0AIOAgEgAw0CASAEDAPPCDHAJJfBOAB0NMDAXGwkl8E4PpAMAHTHyHAAZJfBeDtRND6QPpA1CDXScIAnn8B+gDU0z8wEDYQNRA0lzBwVSBtbW3ighAFE42RUpC64wI6OoBvUnC64wKBAwkXuuMCXwmCAP//8vCAFCQoB9lszNYEBj1AD8vQC0z/6QNMfgQGQggj+Dt4TvRLy8tTTH9QB0AH6ADAB+kD6QPoA+gAwVQOBAZRSHL4b8vRTaPAFG/ABIPACyFAEzxZY+gJQCM8WUAn6AslwVEpQVEqq8AYU8AEg8ALIIc8WJ88WyXTIyx9SQMs/zMlGQAYC/HeAGMjLBVAEzxaCCTEtAPoCE8trzMzJcfsAccjLH1IQyz/JVEJVd4AYyMsFUATPFoIJMS0A+gITy2vMzMlx+wBwIIIQX8w9FCGAGMjLBVAIzxYi+gIXy2oWyx8Uyz8BzxYBzxYSygAh+gLKAMlZoSCCCJiWgLmUgScQoOMNcAcIAAwwggiYloAADPsCgwb7AABcMDM0NTWBAZFSRMcFE/L0AfoA1NM/MBBFEDTIUAbPFlAEzxYSzAH6AszLP8ntVAHYgQGPUATy9APTP/pAMFME8AVSQPAB8AKBAZJQiMcFF/L0J9D0BHB3+BFQA4MH9GrIKc8WzFAIzxbLP8lxcIAYyMsFCfpAMBnPFij6AhjLahfLH8s/UmDLP4IJMS0A+gIVzMmAQPsABKQQNRQTCwAoyFAGzxZQBM8WEswB+gLMyz/J7VQAGxwIMjLARP0APQAywDJgABtPkAcHTIywLKB8v/ydCAIBIA8QABlchYzxb4KM8WAc8WyYADNHAHyMoAFssfUATPFljPFgHPFgH6AszKAMmNAc2oM=")
        );
        const proxyOwner = ProxyOwner.createFromConfig({
            ownerAddress: config.sender.address!,
            deployerAddress: deployer.address,
            royaltyAddress: config.collectionRoyaltyAddress
        },
            Cell.fromBase64("te6cckECCgEAAnEAART/APSkE/S88sgLAQIBYgIJBODQ7aLt+wHQ0wMBcbCSXwTg+kAw7UTQ+kD6QPpAINdJwgCdfwH0BPQEMBAlECQQI5YwcFUgbW3icFMIxwDAAJUxCNMfCd4hwwCWMAjTP1CZ3gezdFIgurHjAnNSELrjAjgm+QEibsAAkjk54w0obsAAAwQFBwDEMDU3N4EBk1IVxwUU8vQkbpM0bQTeIW6TMW0B3gPUMND6QPpAMCH5ASH5AchQBM8WUjDL/8nQVCAIgwf0NjDIWM8WFsv/ydACgwf0NjBEMMhQBc8WUAPPFgHPFvQA9ADJ7VQAWF8FNDSBAZEDxwUS8vT6QDABc3CAGMjLBVAEzxYj+gITy2oSyx/LP8mAQPsAATxSA4MH9GZvoY6O+kDT/zBSkscF4wIwOTmTMDk54gcGAP4zNjY2UFSDB/RbMFNloSCCCTEtALmWMIIJMS0A3nD7AoIJycOAUmC8jiZTFHCBAwkhgBDIywVQBM8WggnJw4D6AhPLahLLH8s/Ac8WyXH7AN5UQ2dbcIAQyMsFWM8WIfoCy2rJgwb7AFUCyFAFzxZQA88WAc8W9AD0AMntVNsxAf6OeVB4gwf0Zm+hjmv6QNP/MFFhxwUHghDVMnbbuhewjlNQR4MH9FswVCRDcCCCEF/MPRQhgBjIywVQB88WIvoCFstqFcsfEss/Is8WWM8WEsoAIfoCygDJgED7AEQDAshQBc8WUAPPFgHPFvQA9ADJ7VTbMeBfCJJfCeKSXwniCAAMggD///LwAFGhms3aiaH0gfSB9IBBrpOEATr+A+gJ6AhgIEogSCBHLGDgqkDa28TYK2qWpKE=")
        );

        return new AppContractProvider(client, config.sender, config.collectionAddress, deployer, proxyOwner);
    }

    async sendNftOnSale(nftSaleInfo: NftSaleInfo) {
        if (!this.isContractDeployed(this.#deployerContract.address)) {
            console.error("[ERROR] Deployer contract not deployed for the current collection");
            return;
        }

        await this.#deployerContract.sendNftOnSale(this.sender, toNano("1.0"), nftSaleInfo);
    }

    async sendNftSaleCancel(nftAddress: Address) {
        if (!this.isContractDeployed(this.#proxyOwnerContract.address)) {
            console.error("[ERROR] Proxy owner contract not deployed");
            return;
        }

        await this.#proxyOwnerContract.sendCancel(this.sender, toNano("1.0"), nftAddress);
    }

    async proxyOwnerContractIsDeployed() {
        await this.isContractDeployed(this.#proxyOwnerContract.address);
    }

    private async isContractDeployed(address: Address) {
        await this.#client.isContractDeployed((await this.#client.getLastBlock()).last.seqno, address);
    }

}