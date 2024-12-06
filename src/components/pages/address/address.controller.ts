import Web3 from "web3";
import moment from "moment";
import {
  getCode,
  getBalance,
  getTransactionsCount,
  getLatestBlock,
  getAddress,
  checkContractVerified,
} from "../../../services/web3";
import { bscscanWaiter, accountTxlist } from "../../../services/bscscan";
import { getPrice } from "../../../services/binance";
import abi from "./abi.json";
import { ethers } from "ethers";
import Address from "./Address";

export const getNormalTransactions = async (page: number, address: string) => {
  const latestBlock = await getLatestBlock().catch((_) => {
    return { number: NaN };
  });
  return await bscscanWaiter(accountTxlist, {
    address: address,
    startblock: 0,
    endblock: latestBlock.number,
    offset: 1000,
    sort: "desc",
    page,
  }).then((quote) => {
    const { result } = quote;
    if (!Array.isArray(result)) return [];

    const txs = result.map((tx) => {
      return {
        error: !!Number(tx.isError),
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        age: moment(Number(tx.timeStamp) * 1000).fromNow(true),
        value: tx.value,
      };
    });

    return txs;
  });
};

export const getAddressInfo = async (address: string) => {
  const bnbPrice = await getPrice("BNB", "USDT").then((quote: any) =>
    Number(quote.price)
  );
  const semPrice =1;
  const contract = await getCode(address);

  const balance = await getBalance(address).then((bal: any) =>
    Web3.utils.fromWei(bal, "ether")
  );

  const balanceUsd = (Number(balance) * semPrice).toLocaleString();

  const txCount = await getTransactionsCount(address);
  let tokenName: any;
  let tokenSymbol: any;
  let totalSupply: any;
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://sem-live.appworkdemo.com/archive"
    );

    const contractTokenObject = new ethers.Contract(
      "0xe52306eE42fd827f662dDEb47785b89990F616D3",
      abi,
      provider
    );
    tokenName = await contractTokenObject.name();
    tokenSymbol = await contractTokenObject.symbol();
    const totals = await contractTokenObject.totalSupply();
    totalSupply = totals.toString();
  } catch (error) {
    tokenName = " ";
    tokenSymbol = " ";
    totalSupply = " ";
  }
  return {
    bnbPrice,
    contract,
    balance,
    balanceUsd,
    txCount,
    tokenName,
    tokenSymbol,
    totalSupply,
  };
};

export const getAddressDetails = async (
  address: string,
  pageNo: Number,
  limit: Number
): Promise<{ data: any }> => {
  const data = await getAddress(address, pageNo, limit);
  return { data: data };
};

export const isContractVerified = async (
  address: string,
  apiKey: string
): Promise<{}> => {
  const data = await checkContractVerified(address, apiKey);

  return { data: data };
};
