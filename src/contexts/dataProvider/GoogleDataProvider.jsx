import React, { useState, useEffect, useContext, createContext } from "react";
import { DataProcessing } from './DataProcessing';
const GoogleDataContext = createContext();

export const GoogleDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tableColaborators, setTableColaborators] = useState([]);
  const [tableProjectsCDM, setTableProjectsCDM] = useState([]);
  const [tableProjectsICS, setTableProjectsICS] = useState([]);
  const [tableAllocationCDM, setTableAllocationCDM] = useState([]);
  const [tableAllocationICS, setTableAllocationICS] = useState([]);

  const dataProcessingReturn = DataProcessing({
    tableAllocationCDM, 
    tableAllocationICS, 
    tableColaborators, 
    tableProjectsCDM, 
    tableProjectsICS
  });

  const setColaborators = (data) => {
    setTableColaborators(data);
  }

  const setProjectsCDM = (data) => {
    setTableProjectsCDM(data);
  }

  const setProjectsICS = (data) => {
    setTableProjectsICS(data);
  }

  const setAllocationCDM = (data) => {
    setTableAllocationCDM(data);
  }

  const setAllocationICS = (data) => {
    setTableAllocationICS(data);
  }

  useEffect(() => {
		google.script.run.withSuccessHandler(setColaborators).getColaborators();
		google.script.run.withSuccessHandler(setProjectsCDM).getProjectsCDM();
		google.script.run.withSuccessHandler(setProjectsICS).getProjectsICS();
		google.script.run.withSuccessHandler(setAllocationCDM).getAllocationCDM();
		google.script.run.withSuccessHandler(setAllocationICS).getAllocationICS();
  }, []);

  const value = {
    ...dataProcessingReturn,
    tableColaborators, 
    tableProjectsCDM, 
    tableProjectsICS
  }

  return <GoogleDataContext.Provider value={value}>{children}</GoogleDataContext.Provider>
}

export const useGoogleDataContext = () => {
  const context = useContext(GoogleDataContext);
  if (typeof context !== 'undefined') {
    return context;
  } else {
    console.log('GoogleDataContext cannot be called outside GoogleDataProvider');
  }
}
