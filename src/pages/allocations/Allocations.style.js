import styled from "@emotion/styled";

export const ContainerApp = styled.div({
  with: "100%",
  height: "100%",
  display: "flex",
});

export const Content = styled.div({
  background: "rgb(232 237 247)",
  width: "100vw",
  height: "100vh",
  paddingLeft: "45px",
  paddingRight: "45px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  marginLeft: "75px",
});

export const Title = styled.div({
  display: "flex",
  alignItems: "center",
  color: "rgba(0,87,141,255)",
  fontFamily: "Public Sans",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  position: "fixed",
  width: "100%",
  height: "100px",
  marginBottom: "20px",
});

export const Filters = styled.div({
  width: "100%",
  height: "85px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  paddingTop: "110px",
  gap: "20px",
});

export const CentralContent = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  justifyContent: "flex-start",
});

export const NavSideBar = styled.nav({
  width: "75px",
  height: "100%",
  backgroundColor: "white",
  padding: "40px 0 40px 0px",
  position: "fixed",
  zIndex: "4",
  top: "0",
  left: "0",
  overflow: "hidden",
  boxShadow: "2px 0 10px rgba(0, 0, 0, 0.4)",
  transition: "0.3s",
  "&:hover": {
    width: "270px",
  },
});

export const LogoContainer = styled.div({
  width: "100px",
  paddingLeft: "15px",
  margin: "0",
  height: "71px",
});

export const Logo = styled.img({
  objectFit: "cover",
  objectPosition: "0px 0px",
  width: "45px",
  height: "40px",
});

export const List = styled.ul({
  height: "100%",
  listStyleType: "none",
  paddingInlineStart: "0px",
});

export const ListItem = styled.li({
  cursor: "pointer",
  transition: "0.2s",
  whiteSpace: "nowrap",
  "&:hover": {
    background: "#EDEDED",
  },
});

export const ListItemLink = styled.a({
  color: "black",
  textDecoration: "none",
  fontSize: "20px",
  paddingBottom: "20px",
  paddingTop: "20px",
  paddingLeft: "18px",
  display: "flex",
  lineHeight: "30px",
});
