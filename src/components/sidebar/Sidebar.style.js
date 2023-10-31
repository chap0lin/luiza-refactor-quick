import styled from "@emotion/styled";

export const Sidebar = styled.div({
  width: "270px",
  height: "100%",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px",
  position: "fixed",
  zIndex: 3,
  boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
});
export const Logo = styled.div({
  width: "175px",
  height: "71px",
  paddingBottom: "40px",
});
export const Options = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
