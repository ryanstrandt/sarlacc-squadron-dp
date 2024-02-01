import React from 'react';
import { NavLink } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

// function useRouteMatch(patterns) {
//   const { pathname } = useLocation();

//   for (let i = 0; i < patterns.length; i += 1) {
//     const pattern = patterns[i];
//     const possibleMatch = matchPath(pattern, pathname);
//     if (possibleMatch !== null) {
//       return possibleMatch;
//     }
//   }

//   return null;
// }

const MainNavigation = () => {
  // const routeMatch = useRouteMatch(['/characters', '/functions', '/trash']);
  // const currentTab = routeMatch?.pattern?.path;
  const [value, setValue] = React.useState(0);
  // const ref = React.useRef(null);
  // const [messages, setMessages] = React.useState(() => refreshMessages());
  const LinkBehavior = React.forwardRef((props, ref) => (
    <NavLink ref={ref} to={props.to} {...props} />
  ));
  

  return (
  
    <nav className="MainNavigation">
      {/* <NavLink activeClassName="active" to="/characters">
        Character
      </NavLink>
      <NavLink activeClassName="active" to="/functions">
        Datapad Functions
      </NavLink> */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={LinkBehavior} label="Recents" icon={<RestoreIcon />} to="/characters" />
          <BottomNavigationAction component={LinkBehavior} label="Jobs" icon={<img src="/Wallet.png" alt="wallet" width="25%" />
} to="/functions" />
          <BottomNavigationAction component={LinkBehavior} label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>

      {/* <Tabs value={currentTab}>
        <Tab label="Inbox" value="/characters" to="/characters" component={Link} />
        <Tab label="Drafts" value="/functions" to="/functions" component={Link} />
        <Tab label="Trash" value="/trash" to="/trash" component={Link} />
      </Tabs> */}

    </nav>
  );
};

export default MainNavigation;
