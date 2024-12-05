import Web3 from 'web3';
import { Typography, Box } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useLoading from '../../../hooks/loading';

import NotFound from '../../404/NotFound';
import Loading from '../../loading/Loading';

import { Transaction, TransactionReceipt } from "../../../services/web3";
import { findSignatures, findFunctionByMethod, getTransactionDetailed } from './tx.controller.';

import './tx.scss';

import Grid from '@mui/material/Grid';

const Tx: React.FC = () => {
    const { hash = "" } = useParams();

    const [loading, setLoading] = useLoading(false);
    const [inputFunction, setInputFunction] = useState('');
    const [transaction, setTransaction] = useState<{
        data: Transaction,
        receipt: TransactionReceipt
    } | null>(null);
    const [signatures, setSignatures] = useState<Array<{
        event: string,
        name: string
    }>>([]);

    useEffect(() => {
        const fetchTransaction = async () => {
            setLoading(true);

            await getTransactionDetailed(hash)
                .then(tx => {
                    setTransaction(tx);

                    const methodID = tx?.data?.input?.slice(0, 10);
                    if (!methodID) return;

                    findFunctionByMethod(methodID).then((methodName) => {
                        setInputFunction(methodName);
                    });
                })
                .catch(_ => { });

            setLoading(false);
        };
        fetchTransaction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    useEffect(() => {
        if (!transaction?.receipt) return;
        findSignatures(transaction.receipt).then(findedSignatures => {
            setSignatures(findedSignatures);
        });
    }, [transaction?.receipt])

    if (loading) return <Loading />
    if (
        !hash ||
        !transaction?.data ||
        !transaction.receipt
    ) return <NotFound message='Transaction Not Found' />

    return (
        <>
            <Box className="container-wrape">
                <Typography component="h6" className="title-text">
                    Transaction
                </Typography>

                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="card">
                            <div className="card__header">
                                <h3>Detail of Transation:</h3>
                            </div>
                            <div className="card__body">
                                <div className='tx-info'>
                                    <p><span className='theme-color'>Hash: </span>{transaction.data.hash}</p>
                                    <p><span className='theme-color'>Status: </span>{transaction.receipt.status.toString()}</p>
                                    <p><span className='theme-color'>Block: </span><Link to={`/block/${transaction.data.blockNumber}`}>{transaction.data.blockNumber}</Link></p>
                                    <p><span className='theme-color'>From: </span><Link to={`/address/${transaction.data.from}`}>{transaction.data.from}</Link></p>
                                    <p><span className='theme-color'>To: </span><Link to={`/address/${transaction.data.to}`}>{transaction.data.to}</Link></p>
                                    <p><span className='theme-color'>Value: </span>{Web3.utils.fromWei(transaction.data.value, 'ether')} SEM</p>
                                    <p><span className='theme-color'>Tx Fee: </span>{Web3.utils.fromWei((Number(transaction.receipt.gasUsed) * Number(transaction.data.gasPrice)).toString(), 'ether')} SEM</p>
                                    <p><span className='theme-color'>Gas Price: </span>{Web3.utils.fromWei(transaction.data.gasPrice, 'gwei')} Gwei</p>
                                    <p><span className='theme-color'>Gas Limit: </span>{transaction.data.gas}</p>
                                    <p><span className='theme-color'>Gas Used: </span>{transaction.receipt.gasUsed}</p>
                                    <p><span className='theme-color'>Nonce: </span>{transaction.data.nonce}</p>
                                    <p><span className='theme-color'>Input: </span>{transaction.data.input === '0x' ? 'Transfer' : inputFunction}</p>
                                </div>


                                <div className="tx-info-card">
                                    <p>{transaction.data.input}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {(transaction.receipt.logs.length || null) &&
                            <div className="card">
                                <div className="card__header">
                                    <h3>Logs: {transaction.receipt.logs.length}</h3>
                                </div>
                                <div className="card__body">
                                    <div className="">
                                        {transaction.receipt.logs.map((log, index) => {
                                            const signature = signatures.find(sig => sig.event === log.topics[0]);
                                            return (
                                                <div
                                                    className="card col-12"
                                                    key={index}
                                                >
                                                    <div className="card__body">
                                                        <div className='tx-info'>
                                                            <p><span className='theme-color'>Address:</span> <Link to={`/address/${log.address}`}>{log.address}</Link></p>
                                                            <p><span className='theme-color'>Log Index:</span> {log.logIndex}</p>
                                                            <p><span className='theme-color'>Topics:</span> {signature?.name}</p>
                                                            <p>
                                                                {log.topics.map((topic, topicIndex) => {
                                                                    return (
                                                                        <div className="tx-info-card" key={topicIndex}>
                                                                            [{topicIndex}] {topic}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div className='tx-info'>
                                                            <p>Data: </p>
                                                            <p>
                                                                <div className="tx-info-card">
                                                                    {log.data}
                                                                </div>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </Grid>
                </Grid>
            </Box>

            <div className="row">
                {(transaction.receipt.logs.length || null) &&
                    <div className="col-12">
                        <div className="card">
                            <div className="card__header">
                                <h3>Logs: {transaction.receipt.logs.length}</h3>
                            </div>
                            <div className="card__body">
                                <div className="">
                                    {transaction.receipt.logs.map((log, index) => {
                                        const signature = signatures.find(sig => sig.event === log.topics[0]);
                                        return (
                                            <div
                                                className="card col-12"
                                                key={index}
                                            >
                                                <div className="card__body">
                                                    <div className='tx-info'>
                                                        <p><span className='theme-color'>Address:</span> <Link to={`/address/${log.address}`}>{log.address}</Link></p>
                                                        <p><span className='theme-color'>Log Index:</span> {log.logIndex}</p>
                                                        <p><span className='theme-color'>Topics:</span> {signature?.name}</p>
                                                        <p>
                                                            {log.topics.map((topic, topicIndex) => {
                                                                return (
                                                                    <div className="tx-info-card" key={topicIndex}>
                                                                        [{topicIndex}] {topic}
                                                                    </div>
                                                                )
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className='tx-info'>
                                                        <p>Data: </p>
                                                        <p>
                                                            <div className="tx-info-card">
                                                                {log.data}
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Tx;