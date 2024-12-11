import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./pages/home/Home";
import Tx from "./pages/tx/Tx";
import Block from "./pages/block/Block";
import NotFound from "./404/NotFound";
import AddressComp from "./pages/address/Address";
import Verify from "../components/header/components/Verify";
import Publish from "./header/components/Publish";
import MultiplePublish from "./header/components/MultiplePublish";
import JsonVerify from "./header/components/JsonVerify";
import VyperVerify from "./header/components/VyperVerify";
import Indexer from "../components/readwrite/Indexer";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/SignUp";
import Plans from "./pages/signup/Plans";
import AllTransactions from "./headerPages/Transaction/AllTransactions";
import Blocks from "./headerPages/Blocks/Blocks";
import APIPlans from "./Developer/APIPlans";
import PaymentGateWay from "./Developer/PaymentGateWay";
import ComingSoon from "./header/ComingSoon";
import Faucet from "./headerPages/Faucet/Faucet";
import Privacypolicy from "./pages/privacyPolicy/Privacypolicy";
import Supply from "./pages/supply/Supply";

const Pages = () => {
    return (
        <Routes>
           
            <Route path="/readwrite" element={<Indexer/>} />
            <Route path="/address/:address" element={ <AddressComp />} />
            <Route path="/tx/:hash" element={ <Home />} />
            <Route path="/block/:blockNumber" element={ <Block />} />
            <Route path="/verify" element={ <Verify />} />
            <Route path="/pubilsh" element={ <Publish />} />
            <Route path="/multiple-file" element={ <MultiplePublish />} />
            <Route path="/standardjsoninput" element={ <JsonVerify />} />
            <Route path="/vyper" element={ <VyperVerify />} />
            <Route path="/sign-in" element={ <Login />} />
            <Route path="/sign-up" element={ <Signup />} />
            <Route path="/apiplans" element={ <Plans />} />
            <Route path="/txs" element={ <AllTransactions />} />
            <Route path="/blocks" element={ <Blocks />} />
           
            <Route path="/plans" element={<APIPlans/>} />
            <Route path="/payment" element={<PaymentGateWay/>} />
            <Route path="/comingsoon" element={<ComingSoon/>} />
            <Route path="/faucet" element={<Faucet/>}/>
            <Route path="/privacy-policy" element={<Privacypolicy/>}/>
            <Route path="/supply" element={<Supply/>}/>
            <Route path="/" element={ <Home />} />
            <Route path={`/*`} element={ <NotFound message='Something went wrong' /> } />
        </Routes>
    )
};

export default Pages;