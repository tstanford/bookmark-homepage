import React from 'react';
import { useDependencies } from './dependencies';

export default function App() {
    const { apiClient } = useDependencies();

    apiClient.get("/bookmarks").then(result => {
        console.log(result);
    });

    return (
        <p>Hello world</p>
    );
    
};