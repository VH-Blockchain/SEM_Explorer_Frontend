// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Search from "./components/Search";
// import ThemesMenu from "../themes-menu/ThemesMenu";
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Finallogo from '../../images/Finallogo.png';
// import saveEarthLogo from '../../images/saveEarth-log.png';
// import InputLabel from '@mui/material/InputLabel';
// import Menu from '@mui/material/Menu';
// import { Button } from "@mui/material";
// import SearchIco from '../../images/search.svg'
// import MenuItem from "@mui/material/MenuItem";
// import "./header.scss";
// import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(localStorage.getItem("mytoken"));
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
//   const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
//   const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
//   const [anchorEl4, setAnchorEl4] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const open1 = Boolean(anchorEl1);
//   const open2 = Boolean(anchorEl2);
//   const open3 = Boolean(anchorEl3);
//   const open4 = Boolean(anchorEl4);
//   const handleClickDeveloper = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl4(event.currentTarget);
//   };

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl1(event.currentTarget);
//   };
//   const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl2(event.currentTarget);
//   };
//   const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl3(event.currentTarget);
//   };
//   const handleClick4 = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl4(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//     setAnchorEl1(null);
//     setAnchorEl2(null);
//     setAnchorEl3(null);
//     setAnchorEl4(null);
//   };
//   const signOut = () => {
//     localStorage.removeItem("mytoken");
//     setToken("");
//     setTimeout(() => {
//       window.location.href = "#/sign-in";
//     }, 600);
//   };

//   return (
//     <div className="header">
//       <div className="header__center">
//         <Link to={"/"}>
//           <div className="header__logo">
//             <img src={saveEarthLogo} alt="company logo" />
//           </div>
//         </Link>
//       </div>
//       {/* <div className="header-right-sec"> */}
//       <ul className="nav-links">

//         <li>
//           <Button
//             className="nav-items"
//             id="basic-button"
//             aria-controls={open ? "basic-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             onClick={() => navigate("/")}
//           >
//             Home
//           </Button>
//           {/* <Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             MenuListProps={{
//               "aria-labelledby": "basic-button",
//             }}
//           >
//             <MenuItem onClick={() => navigate("/AllTransactions")}>Transactions</MenuItem>
//             <MenuItem onClick={handleClose}>Pending Transactions</MenuItem>
//             <MenuItem onClick={() => navigate("/blocks")}>View Blocks</MenuItem>
//           </Menu> */}
//         </li>
//         <li>
//           <Button
//             className="nav-items"
//             id="basic-button"
//             aria-controls={open2 ? "basic-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open2 ? "true" : undefined}
//             onClick={() => navigate("/AllTransactions")}
//           >
//             Transactions
//           </Button>
//           {/* <Menu
//             id="basic-menu"
//             anchorEl={anchorEl2}
//             open={open2}
//             onClose={handleClose}
//             MenuListProps={{
//               "aria-labelledby": "basic-button",
//             }}
//           >
//             <MenuItem onClick={handleClose}>Top Tokens</MenuItem>
//             <MenuItem onClick={handleClose}>Tokens Transfers</MenuItem>
//           </Menu> */}
//         </li>
//         {/* <li>
//           <Button
//           className="nav-items"
//             id="basic-button"
//             aria-controls={open4 ? 'basic-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open4 ? 'true' : undefined}
//             onClick={handleClickDeveloper}
//           >
//             Developer <KeyboardArrowDownTwoToneIcon />
//           </Button>
//           <Menu
//             id="basic-menu"
//             anchorEl={anchorEl4}
//             open={open4}
//             onClose={handleClose}
//             MenuListProps={{
//               'aria-labelledby': 'basic-button',
//             }}
//           >
//             <MenuItem onClick={() => navigate('/plans')}>API Plans</MenuItem>
//             <MenuItem><a href="https://paritas-organization.gitbook.io/SEMfire/" target="_blank">
//               API Documentation
//             </a></MenuItem>
//           </Menu>
//         </li> */}

//         <li>
//           <Button className="nav-items" onClick={() => navigate("/Blocks")}>Blocks</Button>
//         </li>

//         {/* {!token ? ( */}
//         <li>
//           <Button className="nav-items" onClick={() => navigate("/sign-up")}>Accounts</Button>
//         </li>
//         {/* <li>
//           <Button className="nav-items" onClick={() => navigate("/faucet")}>NFTs</Button>
//         </li> */}
//         {/* ) : (
//           <>

//             <li>
//               <Button
//                 className="nav-items"
//                 id="basic-button"
//                 aria-controls={open4 ? "basic-menu" : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open4 ? "true" : undefined}
//                 onClick={handleClick4}
//               >
//                 Scan <KeyboardArrowDownTwoToneIcon />
//               </Button>
//               <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl4}
//                 open={open4}
//                 onClose={handleClose}
//                 MenuListProps={{
//                   "aria-labelledby": "basic-button",
//                 }}
//               >
//                 <MenuItem onClick={handleClose}>SEMTestnet</MenuItem>
//                 <MenuItem onClick={handleClose}>SEMMainnet</MenuItem>
//               </Menu>
//             </li>
//             <li>
//               <Button
//                 id="basic-button"
//                 aria-controls={open3 ? "basic-menu" : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open3 ? "true" : undefined}
//                 onClick={handleClick3}
//               >
//                 Profile <KeyboardArrowDownTwoToneIcon />
//               </Button>
//               <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl3}
//                 open={open3}
//                 onClose={handleClose}
//                 MenuListProps={{
//                   "aria-labelledby": "basic-button",
//                 }}
//               >
//                 <MenuItem onClick={() => navigate("/apiplans")}>
//                   My-Account
//                 </MenuItem>
//                 <MenuItem onClick={signOut}>Sign Out</MenuItem>
//               </Menu>
//             </li>
//           </>
//         )} */}
//       </ul>

