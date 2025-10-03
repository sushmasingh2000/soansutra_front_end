import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../../../assets/desklogo.png";

// 👇 Import the filtered data instead of all_Data
import { filtered_Data } from "../../mockdata/MockData";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openSlide, setOpenSlide] = useState(true);
  const [openCollapse, setOpenCollapse] = useState({});

  const handleCollapse = (navLink) => {
    setOpenCollapse((prevState) => ({
      ...prevState,
      [navLink]: !prevState[navLink],
    }));
  };

  const renderMenu = (navItem, level = 0) => {
    const hasChildren = navItem.subcomponent?.length > 0;
    const isOpen = openCollapse[navItem.id];

    return (
      <React.Fragment key={navItem.id}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              handleCollapse(navItem.id);
            } else if (navItem.navLink) {
              navigate(navItem.navLink);
            }
          }}
          className={classNames(
            "!rounded-lg !p-2",
            window.location.pathname === navItem.navLink && "!text-[#0561FC]"
          )}
          sx={{ pl: 2 + level * 2 }}
        >
          <ListItemIcon>{navItem.icon}</ListItemIcon>
          <ListItemText primary={navItem.label} />
          {hasChildren &&
            (isOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {navItem.subcomponent.map((child) => renderMenu(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <List
      className={`${openSlide ? "!min-w-[16vw] max-w-[20vw]" : "!w-auto"
        } shadow-md !h-screen !relative !overflow-y-auto !p-2 glass !bg-white !bg-opacity-50 example`}
    >
      <ListItem className="!py-3 !flex !justify-center">
        {openSlide ? (
          <img alt="logo" className="Capture !w-32" src={loginLogo} />
        ) : (
          <img alt="logo" className="Capture !w-14 py-8" src={loginLogo} />
        )}
      </ListItem>
      <Divider />

      {/* ✅ Use filtered_Data instead of all_Data */}
      {filtered_Data?.map((nav) => renderMenu(nav))}

      <Divider />

      {/* ✅ Explicit logout button at the end (if not already handled in data) */}
      {/* You can remove this if "logout" is already in filtered_Data */}
      <ListItemButton
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/");
        }}
      >
        <ListItemIcon><Logout /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
