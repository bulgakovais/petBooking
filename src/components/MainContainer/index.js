import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";
import { MainDescription } from "../MainDescription";
import { Search } from "../Search";

export const MainContainer = () => {
  const currentLocation = useLocation();
  const locationCheck = (location) => {
    if (location.pathname === "/" || location.pathname.includes("/search/")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    // <Box sx={{ paddingBottom: "60px" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        {locationCheck(currentLocation) ? <Search /> : <></>}

        {currentLocation.pathname === "/" ? <MainDescription /> : <></>}

        <Outlet />
      </div>
      <Paper
        sx={{
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          // position: "fixed",
          zIndex: 2,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction label="2022 Pet Booking" />
        </BottomNavigation>
      </Paper>
    </div>
    // </Box>
  );
};
