const ethers = require("ethers");

const node_endpoint = 'https://special-sleek-spree.discover.quiknode.pro/8c11c842c415569dfd76e03bb68b3863416f03fa/';
const contract_address = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // Tether USDT
const wallet_address = '0xcd5401762e50fdce31519558ec92279c766511a4'.toLowerCase();

const event_signature = ethers.utils.id('Transfer(address,address,uint256)');
const topic1 = ethers.utils.hexlify(ethers.utils.zeroPad(wallet_address, 32));
console.log(event_signature, topic1);

(async () => {

    const provider = new ethers.providers.JsonRpcProvider(node_endpoint);
    try {
      const filter = {
        fromBlock: "0xEA28F6",
        toBlock: "0xEA5005",
        address: contract_address,
        topics: [
            event_signature,
            // null,
            topic1
        ]
      }
      const filterId = await provider.send('eth_getLogs', [filter])
      console.log(filterId?.[0]);
      console.log('Number of transfers:', filterId.length)
    }
    catch(err) {
      console.log(err)
    }

})();

/*
Sample response

{
    blockNumber: 15484429,
    blockHash: '0x1b9b3f2fd3fa99ffc26f60b345aced48505a8e59f77c909ef4a58f59069024fc',
    transactionIndex: 9,
    removed: false,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    data: '0x0000000000000000000000000000000000000000000000000b4c1ab4b6ae23d3',
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x000000000000000000000000fb810e12c827e842af6019d5308949314395076f',
      '0x000000000000000000000000efb47fcfcad4f96c83d4ca676842fb03ef20a477'
    ],
    transactionHash: '0x4d4ceb987ffcc55318a2cb670a89bd989a982e9ff8a23523e8ed977eea4adee1',
    logIndex: 34
  },

*/