import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Business, People } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem component={Link} to="/leads" sx={{ cursor: "pointer" }}>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Leads" />
        </ListItem>
        <ListItem component={Link} to="/properties" sx={{ cursor: "pointer" }}>
          <ListItemIcon><Business /></ListItemIcon>
          <ListItemText primary="Properties" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
