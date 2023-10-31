import styled from "@emotion/styled";

export const ContainerApp = styled.div({
  display: "flex",
});

export const Sidebar = styled.div({
  width: "270px",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px",
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

export const Content = styled.div({
  background: "rgb(232 237 247)",
  width: "100%",
  height: "100%",
  paddingTop: "30px",
  paddingLeft: "65px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  marginLeft: "268px",
});

export const Title = styled.div({
  color: "rgba(0,87,141,255)",
  fontFamily: "Public Sans",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  display: "flex",
  justifyContent: "space-between",
});

export const ContainerCards = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  width: '1425px'
});

export const Card = styled.div({
  background: "white",
  borderRadius: "15px",
  width: "308px",
  height: "96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "rgba(0,87,141,0.8)",
  fontFamily: "Public Sans",
  fontSize: "24px",
  fontWeight: "500",
  justifyContent: "space-evenly",
});

export const FirstCharts = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "42px",
});

export const BarChart = styled.div({
  background: "white",
  borderRadius: "15px",
  width: "940px",
  height: "530px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

export const InputSelect = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  gap: '10px'
});

export const PieChart = styled.div({
  background: "white",
  borderRadius: "15px",
  width: "420px",
  height: "530px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
});

export const InfoText = styled.div({
  fontSize: "15px",
  fontFamily: "Montserrat",
  fontWeight: "400",
  display: "flex",
  justifyContent: "center",
  color: "#9F9F9F",
});

export const InfoNumber = styled.div({
  fontSize: "30px",
  fontWeight: "400",
  display: "flex",
  justifyContent: "center",
});
