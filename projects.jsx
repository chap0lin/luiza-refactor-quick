const ProjectsStyles = {
  ContainerApp: styled.div({
		with: '100vw',
		height: '100vh',
		// background: 'rgb(232 237 247)',
		display: 'flex',
	}),
  Content: styled.div({
		background: 'rgb(232 237 247)',
		width: '100%',
		paddingTop: '30px',
		paddingLeft: '65px',
		paddingRight: '65px',
		display: 'flex',
		flexDirection: 'column',
		gap: '42px',

	}),
	Title: styled.div({
		color: 'rgba(0,87,141,255)',
		fontFamily: 'Public Sans',
		fontSize: '36px',
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 'normal',
	}),
}

const Projects = () => {
  const {
    ContainerApp,
    Content,
    Title,
  } = ProjectsStyles;

  const { useHistory } = ReactRouterDOM;
	let history = useHistory();

  const DashboardPage = () => {
    history.push("/");
  }

	const ColaboratorsPage = () => {
		history.push("/colaborators");
	}

  return(
    <ContainerApp>
      <SidebarComponent onClickDash={DashboardPage} onClickColab={ColaboratorsPage}></SidebarComponent>
    </ContainerApp>
  );
}