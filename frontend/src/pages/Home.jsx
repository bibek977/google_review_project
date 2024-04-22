import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Home = () => {
    const getCompanyData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/");
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    const { data: companyData, isError: companyDataError, isLoading: companyDataLoading } = useQuery({
        queryKey: ['fetchCompanyData'],
        queryFn: getCompanyData
    })


    if (companyDataLoading) {
        return <div>Loading...</div>;
    }
    
    if (companyDataError) {
        return <div>Error fetching data </div>;
    }
    
    if (!companyData) {
        return <div>No data available</div>;
    }


  return (
    <>

    </>
  )
}

export default Home