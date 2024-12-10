
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
//             <MenuItem onClick={() => navigate("/Blocks")}>View Blocks</MenuItem>
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
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Finallogo from '../../images/Finallogo.png';
import b4chainlogo from '../../images/b4chainlogo.png';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import { Button } from "@mui/material";
import SearchIco from '../../images/search.svg'
import MenuItem from "@mui/material/MenuItem";
import "./header.scss";
import saveEarthLogo from '../../images/saveEarth-log.png';
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";

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
      <ul className="nav-links">

        <li>
          <Button
            className="nav-items"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Blockchain <KeyboardArrowDownTwoToneIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/AllTransactions")}>Transactions</MenuItem>
            {/* <MenuItem onClick={handleClose}>Pending Transactions</MenuItem> */}
            <MenuItem onClick={() => navigate("/Blocks")}>View Blocks</MenuItem>
          </Menu>
        </li>
        <li>
          <Button
            className="nav-items"
            id="basic-button"
            aria-controls={open2 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? "true" : undefined}
            onClick={handleClick2}
          >
            Tokens <KeyboardArrowDownTwoToneIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Top Tokens</MenuItem>
            <MenuItem onClick={handleClose}>Tokens Transfers</MenuItem>
          </Menu>
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
            <MenuItem><a href="https://paritas-organization.gitbook.io/b4fire/" target="_blank">
              API Documentation
            </a></MenuItem>
          </Menu>
        </li> */}

        <li>
          <Button className="nav-items" onClick={() => navigate("/faucet")}>Faucet</Button>
        </li>

        {!token ? (
          <li>
            <Button className="nav-items" onClick={() => navigate("/sign-in")}>Sign In</Button>
          </li>
        ) : (
          <>

            <li>
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
                <MenuItem onClick={handleClose}>B4Fire Testnet</MenuItem>
                <MenuItem onClick={handleClose}>B4Fire Mainnet</MenuItem>
              </Menu>
            </li>
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
      </ul>

      <div className="header__right">
        <Search />

        <div className="header__right-item">
          <ThemesMenu />
        </div>

        <div>

        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
