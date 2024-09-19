import React from 'react';
import { Menu, MenuItem, MenuList, Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import styles from "./CascadingMenu.styles";

class CascadingMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMenuStates: []
    };
  }

  handleItemClick = (event, menuItem) => {
    event.stopPropagation();
    event.preventDefault();
    const hasSubMenu = !!(
      menuItem.subMenuItems && menuItem.subMenuItems.length
    );
    if (!hasSubMenu) {
      this.props.onClick(menuItem?.caption);
      this.props.onClose();
      return;
    }

    if (hasSubMenu) {
      // hide already open sub menus and open the requested sub menu
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
      return;
    } else {
      this.closeAllMenus();
    }
    // menuItem.onClick();

  };

  closeAllMenus() {
    this.setState({ subMenuStates: [] });
    this.props.onClose();
  }

  renderMenuItem = menuItem => {
    const { classes } = this.props;
    const { subMenuStates } = this.state;
    const hasSubMenu = !!(
      menuItem.subMenuItems && menuItem.subMenuItems.length
    );
    let subMenuState = subMenuStates.find(
      menuState => menuState.key === menuItem.key
    );

    // initialize state for sub menu
    if (hasSubMenu && !subMenuState) {
      subMenuState = {
        key: menuItem.key,
        anchorElement: null,
        open: false
      };

      subMenuStates.push(subMenuState);
    }

    return (
      <MenuItem
        onClick={e => this.handleItemClick(e, menuItem)}
        className={classes.menuItem}
        key={menuItem.key}
      >
        {!hasSubMenu && (<div className={classes.caption}>{menuItem.caption}</div>)}
        {hasSubMenu && (<div className={classes.caption}>{menuItem.caption} <KeyboardArrowRightIcon fontSize="small" /></div>)}
        {hasSubMenu && (
          <React.Fragment>

            <Paper
              className={`${classes.subMenu} ${
                subMenuState.open ? classes.subMenuOpen : ""
              }`}
            >
              <MenuList>
                {menuItem.subMenuItems.map(subMenuItem =>
                  this.renderMenuItem(subMenuItem)
                )}
              </MenuList>
            </Paper>
          </React.Fragment>
        )}
      </MenuItem>
    );
  };

  render() {
    // no-unused-vars is disabled so that menuItems isn't passed to Menu
    // eslint-disable-next-line no-unused-vars
    const {
      anchorElement,
      open,
      onClose,
      menuItems,
      classes,
      ...others
    } = this.props;

    return (
      <Menu
        {...others}
        anchorEl={anchorElement}
        elevation={2}
        classes={{
          paper: classes.rootmenu
        }}
        open={open}
        onClose={() => this.closeAllMenus()}
      >
        {menuItems.map(menuItem => this.renderMenuItem(menuItem))}
      </Menu>
    );
  }
}

export default withStyles(styles)(CascadingMenu);
