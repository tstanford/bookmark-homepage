// DependencyContext.js
import React, { createContext, useContext } from 'react';

// Create a Context
const DependencyContext = createContext();

// Custom hook to use the DependencyContext
export const useDependencies = () => {
    return useContext(DependencyContext);
};

// Provider component
export const DependencyProvider = ({ dependencies, children }) => {
    return (
        <DependencyContext.Provider value={dependencies}>
            {children}
        </DependencyContext.Provider>
    );
};
