import React, { useEffect, useState } from "react";

export const DataProcessing = ({
    tableAllocationCDM, 
    tableAllocationICS, 
    tableColaborators, 
    tableProjectsCDM, 
    tableProjectsICS
  }) => {
  
  const [currentAllocationCDM, setCurrentAllocationCDM] = useState([]);
  const [currentAllocationICS, setCurrentAllocationICS] = useState([]);
  const [monthlyAllocationCDM, setMonthlyAllocationCDM] = useState([]);
  const [monthlyAllocationICS, setMonthlyAllocationICS] = useState([]);
  const [allocationTableOverviewCDM, setGeneralAllocationCDM] = useState([]);
  const [allocationTableOverviewICS, setGeneralAllocationICS] = useState([]);
  
  const handleCurrentAllocation = (selectedCenter) => {
    let fullAllocationInfo = [];
    const generalAllocationStatus = [];
    const TODAY = new Date();

    if(selectedCenter === 'CDM') {
      fullAllocationInfo = tableAllocationCDM.map((element) => ({
        ...element,
        Centro: 'CDM',
      }));
    } else {
      fullAllocationInfo = tableAllocationICS.map((element) => ({
        ...element,
        Centro: 'ICS',
      }));
    }

    fullAllocationInfo.forEach((item) => {
      if(item["Data de Fim"] !== '' && item["Data de Fim"] !== undefined && item["Data de Início"] !== '' && 
      item["Data de Início"] !== undefined && item.Projeto !== '') {

        const endProjectDate = new Date(item["Data de Fim"]);
        const initialProjectDate = new Date(item["Data de Início"]);

        const existingItem = generalAllocationStatus.find( (a) =>
          a.Sigla === item.Sigla
        );

        const isProjectValid = endProjectDate.getTime()  > TODAY.getTime() && initialProjectDate.getTime() <= TODAY.getTime();
        const percentageAllocated = isProjectValid ? item["Tempo dedicado"] : 0;

        if (existingItem !== undefined && !existingItem.allocated) {
          existingItem.percentageAllocated += percentageAllocated;
          existingItem.allocated =  existingItem.percentageAllocated >= 1; 
        } 
        else if(existingItem === undefined) {
          generalAllocationStatus.push({
            ...item,
            allocated: percentageAllocated >= 1,
            percentageAllocated,
          });
        }
      }
      else {
        generalAllocationStatus.push({
          ...item,
          allocated: false,
          percentageAllocated: 0,
        });
      }

    });

    if(selectedCenter === 'CDM') {
      setCurrentAllocationCDM(generalAllocationStatus)
    } else {
      setCurrentAllocationICS(generalAllocationStatus)
    }
  }

  const handleMonthlyAllocation = (year, selectedCenter) => {
    let fullAllocationInfo = [];
    const generalAllocationByMonth = [];

    if(selectedCenter === 'CDM') {
      fullAllocationInfo = tableAllocationCDM.map((element) => {
        let colab = tableColaborators.find((i) => i.Sigla === element.Sigla);
        return({
          ...element,
          Centro: colab.Centro,
          ["Função"]: colab["Função"],
        })
      });
    } 
    else {
      fullAllocationInfo = tableAllocationICS.map((element) => {
        let colab = tableColaborators.find((i) => i.Sigla === element.Sigla);
        return({
          ...element,
          Centro: colab.Centro,
          ["Função"]: colab["Função"],
        })
      });
    }

    console.log(fullAllocationInfo);
    const monthDays = []
    for (let i = 0; i < 12 ; i+=1) {
      const firstDay = new Date(year, i, 1)
      const lastDay = new Date(year, i+1, 0)
      monthDays.push({
        begin: firstDay.getTime(),
        end: lastDay.getTime()
      });
    }

    monthDays.forEach((month, index) => {
     
      const allocatedThisMonth = [];
      fullAllocationInfo.forEach((item) => {
        if(item["Data de Fim"] !== '' && item["Data de Fim"] !== undefined && item["Data de Início"] !== '' && 
        item["Data de Início"] !== undefined && item.Projeto !== '') {
          
          const initialProjectDate = new Date(item["Data de Início"]);
          const endProjectDate = new Date(item["Data de Fim"]);

          const existingItem = allocatedThisMonth.find( (a) =>
            a.Sigla === item.Sigla
          );

          let isProjectValid = initialProjectDate.getTime() < month.end && endProjectDate.getTime() >= month.end
          let potencialProject = initialProjectDate.getTime() < month.end && endProjectDate.getTime() >= month.end
         
          if(selectedCenter === 'ICS'){
            isProjectValid = isProjectValid && tableProjectsICS.find((i) => item.Projeto === i.Sigla && i.Status === "Contratado")
            potencialProject = potencialProject && tableProjectsICS.find((i) => item.Projeto === i.Sigla && i.Status === "Provavel")

          }
          if(selectedCenter === 'CDM'){
            isProjectValid = isProjectValid && tableProjectsCDM.find((i) => item.Projeto === i.Sigla && i.Status === "Contratado")
            potencialProject = potencialProject && tableProjectsCDM.find((i) => item.Projeto === i.Sigla && i.Status === "Provavel")
          }      

          
         
          const percentageAllocated = isProjectValid ? item["Tempo dedicado"] : 0;
          const percentagePotential = potencialProject ? item["Tempo dedicado"] : 0;

          if (existingItem !== undefined && !existingItem.allocated) {
              existingItem.percentageAllocated += percentageAllocated;
              existingItem.percentagePotential += percentagePotential;
              existingItem.allocated =  existingItem.percentageAllocated >= 1;
              existingItem.allocated =  existingItem.percentagePotential >= 1;
              existingItem["Data de Início"] = item["Data de Início"]
              existingItem["Data de Fim"] = item["Data de Fim"]
          } 
          else if(existingItem === undefined) {
            allocatedThisMonth.push({
              ...item,
              allocated: percentageAllocated >= 1,
              percentageAllocated,
              percentagePotential,
            });
          }
        }
        else {
          allocatedThisMonth.push({
            ...item,
            allocated: false,
            percentageAllocated: 0,
            percentagePotential: 0,
          });
        }
      });
      generalAllocationByMonth.push(allocatedThisMonth);
    });
    // if(selectedCenter === 'CDM') {
    //   setMonthlyAllocationCDM(generalAllocationByMonth)
    // } else {
    //   setMonthlyAllocationICS(generalAllocationByMonth)
    // }
    return generalAllocationByMonth
  }

  useEffect(() => {
    if(tableAllocationCDM.length > 0 && tableColaborators.length > 0) {
      handleCurrentAllocation("CDM");
      const data = handleMonthlyAllocation(2023,"CDM");
      setMonthlyAllocationCDM(data)
    }
  }, [tableAllocationCDM, tableProjectsCDM, tableColaborators]);

  useEffect(() => {
    if(tableAllocationICS.length > 0 && tableColaborators.length > 0) {
      handleCurrentAllocation("ICS");
      const data = handleMonthlyAllocation(2023,"ICS");
      setMonthlyAllocationICS(data)
    }
  }, [tableAllocationICS, tableProjectsICS, tableColaborators]);

  return {
    handleCurrentAllocation,
    handleMonthlyAllocation,
    currentAllocationCDM,
    currentAllocationICS,
    monthlyAllocationCDM,
    monthlyAllocationICS
  }
}
