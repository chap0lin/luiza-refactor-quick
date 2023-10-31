import React from "react";
import { ContainerSidebar, IconContainer, Text } from './SideOptions.style'

export const SideOptions = (props) => {
  return(
    <ContainerSidebar onClick={props.onClick}>
      <IconContainer>{props.icon}</IconContainer>
      <Text>{props.name}</Text>
    </ContainerSidebar>
  );
};
