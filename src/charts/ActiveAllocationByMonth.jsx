import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


import {
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
} from "@mui/material";
import {
  InputSelect,
} from "../pages/dashboard/Dashboard.style";

export const ActiveAllocationByMonthChart = ({ selectedCentro, monthlyAllocationCDM, monthlyAllocationICS, handleMonthlyAllocation }) => {
	const [chartData, setChartData] = useState()
	const [selectedYearFirst, setSelectedYearFirst] = useState('');
	const [areaMonthChart, setAreaMonthChart] = useState('');
	const [subareaMonthChart, setSubareaMonthChart] = useState('');
  const monthChartRef = useRef();
	const monthChartRef2 = useRef();


  const drawBarChart = (data, selectedYearFirst) => {
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

  const handleYearFirst = (event) => {
		setSelectedYearFirst(event.target.value);
		const data = handleMonthlyAllocation(event.target.value, selectedCentro);
		setAreaMonthChart('');
		drawBarChart(data, event.target.value)
		setChartData(data)
	}

  const filterMonthChart = async (event) => {
		setAreaMonthChart(event.target.value);

		let data = chartData
		if(event.target.value !== 'todas') {
			data = data.map((month) => 
				month.filter((i) => i["Área"] === event.target.value)
			);
		}
		drawBarChart(data, selectedYearFirst);
	}

	const filterSubareaMonthChart = async (event) => {
		setSubareaMonthChart(event.target.value);

		let data = chartData
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
		drawBarChart(data, selectedYearFirst);
	}

  useLayoutEffect(() => {
    drawBarChart(monthlyAllocationCDM, selectedYearFirst)
  }, [])

	useEffect(() => {
		if (selectedCentro === "ICS") {
			setChartData(monthlyAllocationICS)
		} else {
			setChartData(monthlyAllocationCDM)
		}
	}, [selectedCentro]);


  return (
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
        {selectedCentro === "CDM" ? (
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
                <MenuItem value={"Design"}>Design</MenuItem>
                <MenuItem value={"Embarcados"}>Embarcados</MenuItem>
                <MenuItem value={"Engenharia de Sistemas"}>
                  Engenharia de Sistemas
                </MenuItem>
                <MenuItem value={"Hardware"}>Hardware</MenuItem>
                <MenuItem value={"IA"}>IA</MenuItem>
                <MenuItem value={"Operacoes"}>Operações</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"todas"}>Todas</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
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
                <MenuItem value={"Design"}>Design</MenuItem>
                <MenuItem value={"Operacoes"}>Operações</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"todas"}>Todas</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        {areaMonthChart === "Engenharia de Sistemas" && (
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
                <MenuItem value={"Eng. de Sistemas"}>Eng. de Sistemas</MenuItem>
                <MenuItem value={"QA"}>QA</MenuItem>
                <MenuItem value={"todas"}>Todas</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        {areaMonthChart === "Operacoes" && (
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
                <MenuItem value={"Coordenador Proj"}>Coordenador Proj</MenuItem>
                <MenuItem value={"Scrum Master"}>Scrum Master</MenuItem>
                <MenuItem value={"todas"}>Todas</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </InputSelect>
      <canvas id="chart" ref={monthChartRef}></canvas>
      <button id="btn-download" onClick={() => downloadChart(monthChartRef2)}>
        Exportar
      </button>
    </>
  );
};
