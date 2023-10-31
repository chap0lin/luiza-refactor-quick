import React from "react";
import { Assessment, Groups } from "@mui/icons-material"
import { SideOptions } from '../sideOptions';

import {
  Sidebar,
  Logo,
  Options
} from './Sidebar.style'

export const SidebarComponent = (props) => {
  return(
    <Sidebar>
      <Logo>
        <img src="https://www.certi.org.br/img/fundacao-certi-logo.svg"></img>
      </Logo>
      <Options>
        <SideOptions icon={<Assessment sx={{fontSize:32, color: '#1764a1'}} />} name={'Dashboard'} onClick={props.onClickDash} ></SideOptions>
        <SideOptions icon={<Groups sx={{fontSize:32, color: '#1764a1'}} />} name={'Alocação por Área'} onClick={props.onClickColab}></SideOptions>
      </Options>
    </Sidebar>
  );
}