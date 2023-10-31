import React, { useState, useLayoutEffect, useRef } from "react";
import {
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
} from "@mui/material";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SidebarComponent } from '../../components';
import { useGoogleDataContext } from '../../contexts/dataProvider/GoogleDataProvider'

import {
  ContainerApp,
  Content,
  ContainerCards,
  Card,
  FirstCharts,
  Logo,
  BarChart,
  InputSelect,
  Options,
  PieChart,
  Sidebar,
  Title,
  InfoText,
  InfoNumber
} from "./Dashboard.style";

Chart.register(...registerables)
Chart.register(ChartDataLabels);

export const Dashboard = ({ setActiveRoute }) => {
	const { test, 
		testWithParameter, 
		handleCurrentAllocation, 
		handleMonthlyAllocation,
		currentAllocationCDM, 
		monthlyAllocationCDM,
		currentAllocationICS, 
		monthlyAllocationICS,
		tableColaborators, 
    tableProjectsCDM, 
    tableProjectsICS 
	} = useGoogleDataContext();

	const [loading, setLoading] = useState(true);
	const [areaMonthChart, setAreaMonthChart] = useState('');
	const [subareaMonthChart, setSubareaMonthChart] = useState('');
	const [secondAreaMonthChart, setSecondAreaMonthChart] = useState('');
	const [secondSubareaMonthChart, setSecondSubareaMonthChart] = useState('');
	const [areaPieChart, setAreaPieChart] = useState('');
	const monthChartRef = useRef();
	const secondMonthChartRef = useRef();
	const monthChartRef2 = useRef();
	const secondMonthChartRef2 = useRef();
	const pieChart = useRef();
	const pieChart2 = useRef();
	const colabByArea = useRef();
	const colabByArea2 = useRef();
	const [selectedCentro, setSelectedCentro] = useState('CDM');
	const [selectedYearFirst, setSelectedYearFirst] = useState('');
	const [selectedYearSecond, setSelectedYearSecond] = useState('');

	const currentYear = (new Date()).getFullYear()

	const ColaboratorsPage = () => {
		setActiveRoute("/colaborators");
	}

	const filterMonthChart = async (event) => {
		setAreaMonthChart(event.target.value);

		let data = selectedCentro === 'CDM' ? monthlyAllocationCDM : monthlyAllocationICS;
		if(event.target.value !== 'todas') {
			data = data.map((month) => 
				month.filter((i) => i["Área"] === event.target.value)
			);
		}
		drawBarChart(data);
	}

	const filterSubareaMonthChart = async (event) => {
		setSubareaMonthChart(event.target.value);

		let data = selectedCentro === 'CDM' ? monthlyAllocationCDM : monthlyAllocationICS;
		if(event.target.value !== 'todas') {
			data = data.map((month) => 
				month.filter((i) => i["Função"] === event.target.value)
			);
		}
		else {
			data = data.map((month) => 
				month.filter((i) => i["Área"] === areaMonthChart)
			);
		}
		drawBarChart(data);
	}


	const filteSecondMonthChart = async (event) => {
		setSecondAreaMonthChart(event.target.value);

		let data = selectedCentro === 'CDM' ? monthlyAllocationCDM : monthlyAllocationICS;

		if(event.target.value !== 'todas') {
			data = data.map((month) => 
				month.filter((i) => i["Área"] === event.target.value)
			);
		}
		secondDrawBarChart(data);
	}

	const filteSecondSubareaMonthChart = async (event) => {
		setSecondSubareaMonthChart(event.target.value);

		let data = selectedCentro === 'CDM' ? monthlyAllocationCDM : monthlyAllocationICS;
		if(event.target.value !== 'todas') {
			data = data.map((month) => 
				month.filter((i) => i["Função"] === event.target.value)
			);
		}
		else {
			data = data.map((month) => 
				month.filter((i) => i["Área"] === secondAreaMonthChart)
			);
		}
		secondDrawBarChart(data);
	}

	const filterPieChart = (event) => {
		setAreaPieChart(event.target.value);
		let data = currentAllocationCDM;
		if(event.target.value !== 'todas') {
			data = currentAllocationCDM.filter((i) => i["Área"] === event.target.value)
		}
		drawPieChart(data);
	}

	const drawBarChart = (data) => {
		if(monthChartRef2?.current) {
			monthChartRef2.current.destroy();
		}
		if(monthChartRef?.current) {
			monthChartRef2.current = new Chart(monthChartRef.current, {
				plugins: [
					ChartDataLabels,
					{
						beforeDraw: (chart) => {
							const ctx = chart.canvas.getContext('2d');
							ctx.save();
							ctx.globalCompositeOperation = 'destination-over';
							ctx.fillStyle = 'white';
							ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
							ctx.restore();
						}
					}
				],
				type: 'bar',
				data: {
						labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
						datasets: [
							{
								label: 'Alocados',
								data: [
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[0].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2),
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[1].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[2].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[3].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[4].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[5].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[6].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[7].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[8].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[9].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[10].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[11].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2)
								],
								borderWidth: 1,
								backgroundColor: ["#8bc53f"]

							},
							{
								label: 'Desalocados',
								data: [
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[0].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[1].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[2].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[3].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[4].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[5].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[6].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearFirst === 2023 || selectedYearFirst === '' ? 0 : data[7].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[8].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[9].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[10].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[11].map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2)
								],
								borderWidth: 1,
								backgroundColor: ["#f08522"]
							},
					]
				},
				options: {
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: true,
							text: 'Status de alocação mensal dos Projetos Contratados',
							font: {
								size: 18,
							},
							padding: {
								top: 20,
								bottom: 40
							}
						},
						subtitle: {
							display: true,
							position: 'bottom',
							text: '*Considerando alocação em qualquer período do mês',
							font: {
								size: 14,
								family: 'tahoma',
								weight: 'normal',
								style: 'italic'
							},
							padding: {
								bottom: 10
							}
						},
						datalabels: {
							anchor: 'end',
							align: 'top',
							display: function(context) {
								return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
						 	},
							//formatter: Math.round,
							font: {
									weight: 'bold',
									size: 14
							}
						}
					},
					scales: {
						y: {
								beginAtZero: true,
								suggestedMax: areaMonthChart !== 'Todas' ? 20 : 50
						},
					},
				}
			});
		}
	};

	const secondDrawBarChart = (data) => {
		if(secondMonthChartRef2?.current) {
			secondMonthChartRef2.current.destroy();
		}
		if(secondMonthChartRef?.current) {
			secondMonthChartRef2.current = new Chart(secondMonthChartRef.current, {
				plugins: [
					ChartDataLabels,
					{
						beforeDraw: (chart) => {
							const ctx = chart.canvas.getContext('2d');
							ctx.save();
							ctx.globalCompositeOperation = 'destination-over';
							ctx.fillStyle = 'white';
							ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
							ctx.restore();
						}
					}
				],
				type: 'bar',
				data: {
						labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
						datasets: [
							{
								label: 'Alocados',
								data: [
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[0].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2),
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[1].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[2].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[3].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[4].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[5].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[6].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[7].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[8].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[9].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[10].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[11].map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2)
								],
								borderWidth: 1,
								backgroundColor: ["#8bc53f"]

							},
							{
								label: 'Desalocados',
								data: [
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[0].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[1].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[2].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[3].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[4].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[5].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[6].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[7].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[8].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[9].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[10].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[11].map((i) => 1 - i.percentageAllocated - i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2)
								],
								borderWidth: 1,
								backgroundColor: ["#f08522"]
							},
							{
								label: 'Prováveis',
								data: [
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[0].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[1].map((i) => i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[2].map((i) => i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[3].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[4].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[5].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[6].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									selectedYearSecond === 2023 || selectedYearSecond === '' ? 0 : data[7].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[8].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[9].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[10].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
									data[11].map((i) =>  i.percentagePotential).reduce((pv, cv) => pv + cv, 0).toFixed(2)
								],
								borderWidth: 1,
								backgroundColor: ["#04acec"]
							},
					]
				},
				options: {
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: true,
							text: 'Status de alocação mensal com Projetos Prováveis',
							font: {
								size: 18,
							},
							padding: {
								top: 20,
								bottom: 20
							}
						},
						subtitle: {
							display: true,
							position: 'bottom',
							text: '*Considerando alocação em qualquer período do mês',
							font: {
								size: 14,
								family: 'tahoma',
								weight: 'normal',
								style: 'italic'
							},
							padding: {
								bottom: 10
							}
						},
						datalabels: {
							anchor: 'end',
							align: 'top',
							display: function(context) {
								return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
						 	},
							//formatter: Math.round,
							font: {
									weight: 'bold',
									size: 10
							}
						}
					},
					scales: {
						y: {
								beginAtZero: true,
								suggestedMax: secondAreaMonthChart !== 'Todas' ? 20 : 50
						},
					},
				}
			});
		}
	};

	const drawPieChart = (data) => {
		if(pieChart2?.current) {
			pieChart2.current.destroy();
		}
		if(pieChart?.current) {
			pieChart2.current = new Chart(pieChart.current, {
				type: 'pie',
				plugins: [
					ChartDataLabels,
					{
						beforeDraw: (chart) => {
							const ctx = chart.canvas.getContext('2d');
							ctx.save();
							ctx.globalCompositeOperation = 'destination-over';
							ctx.fillStyle = 'white';
							ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
							ctx.restore();
						}
					}
				],
				data: {
					labels: ['Alocados', 'Desalocados'],
					datasets: [
						{
							data: [
								data.map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2), 
								data.map((i) => 1 - i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2)
							],
							backgroundColor: ["#04acec", "#e42b7c"]
						},
					]
				},
				options: {
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: true,
							text: 'Status de alocação do dia',
							font: {
								size: 18,
							},
							padding: {
								top: 20,
								bottom: 20
							}
						},
						subtitle: {
							display: true,
							position: 'bottom',
							text: '*Considerando alocação no dia atual',
							font: {
								size: 14,
								family: 'tahoma',
								weight: 'normal',
								style: 'italic'
							},
							padding: {
								bottom: 10
							}
						},
						datalabels: {
							color: 'white',
							font: {
									weight: 'bold',
									size: 18
							},
							display: function(context) {
								return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
						 	},
						}
					},
				}
			})
		}
	}


	/*const drawColabByAreaChart = (data) => {
		if(colabByArea2?.current) {
			colabByArea2.current.destroy();
		}
		if(colabByArea?.current) {
			colabByArea2.current = new Chart(colabByArea.current, {
        type: 'bar',
				plugins: [
					ChartDataLabels,
					{
						beforeDraw: (chart) => {
							const ctx = chart.canvas.getContext('2d');
							ctx.save();
							ctx.globalCompositeOperation = 'destination-over';
							ctx.fillStyle = 'white';
							ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
							ctx.restore();
						}
					}
				],
        data: {
          labels: ['Design', 'Embarcados', 'Engenharia de Sistemas', 'Hardware', 'IA', 'Operações', 'Software'],
          datasets: [
						{
							label: 'Celetista',
							data: [
								data.filter((i) => i["Área"] === 'Design' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Embarcados' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Engenharia de Sistemas' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Hardware' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'IA' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Operações' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Software' && (i["Função"] !== 'Estagiário' && i["Função"] !== 'Estagiário Sist' && i["Função"] !== 'Estagiário QA')).length,
							],
						},
						{
							label: 'Estagiário',
							data: [
								data.filter((i) => i["Área"] === 'Design' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Embarcados' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Engenharia de Sistemas' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Hardware' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'IA' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Operações' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
								data.filter((i) => i["Área"] === 'Software' && (i["Função"] === 'Estagiário' || i["Função"] === 'Estagiário Sist' || i["Função"] === 'Estagiário QA')).length,
							],
						},
					]
        },
        options: {
          indexAxis: 'y',
					responsive: true,
					scales: {
						x: {
							stacked: true,
						},
						y: {
							stacked: true
						}
					},
          plugins: {
            title: {
              display: true,
              text: 'Colaboradores por Área',
							font: {
								size: 18,
							},
            },
						datalabels: {
							display: function(context) {
								return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
						 	},
							font: {
									weight: 'bold',
									size: 16
							}
						}
          }
        }
      });
    }
  }*/

	useLayoutEffect(() => {
		if(selectedCentro === 'CDM' && monthlyAllocationCDM.length > 0 && currentAllocationCDM.length > 0 && tableColaborators.length > 0) {
			if(loading) setLoading(false);
			drawBarChart(monthlyAllocationCDM);
			secondDrawBarChart(monthlyAllocationCDM);
			drawPieChart(currentAllocationCDM);
      // drawColabByAreaChart(tableColaborators);
		}
		if(selectedCentro === 'ICS' && monthlyAllocationICS.length > 0 && currentAllocationICS.length > 0 && tableColaborators.length > 0) {
			if(loading) setLoading(false);
			drawBarChart(monthlyAllocationICS);
			secondDrawBarChart(monthlyAllocationICS);
			drawPieChart(currentAllocationICS);
      // drawColabByAreaChart(tableColaborators);
		}
	}, [currentAllocationCDM, monthlyAllocationCDM, currentAllocationICS, monthlyAllocationICS, selectedCentro, loading]);

	const filterCentro = (event) => {
		setSelectedYearFirst(currentYear);
		setSelectedYearSecond(currentYear);
		setAreaMonthChart('todas');
		setSecondAreaMonthChart('todas');
		setSelectedCentro(event.target.value);
	}


	const downloadChart = (chart) => {
		var a = document.createElement('a');
		a.href = chart.current.toBase64Image();
		a.download = chart === pieChart2 ? 'alocacao_atual.png' : 'alocacao_mensal.png';
		a.click();
	}

	const handleYearFirst = (event) => {
		setSelectedYearFirst(event.target.value);
		handleMonthlyAllocation(event.target.value, selectedCentro);
		setAreaMonthChart('');
	}

	const handleYearSecond = (event) => {
		setSelectedYearSecond(event.target.value);
		handleMonthlyAllocation(event.target.value,selectedCentro);
		setSecondAreaMonthChart('');
	}

	return (
	<ContainerApp>
      <SidebarComponent onClickColab={ColaboratorsPage}></SidebarComponent>
			<Content>
				<Title>
					<div onClick={() => console.log(selectedCentro === 'CDM' ? monthlyAllocationCDM : monthlyAllocationICS)}>
						Dashboard Gerencial - { selectedCentro }
						{ test }
					</div>

					<InputSelect style={{width: '300px' , justifyContent: 'flex-start'}}>
						<Box sx={{ minWidth: 220, background: 'white' }}>
							<FormControl sx={{ minWidth: 220 }} size="small">
								<InputLabel id="demo-simple-select-label">Centro</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={selectedCentro}
									label="Centro"
									onChange={filterCentro}
								>
									<MenuItem value={'CDM'}>CDM</MenuItem>
									<MenuItem value={'ICS'}>ICS</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</InputSelect>
				</Title>
				<ContainerCards>
					<Card>
						<InfoText>
							PROJETOS CONTRATADOS
						</InfoText>
						<InfoNumber>
							{ selectedCentro === 'CDM' && tableProjectsCDM.length > 0 ? `${tableProjectsCDM.filter((i) => i.Status === 'Contratado').length}`
							:
								selectedCentro === 'ICS' && tableProjectsICS.length > 0  ? `${tableProjectsICS.filter((i) => i.Status === 'Contratado').length}`
							:
								<CircularProgress/>
							}
						</InfoNumber>
					</Card>
					<Card>
						<InfoText>
							PROJETOS PROVÁVEIS
						</InfoText>
						<InfoNumber>
							{ selectedCentro === 'CDM' && tableProjectsCDM.length > 0 ? `${tableProjectsCDM.filter((i) => i.Status === 'Provavel').length}`
							:
								selectedCentro === 'ICS' && tableProjectsICS.length > 0  ? `${tableProjectsICS.filter((i) => i.Status === 'Provavel').length}`
							: 
								<CircularProgress/>
							}
						</InfoNumber>
					</Card>
					<Card>
						<InfoText>
							NÚMERO DE COLABORADORES
						</InfoText>
						<InfoNumber>
							{ 
								selectedCentro === 'CDM' && tableColaborators.length > 0 ? `${tableColaborators.filter((i) => i.Centro === 'CDM') .length}` 
								:
								selectedCentro === 'ICS' && tableColaborators.length > 0 ? `${tableColaborators.filter((i) => i.Centro === 'ICS') .length}` 

							: <CircularProgress/> 
							}
						</InfoNumber>
					</Card>
					{/* <Card>
						<InfoText>
							ALOCAÇÕES EM PROJETOS
						</InfoText>
						<InfoNumber>
							{ 
								selectedCentro === 'CDM' && currentAllocationCDM.length > 0 ? `${currentAllocationCDM.map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2)}`
								:
								selectedCentro === 'ICS' && currentAllocationICS.length > 0 ? `${currentAllocationICS.map((i) => i.percentageAllocated).reduce((pv, cv) => pv + cv, 0).toFixed(2)}`

							: 
								<CircularProgress/>
							}
						</InfoNumber>
					</Card> */}
				</ContainerCards>
				<FirstCharts>

					<BarChart>
						{ loading ? 
							<CircularProgress/>
							:
							<>
								<InputSelect>
									<Box sx={{ minWidth: 120 }}>
										<FormControl sx={{ minWidth: 120 }} size="small">
											<InputLabel id="demo-simple-select-label">Ano</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={selectedYearFirst}
												label="Ano"
												onChange={handleYearFirst}
											>
												<MenuItem value={2023}>2023</MenuItem>
												<MenuItem value={2024}>2024</MenuItem>
												<MenuItem value={2025}>2025</MenuItem>
												<MenuItem value={2026}>2026</MenuItem>
											</Select>
										</FormControl>
									</Box>
									{ selectedCentro === 'CDM' ? 
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Área</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={areaMonthChart}
													label="Área"
													onChange={filterMonthChart}
												>
													<MenuItem value={'Design'}>Design</MenuItem>
													<MenuItem value={'Embarcados'}>Embarcados</MenuItem>
													<MenuItem value={'Engenharia de Sistemas'}>Engenharia de Sistemas</MenuItem>
													<MenuItem value={'Hardware'}>Hardware</MenuItem>
													<MenuItem value={'IA'}>IA</MenuItem>
													<MenuItem value={'Operacoes'}>Operações</MenuItem>
													<MenuItem value={'Software'}>Software</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
										:
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Área</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={areaMonthChart}
													label="Área"
													onChange={filterMonthChart}
												>
													<MenuItem value={'Design'}>Design</MenuItem>
													<MenuItem value={'Operacoes'}>Operações</MenuItem>
													<MenuItem value={'Software'}>Software</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
									}
									{
										areaMonthChart === 'Engenharia de Sistemas' && 
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Subárea</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={subareaMonthChart}
													label="Subárea"
													onChange={filterSubareaMonthChart}
												>
													<MenuItem value={'Eng. de Sistemas'}>Eng. de Sistemas</MenuItem>
													<MenuItem value={'QA'}>QA</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
									}
									{
										areaMonthChart === 'Operacoes' && 
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Subárea</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={subareaMonthChart}
													label="Subárea"
													onChange={filterSubareaMonthChart}
												>
													<MenuItem value={'Coordenador Proj'}>Coordenador Proj</MenuItem>
													<MenuItem value={'Scrum Master'}>Scrum Master</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
									}
								</InputSelect>
								<canvas id="chart" ref={monthChartRef}></canvas>
								<button id="btn-download" onClick={() => downloadChart(monthChartRef2)}>Exportar</button>
							</>
						}
					</BarChart>
					
					<PieChart>
						{ loading ?
							<CircularProgress/> :
							<>
								<InputSelect>
									<Box sx={{ minWidth: 220 }}>
										<FormControl sx={{ minWidth: 220 }} size="small">
											<InputLabel id="demo-simple-select-label">Área</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={areaPieChart}
												label="Área"
												onChange={filterPieChart}
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
								</InputSelect>
								<canvas id="piechart" ref={pieChart}></canvas>
								<button id="btn-download" onClick={() => downloadChart(pieChart2)}>Exportar</button>
							</>
						}
					</PieChart>
				</FirstCharts>

				<BarChart>
						{ loading ? 
							<CircularProgress/>
							:
							<>
								<InputSelect>
									<Box sx={{ minWidth: 120 }}>
										<FormControl sx={{ minWidth: 120 }} size="small">
											<InputLabel id="demo-simple-select-label">Ano</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={selectedYearSecond}
												label="Ano"
												onChange={handleYearSecond}
											>
												<MenuItem value={2023}>2023</MenuItem>
												<MenuItem value={2024}>2024</MenuItem>
												<MenuItem value={2025}>2025</MenuItem>
												<MenuItem value={2026}>2026</MenuItem>
											</Select>
										</FormControl>
									</Box>
									{ selectedCentro === 'CDM' ? 
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Área</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={secondAreaMonthChart}
													label="Área"
													onChange={filteSecondMonthChart}
												>
													<MenuItem value={'Design'}>Design</MenuItem>
													<MenuItem value={'Embarcados'}>Embarcados</MenuItem>
													<MenuItem value={'Engenharia de Sistemas'}>Engenharia de Sistemas</MenuItem>
													<MenuItem value={'Hardware'}>Hardware</MenuItem>
													<MenuItem value={'IA'}>IA</MenuItem>
													<MenuItem value={'Operacoes'}>Operações</MenuItem>
													<MenuItem value={'Software'}>Software</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
										:
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Área</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={secondAreaMonthChart}
													label="Área"
													onChange={filteSecondMonthChart}
												>
													<MenuItem value={'Design'}>Design</MenuItem>
													<MenuItem value={'Operacoes'}>Operações</MenuItem>
													<MenuItem value={'Software'}>Software</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
									}
									{
										secondAreaMonthChart === 'Engenharia de Sistemas' && 
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Subárea</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={secondSubareaMonthChart}
													label="Subárea"
													onChange={filteSecondSubareaMonthChart}
												>
													<MenuItem value={'Eng. de Sistemas'}>Eng. de Sistemas</MenuItem>
													<MenuItem value={'QA'}>QA</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
									}
									{
										secondAreaMonthChart === 'Operacoes' && 
										<Box sx={{ minWidth: 220 }}>
											<FormControl sx={{ minWidth: 220 }} size="small">
												<InputLabel id="demo-simple-select-label">Subárea</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={secondSubareaMonthChart}
													label="Subárea"
													onChange={filteSecondSubareaMonthChart}
												>
													<MenuItem value={'Coordenador Proj'}>Coordenador Proj</MenuItem>
													<MenuItem value={'Scrum Master'}>Scrum Master</MenuItem>
													<MenuItem value={'todas'}>Todas</MenuItem>
												</Select>
											</FormControl>
										</Box>
									}
								</InputSelect>
								<canvas id="chart2" ref={secondMonthChartRef}></canvas>
								<button id="btn-download" onClick={() => downloadChart(secondMonthChartRef2)}>Exportar</button>
								
							</>
						}
					</BarChart>
			
				{/*<BarChart>
					{ loading ?
						<CircularProgress/> :
						<canvas id="chart" ref={colabByArea}></canvas>
					}
				</BarChart>*/}

				<div style={{height:'50px', width:'100%'}}></div>
			</Content>
		</ContainerApp>
	);
}
