import React from "react";
import "../footer/footer.scss";
import { Link } from "react-router-dom";
import tritterIc from "../../images/twitter.svg";
import facebookIc from "../../images/facebook.svg";
import redditIc from "../../images/reddit.svg";
import saveEarthLogo from "../../images/saveEarth-log.png";
import mapImg from "../../images/map.png";
import { Button, Tooltip } from "@mui/material";
import walletone from '../../images/walletOne.svg'

export default function footer() {
  const AddMetamask = async () => {
    try {
        await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x24FEA',
                    chainName: 'SEMChain',
                    nativeCurrency: {
                        name: 'SEM',
                        symbol: 'SEM',
                        decimals: 18,
                    },
                    rpcUrls: ['https://sem-live.appworkdemo.com/archive'],
                    blockExplorerUrls: ['https://scan.semchain.org/'],
                },
            ],
        });
    } catch (error) {
        console.error('Error adding network:', error);
    }

}
  return (
    // <div className='footer-main'>
    //   <p className='mb-0'>Copyright © 2024 SEMchain | All Rights Reserved.</p>
    //   <div>
    //     <ul className='d-flex mb-0'>
    //       <li>Terms and conditions</li>
    //       <li><Link to={"privacy-policy"}>Privacy policy</Link></li>
    //     </ul>
    //   </div>
    // </div>
    <>
      <div className="footer-wrapper">
        <div className="footer-container">
        
        <div className="footer-col-sec">
          <div className="footer-col">
            <img
              src={saveEarthLogo}
              alt="company logo"
              className="footer-logo"
            />
            <p className="common-text">
              SEM Scanner is a Block Explorer and Analytics Platform for SEM
              Scanner, a decentralized smart contracts platform.
            </p>
            <div className="footer-link-sec">
          <div className="social-link-sec">
          <Tooltip title="Twitter">
            <a href="#" className="social-link">
              <img src={tritterIc} alt="" />
            </a>
            </Tooltip>
            <Tooltip title="Facebook">
            <a href="#" className="social-link">
              <img src={facebookIc} alt="" />
            </a>
            </Tooltip>
            <Tooltip title="Reddit">
            <a href="#" className="social-link">
              <img src={redditIc} alt="" />
            </a>
            </Tooltip>
          </div>
        </div>
            
          </div>
          <div className="footer-col pl-50">
            <h6 className="footer-link-title">Company</h6>
            <ul className="footer-ul p-0">
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>About Us</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Brand Assets</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Contact Us</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Careers</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"privacy-policy"}>Terms & Privacy</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Bug Bounty</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h6 className="footer-link-title">Community</h6>
            <ul className="footer-ul p-0">
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>API Documentation</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Knowledge Base</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Network Status</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Newsletters</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h6 className="footer-link-title">Products & Services</h6>
            <ul className="footer-ul p-0">
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Advertise</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Explorer as a Service (EaaS)</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>API Plans</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Priority Support</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Blockscan</Link>
              </li>
              <li className="footer-li">
                <Link className="common-text  footer-link" to={"#"}>Blockscan Chat</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
          <div className="mic">
                            {/* <i className="mic-icon"></i> */}
                            {/* <p>Add SEMNetwork</p> */}
                            <Button className="metamask-btn" onClick={AddMetamask}><img src={walletone} alt="walletone" className='matamask-btn' />Add Polygon Network</Button>
                            {/* <div className="mic-shadow"></div> */}
                        </div>
          <img src={mapImg} alt="company logo" className="map-img" />
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
