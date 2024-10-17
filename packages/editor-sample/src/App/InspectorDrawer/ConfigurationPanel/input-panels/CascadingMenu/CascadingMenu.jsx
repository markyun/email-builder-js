import React from 'react';
import { Box, MenuItem, MenuList, Paper, Tabs, Tab } from '@mui/material';
import { withStyles } from '@mui/styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import styles from './CascadingMenu.styles';

const CustomTabPanel = (props) => {
  const { children, value, index, className = '', ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={className}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

const CustomMacrPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mac-tabpanel-${index}`}
      aria-labelledby={`mac-tab-${index}`}
      className="customMacrPanel"
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const a11yPropsSed = (index) => {
  return {
    id: `mac-tab-${index}`,
    'aria-controls': `mac-tabpanel-${index}`,
  };
};

class CascadingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuStates: [],
      tabsValue: 0,
      tabsMacrolistValue: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ tabsValue: newValue });
  };

  handleMacroListChange = (event, newValue) => {
    this.setState({ tabsMacrolistValue: newValue });
  };

  handleItemClick = (event, type, menuItem) => {
    event.stopPropagation();
    event.preventDefault();
    const hasSubMenu = !!(menuItem.subMenuItems && menuItem.subMenuItems.length);
    if (!hasSubMenu && type === 'Macro') {
      this.props.onClick(menuItem?.caption);
      this.props.onClose();
      return;
    }

    if (hasSubMenu) {
      // hide already open sub menus and open the requested sub menu
      // eslint-disable-next-line react/no-access-state-in-setstate
      const subMenuStates = [...this.state.subMenuStates];

      for (const subMenuState of subMenuStates) {
        if (subMenuState.key === menuItem.key) {
          subMenuState.anchorElement = event.target;
          subMenuState.open = !subMenuState.open;
        } else {
          subMenuState.open = false;
        }
      }

      this.setState({ subMenuStates });
    } else {
      this.closeAllMenus();
    }
    // menuItem.onClick();
  };

  handleTagItemClick = (event, type, menuItem) => {
    event.stopPropagation();
    event.preventDefault();
    const hasSubMenu = !!(menuItem.subMenuItems && menuItem.subMenuItems.length);

    // todo
    if (type === 'Profile') {
      if (!hasSubMenu) {
        this.props.onClick(`profiles.${menuItem?.labelName}`);
        this.props.onClose();
        return;
      }
    }

    if (type === 'Tag') {
      if (!hasSubMenu) {
        this.props.onClick(`tags.${menuItem?.labelName}`);
        this.props.onClose();
        return;
      }
    }


    // Tag;
    if (!hasSubMenu) {
      this.props.onClick(menuItem?.labelName);
      this.props.onClose();
      return;
    }

    if (hasSubMenu) {
      // hide already open sub menus and open the requested sub menu
      // eslint-disable-next-line react/no-access-state-in-setstate
      const subMenuStates = [...this.state.subMenuStates];

      for (const subMenuState of subMenuStates) {
        if (subMenuState.key === menuItem.key) {
          subMenuState.anchorElement = event.target;
          subMenuState.open = !subMenuState.open;
        } else {
          subMenuState.open = false;
        }
      }

      this.setState({ subMenuStates });
    } else {
      this.closeAllMenus();
    }
    // menuItem.onClick();
  };

  renderMenuItem = (menuItem) => {
    const { classes } = this.props;
    const { subMenuStates } = this.state;
    const hasSubMenu = !!(menuItem.subMenuItems && menuItem.subMenuItems.length);
    let subMenuState = subMenuStates.find((menuState) => menuState.key === menuItem.key);

    // initialize state for sub menu
    if (hasSubMenu && !subMenuState) {
      subMenuState = {
        key: menuItem.key,
        anchorElement: null,
        open: false,
      };

      subMenuStates.push(subMenuState);
    }

    return (
      <MenuItem onClick={(e) => this.handleItemClick(e, menuItem)} className={classes.menuItem} key={menuItem.key}>
        {!hasSubMenu && <div className={classes.caption}>{menuItem.caption}</div>}
        {hasSubMenu && (
          <div className={classes.caption}>
            {menuItem.caption} <KeyboardArrowRightIcon fontSize="small" />
          </div>
        )}
        {hasSubMenu && (
          <React.Fragment>
            <Paper className={`${classes.subMenu} ${subMenuState.open ? classes.subMenuOpen : ''}`}>
              <MenuList>{menuItem.subMenuItems.map((subMenuItem) => this.renderMenuItem(subMenuItem))}</MenuList>
            </Paper>
          </React.Fragment>
        )}
      </MenuItem>
    );
  };

  renderMacroTabs = () => {
    const { menuItems } = this.props;
    return menuItems.map((item, index) => {
      return <Tab label={item.caption} {...a11yPropsSed(index)} />;
    });
  };

  renderMacroItem = () => {
    const { menuItems } = this.props;
    const { tabsMacrolistValue } = this.state;
    return menuItems.map((item, index) => {
      const hasSubMenu = !!(item?.subMenuItems && item?.subMenuItems.length);
      if (hasSubMenu) {
        return (
          <>
            <CustomMacrPanel value={tabsMacrolistValue} index={index}>
              <div className="macrolist">
                {item.subMenuItems.map((subMenuItem) => {
                  return <p onClick={(e) => this.handleItemClick(e, 'Macro', subMenuItem)}>{subMenuItem.caption}</p>;
                })}
              </div>
            </CustomMacrPanel>
          </>
        );
      }
      return null;
    });
  };

  renderTabItem = (data) => {
    return data.map((subMenuItem) => {
      return <p onClick={(e) => this.handleTagItemClick(e, 'Tag', subMenuItem)}>{subMenuItem.labelName}</p>;
    });
  };

  renderProfileItem = (data) => {
    return data.map((subMenuItem) => {
      return <p onClick={(e) => this.handleTagItemClick(e, 'Profile', subMenuItem)}>{subMenuItem.labelName}</p>;
    });
  };

  closeAllMenus = () => {
    this.setState({ subMenuStates: [] });
    this.props.onClose();
  };

  render() {
    // no-unused-vars is disabled so that menuItems isn't passed to Menu
    // eslint-disable-next-line no-unused-vars
    const { tabsValue, tabsMacrolistValue } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { anchorElement, open, onClose, menuItems, tagItem, profileItem, classes, ...others } = this.props;

    return (
      <>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabsValue} onChange={this.handleChange} aria-label="basic tabs example">
              <Tab label="Macro" {...a11yProps(0)} />
              <Tab label="User Tag" {...a11yProps(1)} />
              <Tab label="User Profile" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabsValue} index={0}>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 324 }}>
              <Tabs
                value={tabsMacrolistValue}
                onChange={this.handleMacroListChange}
                orientation="vertical"
                // variant="scrollable"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                {this.renderMacroTabs()}
              </Tabs>
              {this.renderMacroItem()}
            </Box>
          </CustomTabPanel>
          <CustomTabPanel className="macrolist" value={tabsValue} index={1}>
            {this.renderTabItem(tagItem)}
          </CustomTabPanel>
          <CustomTabPanel className="macrolist" value={tabsValue} index={2}>
            {this.renderProfileItem(profileItem)}
          </CustomTabPanel>
        </Box>

        {/* <Menu
          {...others}
          anchorEl={anchorElement}
          elevation={2}
          classes={{
            paper: classes.rootmenu,
          }}
          open
          onClose={() => this.closeAllMenus()}
        >
          {menuItems.map((menuItem) => this.renderMenuItem(menuItem))}
        </Menu> */}
      </>
    );
  }
}

export default withStyles(styles)(CascadingMenu);
