import Web3 from "web3";
import axios from "axios";
import FormData from "form-data";

export const RPC_ENDPOINT = "https://sem-live.appworkdemo.com/archive";
const web3 = new Web3(RPC_ENDPOINT);

export const getLatestBlock = async () => web3.eth.getBlock("latest", true);

export const getBlock = async (blockNumber: string | number) =>
  web3.eth.getBlock(blockNumber, true);

export const getTransaction = async (hash: string) =>
  isTransactionHash(hash) ? web3.eth.getTransaction(hash) : null;

export const getTransactionReceipt = async (hash: string) =>
  isTransactionHash(hash) ? web3.eth.getTransactionReceipt(hash) : null;

export const getCode = async (address: string) => web3.eth.getCode(address);

export const getBalance = async (address: string) =>
  web3.eth.getBalance(address);

export const getTransactionsCount = async (address: string) =>
  web3.eth.getTransactionCount(address);
//Web3.js use "declare types".
//This is my decision on how to get the type.
export type BlockTransactionsObject = Awaited<
  ReturnType<typeof getLatestBlock>
>;

export type Transaction = Awaited<ReturnType<typeof getTransaction>>;

export type TransactionReceipt = Awaited<
  ReturnType<typeof getTransactionReceipt>
>;

export const calculateGas = (block: BlockTransactionsObject) => {
  const minGasPrice = 5; //can't be less than 5.
  let minerReward = 0;
  let maxGasPrice = 0;
  let gasPriceSum = 0;
  let transactionsHandled = 0;
  for (const transaction of block.transactions) {
    const gasPrice = Number(Web3.utils.fromWei(transaction.gasPrice, "gwei"));
    if (gasPrice < 5) continue;
    if (gasPrice > maxGasPrice) maxGasPrice = gasPrice;

    minerReward += transaction.gas * gasPrice;
    gasPriceSum += gasPrice;
    transactionsHandled++;
  }
  const avarageGasPrice = Number(
    (gasPriceSum / transactionsHandled).toFixed(2)
  );
  maxGasPrice = Number(maxGasPrice.toFixed(2));

  return {
    min: minGasPrice,
    max: maxGasPrice,
    avg: avarageGasPrice,
    reward: minerReward,
  };
};

export const timestampToMinutes = (block: BlockTransactionsObject) => {
  const time = new Date(Number(block.timestamp) * 1000);
  const hours = time.getHours();
  const minutes = "0" + time.getMinutes();
  const seconds = "0" + time.getSeconds();

  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
};

export const isTransactionHash = (hash: string) =>
  /^0x[a-fA-F0-9]{64}/.test(hash);

export const getAddress = async (
  address: string,
  pageNo: Number,
  limit: Number
) => {
  // const apiCall = await axios.get(`http://192.168.1.20:3009/internal/${address}?page=${pageNo}&limit=${limit}`).then((res)=>{
  //     return res.data.data
  // });
  const apiCall = await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/internal/address/${address}?page=${pageNo}&limit=${limit}`
    )
    .then((res) => {
      return res.data.data;
    });
  return apiCall;
};

export const checkContractVerified = async (
  address: string,
  apiKey: string
) => {
  let data = new FormData();
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${
      process.env.REACT_APP_BASE_URL
    }apiauth/getVerifiedContract?apikey=${"7bf546e4-c912-4d84-9fdd-5094cdbc2bbb"}&address=${address}`,
    data: data,
  };

  const res = await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data), "response verify Contracts");
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return res;
};
