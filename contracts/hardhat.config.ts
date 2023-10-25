import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'http://localhost:8545',
      // the private key of signers, change it according to your ganache user
      accounts: [
        '0xfd9f1d1617351cf82956a87a7f75a45b682c794f401b15f80f8c34a2e0ca92f9',
        '0xf4b7f759b8d353caddebd705f26369408691684a064d7fd703ae57927f3f85ee',
        '0xacad0cc83fdb01e1baad6758611a644692ec700a51f5f7390d2ddc0bd50ba6c3'
      ]
    },
  },
};

export default config;