//       <div className="header__right">
//         <div className="header__right-item">
//           <ThemesMenu />
//         </div>
//         <div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./components/Search";
import ThemesMenu from "../themes-menu/ThemesMenu";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Finallogo from "../../images/Finallogo.png";
import b4chainlogo from "../../images/b4chainlogo.png";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import SearchIco from "../../images/search.svg";
import MenuItem from "@mui/material/MenuItem";
import "./header.scss";
import saveEarthLogo from "../../images/SEM-Chain.png";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import { toggleClassOnMultiple } from "../common/commonFunction";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("mytoken"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const handleClickDeveloper = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClick4 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
  };
  const signOut = () => {
    localStorage.removeItem("mytoken");
    setToken("");
    setTimeout(() => {
      window.location.href = "#/sign-in";
    }, 600);
  };

  return (
    <div className="header">
      <div className="header__center">
        <Link to={"/"}>
          <div className="header__logo">
            <img src={saveEarthLogo} alt="company logo" />
            {/* <h1 className="header__logo-text">SEM <br></br> <span>Explorer</span></h1> */}
          </div>
        </Link>
      </div>
      {/* <div className="header-right-sec"> */}
      <ul
        className="nav-links"
        onClick={() => {
          toggleClassOnMultiple(["overlay-sec", "nav-links"], "");
        }}
      >
       
        <li className="position-relative sub-menu-li m-0">
        Blockchain<KeyboardArrowDownTwoToneIcon />
          <ul className="header-sub-ul">
            <li className="header-sub-li">
              <Link to={"txs"} className="header-sub-link">
              Transactions
              </Link>
            </li>
            <li className="header-sub-li">
              <Link to={"blocks"} className="header-sub-link">
              View Blocks
              </Link>
            </li>
          </ul>
        </li>
        
        <li className="position-relative sub-menu-li m-0">
        Tokens <KeyboardArrowDownTwoToneIcon />
          <ul className="header-sub-ul">
            <li className="header-sub-li">
              <Link to={"#"} className="header-sub-link">
              Top Tokens
              </Link>
            </li>
            <li className="header-sub-li">
              <Link to={"#"} className="header-sub-link">
              Tokens Transfers
              </Link>
            </li>
          </ul>
        </li>
        {/* <li>
          <Button
          className="nav-items"
            id="basic-button"
            aria-controls={open4 ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open4 ? 'true' : undefined}
            onClick={handleClickDeveloper}
          >
            Developer <KeyboardArrowDownTwoToneIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl4}
            open={open4}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => navigate('/plans')}>API Plans</MenuItem>
            <MenuItem><a href="https://paritas-organization.gitbook.io/sem/" target="_blank">
              API Documentation
            </a></MenuItem>
          </Menu>
        </li> */}

        <li>
          <Button className="nav-items" onClick={() => navigate("/faucet")}>
            Faucet
          </Button>
        </li>
        {/* <li>
          <Button
            className="nav-items"
            id="basic-button"
            aria-controls={open4 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open4 ? "true" : undefined}
            onClick={handleClick4}
          >
            Scan <KeyboardArrowDownTwoToneIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl4}
            open={open4}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>SEM Testnet</MenuItem>
            <MenuItem onClick={handleClose}>SEM Mainnet</MenuItem>
          </Menu>
        </li> */}
        {!token ? (
          <li>
            <Button className="nav-items" onClick={() => navigate("/sign-in")}>
              Sign In
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Button
                id="basic-button"
                aria-controls={open3 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open3 ? "true" : undefined}
                onClick={handleClick3}
              >
                Profile <KeyboardArrowDownTwoToneIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl3}
                open={open3}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => navigate("/apiplans")}>
                  My-Account
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </li>
          </>
        )}
        <li className="position-relative sub-menu-li m-0">
          Resources
          <ul className="header-sub-ul">
            <li className="header-sub-li">
              <Link to={"supply"} className="header-sub-link">
                Chart Supply State
              </Link>
            </li>
            <li className="header-sub-li">
              <Link to={"supply"} className="header-sub-link">
                SEM Scanner Daily Transactions State
              </Link>
            </li>
          </ul>
        </li>
        <li className="close-btn-li">
          <Button
            className="nav-items menu-close-btn"
            onClick={() =>
              toggleClassOnMultiple(["overlay-sec", "nav-links"], "active")
            }
          >
            <svg
              height="329pt"
              viewBox="0 0 329.26933 329"
              width="329pt"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
          </Button>
        </li>
      </ul>

      <div className="header__right">
        <Search />

        <div className="header__right-item">
          <ThemesMenu />
        </div>

        <div></div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
