export let footerStyles = {
  position: "fixed",
  bottom: 0,
  height: "70px",

  borderTop: "2px solid black",
  right: "50px",
  left: "50px",
};
export let copyRightTextContainerStyles = {
  width: "100%",
  textAlign: "center",
  height: "100%",
  display: "grid",
  alignItems: "center",
};

export let navbarAuthBtnContainerStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  columnGap: "20px",
  alignItems: "center",
};

export let muiDividerOverRideStyles = {
  "&.MuiDivider-root": {
    "&::before": {
      borderTop: `1px solid whitesmoke`,
    },
    "&::after": {
      borderTop: `1px solid whitesmoke`,
    },
  },
  mt: "30px",
};

export let muiDividerOverRideBlueStyles = {
  "&.MuiDivider-root": {
    "&::before": {
      borderTop: `1px solid whitesmoke`,
    },
    "&::after": {
      borderTop: `1px solid #2a74ff`,
    },
  },
  mt: "30px",
};

export let footerFlexStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  rowGap: "20px",
};
