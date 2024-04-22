import React from 'react';
import { useAppQuery } from '../hooks';

const Home = () => {
    const { data: companyData, isLoading: companyDataLoading, isError: companyDataError } = useAppQuery({
        url: "http://127.0.0.1:8000",
        tag: ['companyDataFetch'],        
    });

    if (companyDataLoading) {
        return <div>Loading...</div>;
    }
    
    if (companyDataError) {
        return <div>Error fetching data : {companyDataError.message}</div>;
    }
    
    if (!companyData) {
        return <div>No data available</div>;
    }

    return (
        <>
        </>
    );
}

export default Home;