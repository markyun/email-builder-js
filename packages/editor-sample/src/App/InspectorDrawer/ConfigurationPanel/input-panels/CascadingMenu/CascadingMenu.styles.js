const styles = theme => ({
  rootMenu: {
    overflow: "visible"
  },
  menuItem: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    overflow: "visible",
    position: "relative",
    "& a": {
      color: '#000'
    }
  },
  caption: {
    alignItems: "center",
    display: "flex"
  },
  arrowIcon: {
    paddingLeft: 24
  },
  subMenu: {
    opacity: "0",
    position: "absolute",
    right: "100%",
    transform: "scale(0.75, 0.5625)",
    transformOrigin: "top right",
    // transition: `opacity ${theme.transitions.duration.standard}ms ${
    //   theme.transitions.easing.easeInOut
    // } 0ms, transform ${theme.transitions.duration.shorter}ms ${
    //   theme.transitions.easing.easeInOut
    // } 0ms`,
    // match Menu transition
    top: "-8px",
    visibility: "hidden"
  },
  subMenuOpen: {
    transform: "scale(1, 1) translateZ(0px)",
    visibility: "visible",
    opacity: "1"
  }
});

export default styles;
