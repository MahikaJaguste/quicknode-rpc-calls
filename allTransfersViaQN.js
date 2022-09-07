const ethers = require("ethers");

const node_endpoint = 'https://special-sleek-spree.discover.quiknode.pro/8c11c842c415569dfd76e03bb68b3863416f03fa/';
const contract_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Tether USDT
const wallet_address = '0xCd5401762e50FdcE31519558ec92279c766511A4';

(async () => {
    const provider = new ethers.providers.JsonRpcProvider(node_endpoint);
    provider.connection.headers = { "x-qn-api-version": 1 };

    const heads = await provider.send("qn_getWalletTokenTransactions", {
        address: wallet_address,
        contract: contract_address,
        page: 1,
        perPage: 10,
    });

    console.log(heads);
    console.log('Number of transactions:', heads.totalItems); //38
})();

/*
Sample response
{
      amount: '750000000',
      blockNumber: '15283319',
      date: '2022-08-05T16:11:02.000Z',
      from: '0xCd5401762e50FdcE31519558ec92279c766511A4',
      to: '0x04A153937aa9398D5c3071037FC599c8D6BbbF67',
      logIndex: 28,
      txHash: '0x0291ae8208d28c9a29a30d367109cadae3085fdeb8cf49d27b91148dfaa6d89b',
      valueSent: '0'
}
*/