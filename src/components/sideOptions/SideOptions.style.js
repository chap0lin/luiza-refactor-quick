import styled from "@emotion/styled";

export const ContainerSidebar = styled.div({
  background: 'white',
  width: '270px',
  height: '48px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    background: '#EDEDED',
  }
});

export const IconContainer = styled.div({
  width: '25px',
  height: '25px',
  paddingLeft: '25px',
  paddingRight: '20px',
});

export const Text = styled.div({
  fontFamily: 'Montserrat',
  fontWeight: '500',
  fontSize: '18px',
});