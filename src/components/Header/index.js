import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUserAction } from "../../store/userAuth/actions";
import { getIsAuth } from "../../store/userAuth/selectors";
import { selectAvatar } from "../../store/account/selector";
import "../../css/style.css";
import logo2 from "../../img/logo.svg";
import avatar2 from "../../assets/images/avatar.jpg";
import { API_URL } from "../../store/storeConstants";
import { Logout, Person, Settings } from "@mui/icons-material";
import { useState } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlerClose = () => {
    setAnchorEl(null);
  };

  function logOutHandler() {
    dispatch(logOutUserAction);
  }
  const authed = useSelector(getIsAuth);
  const avatar = useSelector(selectAvatar);

  const baseURL = API_URL.slice(0, -6);

  return (
    <header>
      <nav className="navbar container">
        <a href="/">
          <img className="navbar-logo" src={logo2} alt="logo" />
        </a>
        {authed ? (
          <>
            <Tooltip title="account">
              <IconButton
                onClick={handlerClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {avatar ? (
                  <Avatar
                    src={
                      avatar.includes("storage/") ? baseURL + avatar : avatar
                    }
                  ></Avatar>
                ) : (
                  <Avatar src={avatar2}></Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              className="accountMenu"
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handlerClose}
              onClick={handlerClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: "5px",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {location.pathname !== "/account" ? (
                <Link
                  to="/account"
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    Мой аккаунт
                  </MenuItem>
                </Link>
              ) : (
                ""
              )}
              {location.pathname !== "/settings" ? (
                <Link
                  to="/settings"
                  style={{ textDecoration: "none", color: "orange" }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" className="header_icon" />
                    </ListItemIcon>
                    Настройки
                  </MenuItem>
                </Link>
              ) : (
                ""
              )}
              <MenuItem sx={{ color: "orange" }} onClick={logOutHandler}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Выйти
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="/login" className="nav-btn">
            Войти
          </Link>
        )}
      </nav>
    </header>

    // <div className="navbar container">
    //     <div><Link style={{ textDecoration: 'none' }} to='/'><img src={logo} className="navbar-logo" alt="logo" /></Link></div>
    //     <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center' }}>
    //         {
    //             authed ? <Link to="/" style={{ textDecoration: 'none' }}><Button className="nav-btn" onClick={logOutHandler}>Выйти</Button></Link> : <Link to="/login" style={{ textDecoration: 'none' }} ><Button>Войти</Button></Link>
    //         }
    //      </Box>
    //  </div>
  );
};

//  <AppBar position="static" sx={{ backgroundColor: 'white', p: 2 }}>
//             <div className="container">
//                 <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }} >

//                     <Box><Link style={{ textDecoration: 'none' }} to='/'><img src={logo} alt="logo" /></Link></Box>
//                     <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center' }}>
//                         {
//                             authed ? <Link to="/" style={{ textDecoration: 'none' }}><Button onClick={logOutHandler}>Выйти</Button></Link> : <Link to="/login" style={{ textDecoration: 'none' }} ><Button>Войти</Button></Link>
//                         }
//                     </Box>
//                 </Toolbar>
//             </div>
//         </AppBar>
//          <header>
//             <nav class="navbar container">
//                 <a href="#"><img class="navbar-logo" src="../img/logo.svg" alt="picture"></img></a>
//                 <button class="nav-btn">Войти</button>
//             </nav>
//         </header>
