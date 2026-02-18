// DependencyProvider.js
import React from 'react';
import DependencyContext from './DependencyContext';

const DependencyProvider = ({ dependencies, children }) => {
    return (
        <DependencyContext.Provider value={dependencies}>
            {children}
        </DependencyContext.Provider>
    );
};

export default DependencyProvider;
