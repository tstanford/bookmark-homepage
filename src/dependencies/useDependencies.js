// useDependencies.js
import { useContext } from 'react';
import DependencyContext from './DependencyContext';

const useDependencies = () => {
    return useContext(DependencyContext);
};

export default useDependencies;
