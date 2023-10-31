import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses
} from "@mui/material"
import styled from "@emotion/styled"
import { Assessment, Groups, Search } from "@mui/icons-material"


import {
  ContainerApp,
  Content,
  Title,
  CentralContent,
  Filters,
  NavSideBar,
  LogoContainer,
  Logo,
  List,
  ListItem,
  ListItemLink
} from "./Allocations.style";

export const Allocations = ({ setActiveRoute }) => {

  const Cell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgb(0, 87, 141)',
      color: 'white',
      padding:'3px',
      border: '1px solid black'

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      padding:'3px',
      border: '1px solid black'
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(0,0,50,0.1)',
    },
  }));

  const [generalAllocation, setGeneralAllocation] = useState([]);
  const [filteredAllocation, setFilteredAllocation] = useState([]);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCentro, setSelectedCentro] = useState('');
  const [searchName, setSearchName] = useState('');
  const navbar = useRef();
  const logo = useRef();
  const logoContainer = useRef();

  const DashboardPage = () => {
    setActiveRoute("")

    // history.push("/");
  }

  const setProjectsData = (data) => {
		setProjects(data);
	}

  const fetchProjects = () => {
		google.script.run.withSuccessHandler(setProjectsData).getProjectsCDM();
	}

  const setAllocation = (data) => {
		let validData = data.filter((i) => i.Centro !== 'n/a' && i.Area !== 'Fora do centro');
    setGeneralAllocation(validData);
    setFilteredAllocation(validData);
  }

  const fetchGeneralAllocationOverview = () => {
		google.script.run.withSuccessHandler(setAllocation).getGeneralAllocationOverview();
  }

  const filterArea = (event) => {
    setSelectedArea(event.target.value);
		
  }

  const filterProject = (event) => {
    setSelectedProject(event.target.value);
  }

  const filterName = (event) => {
    setSearchName(event.target.value);
  }

  const filterCentro = (event) => {
    setSelectedCentro(event.target.value)
  }

  useEffect(() => {
    let filteredData = generalAllocation;
    if(selectedArea !== 'todas' && selectedArea !== '') {
      filteredData = filteredData.filter((i) => i["Area"] === selectedArea);
    }
    if(selectedProject !== 'todos' && selectedProject !== '') {
      filteredData = filteredData.filter((i) => 
        i.Janeiro.search(selectedProject) !== -1 ||
        i.Fevereiro.search(selectedProject) !== -1 ||
        i.Marco.search(selectedProject) !== -1 ||
        i.Abril.search(selectedProject) !== -1 ||
        i.Maio.search(selectedProject) !== -1 ||
        i.Junho.search(selectedProject) !== -1 ||
        i.Julho.search(selectedProject) !== -1 ||
        i.Agosto.search(selectedProject) !== -1 ||
        i.Setembro.search(selectedProject) !== -1 ||
        i.Outubro.search(selectedProject) !== -1 ||
        i.Novembro.search(selectedProject) !== -1 ||
        i.Dezembro.search(selectedProject) !== -1 )
    }
    if(searchName !== '') {
      filteredData = filteredData.filter((i) => i.Nome.toUpperCase().search(searchName.toUpperCase()) !== -1)
    }
    if(selectedCentro !== 'todos' && selectedCentro !== '') {
      console.log(selectedCentro)
      filteredData = filteredData.filter((i) => i["Centro"] === selectedCentro)
    }

    setFilteredAllocation(filteredData)
  
  }, [selectedArea, selectedProject, searchName, selectedCentro])

  useEffect(() => {
    fetchProjects();
    fetchGeneralAllocationOverview();
  }, []);

  const navExtended = () => {
    logoContainer.current.style.objectPosition = 'none'
    logoContainer.current.style.width = '175px'
    logoContainer.current.style.height = '71px'
    logoContainer.current.style.padding = '0px'
    logoContainer.current.style.paddingBottom = '20px'
    logoContainer.current.style.transition = '0.3s'

    navbar.current.style.padding = '20px 0 40px 0px'
    navbar.current.style.width = '270px'
    navbar.current.style.height = '100%'
    navbar.current.style.transition = '0.3s'

    logo.current.style.objectPosition = 'none'
    logo.current.style.width = '175px'
    logo.current.style.height = '65.266px'
    logo.current.style.paddingLeft = '47.5px'
    logo.current.style.transition = '0.3s'
  }

  const navReduced = () => {
    logoContainer.current.style.objectPosition = 'none'
    logoContainer.current.style.width = '100px'
    logoContainer.current.style.margin = '0'
    logoContainer.current.style.padding = '0px'
    logoContainer.current.style.paddingLeft = '15px'
    logoContainer.current.style.transition = '0.3s'

    navbar.current.style.display = 'block'
    navbar.current.style.padding = '40px 0 40px 0px'
    navbar.current.style.width = '75px'
    navbar.current.style.height = '100%'
    navbar.current.style.overflow = 'hidden'
    navbar.current.style.transition = '0.3s'

    logo.current.style.objectFit = 'cover'
    logo.current.style.objectPosition = '0px 0px'
    logo.current.style.width = '45px'
    logo.current.style.height = '40px'
    logo.current.style.paddingLeft = '0px'
    logo.current.style.transition = '0.3s'
  }

  return(
    <ContainerApp>

      <NavSideBar ref={navbar} onMouseOver={navExtended} onMouseOut={navReduced}>
        <LogoContainer ref={logoContainer}>
          <Logo ref={logo}
            src="https://www.certi.org.br/img/fundacao-certi-logo.svg">
          </Logo>
        </LogoContainer>

        <List>
          <ListItem>
            <ListItemLink onClick={DashboardPage}>
              <span><Assessment  sx={{fontSize:32, color: '#1764a1'}} /></span>
              <span style={{marginLeft:'30px'}}>Dashboard</span>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#">
              <span><Groups sx={{fontSize:32, color: '#1764a1'}} /></span>
              <span style={{marginLeft:'30px'}}>Alocação por Área</span>
            </ListItemLink>
          </ListItem>
        </List>

      </NavSideBar>      

      <Content>
        <Title>Alocações { selectedCentro !== '' && selectedCentro !== 'todos' ? `- ${selectedCentro}` : `` }</Title>
        <Filters>
          <div style={{position:'relative'}}>
            <Search sx={{position:'absolute', top: '15px', left:'15px', color:'gray' }} />
            <input type="text" placeholder="Buscar" onChange={filterName}
            style={{width: '250px', height: '50px', 
              paddingLeft:'50px', background: 'white', 
              border: '0.5px solid rgba(0, 0, 0, 0.25)', borderRadius: '4px',
              color: 'rgba(0, 0, 0, 0.6)',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: '1.4375em',
              letterSpacing: '0.00938em'
              }}>
            </input>
          </div>
          <Box style={{background: 'white'}}>
            <FormControl sx={{ minWidth: 300, position: 'relative' }} >
              <InputLabel id="demo-simple-select-label">Área</InputLabel>
              <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedArea}
                label="Área"
                onChange={filterArea}
                inputProps={{ 'aria-label': 'Without label', 'aria-expanded': false }}
              >
                <MenuItem value={'Design'}>Design</MenuItem>
                <MenuItem value={'Embarcados'}>Embarcados</MenuItem>
                <MenuItem value={'Engenharia de Sistemas'}>Engenharia de Sistemas</MenuItem>
                <MenuItem value={'Hardware'}>Hardware</MenuItem>
                <MenuItem value={'IA'}>IA</MenuItem>
                <MenuItem value={'Operações'}>Operações</MenuItem>
                <MenuItem value={'Software'}>Software</MenuItem>
                <MenuItem value={'todas'}>Todas</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{background: 'white'}}>
            <FormControl sx={{ minWidth: 300, position: 'relative' }} >
              <InputLabel id="demo-simple-select-label">Projeto</InputLabel>
              <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProject}
                label="Projeto"
                onChange={filterProject}
                inputProps={{ 'aria-label': 'Without label', 'aria-expanded': false }}
              >
                {projects.map((item, index) => {
                  if(item.status === 'Ativo') {
                    return (<MenuItem value={`${item.sigla}`}>{item.sigla}</MenuItem>)
                  }
                })}
                <MenuItem value={'todos'}>Todos</MenuItem>
                
              </Select>
            </FormControl>
          </Box>

          <Box style={{background: 'white'}}>
            <FormControl sx={{ minWidth: 300, position: 'relative' }} >
              <InputLabel id="demo-simple-select-label">Centro</InputLabel>
              <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCentro}
                label="Centro"
                onChange={filterCentro}
                inputProps={{ 'aria-label': 'Without label', 'aria-expanded': false }}
              >
                <MenuItem value={'CDM'}>CDM</MenuItem>
                <MenuItem value={'ICS'}>ICS</MenuItem>
                <MenuItem value={'todos'}>Todos</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Filters>

        <CentralContent>
          { filteredAllocation.length > 0 ?
            <TableContainer>
              <Table stickyHeader sx={{borderCollapse: 'collapse'}}>
                <TableHead>
                  <TableRow>
                    <Cell align="center">Sigla</Cell>
                    <Cell align="center">Nome</Cell>
                    <Cell align="center">% alocação</Cell>
                    <Cell align="center">Janeiro</Cell>
                    <Cell align="center">Fevereiro</Cell>
                    <Cell align="center">Março</Cell>
                    <Cell align="center">Abril</Cell>
                    <Cell align="center">Maio</Cell>
                    <Cell align="center">Junho</Cell>
                    <Cell align="center">Julho</Cell>
                    <Cell align="center">Agosto</Cell>
                    <Cell align="center">Setembro</Cell>
                    <Cell align="center">Outubro</Cell>
                    <Cell align="center">Novembro</Cell>
                    <Cell align="center">Dezembro</Cell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  { filteredAllocation.map((item,index) => (
                    <StyledTableRow key={index}>
                      <Cell align="center">{item.Sigla}</Cell>
                      <Cell align="center">{item.Nome}</Cell>
                      <Cell align="center">{item.AlocacaoPercentage * 100}</Cell>
                      <Cell align="center">{item.Janeiro}</Cell>
                      <Cell align="center">{item.Fevereiro}</Cell>
                      <Cell align="center">{item.Marco}</Cell>
                      <Cell align="center">{item.Abril}</Cell>
                      <Cell align="center">{item.Maio}</Cell>
                      <Cell align="center">{item.Junho}</Cell>
                      <Cell align="center">{item.Julho}</Cell>
                      <Cell align="center">{item.Agosto}</Cell>
                      <Cell align="center">{item.Setembro}</Cell>
                      <Cell align="center">{item.Outubro}</Cell>
                      <Cell align="center">{item.Novembro}</Cell>
                      <Cell align="center">{item.Dezembro}</Cell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          :
						<CircularProgress/>
          }

        </CentralContent>
      </Content>
    </ContainerApp>
  );
}