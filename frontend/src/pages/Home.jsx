import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import MainTab from '../tabs/MainTab'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const getCompanyData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/");
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    const { data: companyData, isError: companyDataError, isLoading: companyDataLoading } = useQuery({
        queryKey: ['fetchCompanyData'],
        queryFn: getCompanyData
    })

    // useEffect(() => {
    //     if (!companyData || companyData.company.length === 0) {
    //         navigate("/search");
    //     }
    // }, [companyData, navigate])

    if (companyDataLoading) {
        return <div>Loading...</div>;
    }
    
    if (companyDataError) {
        return <div>Error fetching data </div>;
    }

    return (
        <>
        {companyData && companyData.company.length !==0 
        ?
            <MainTab data={companyData}></MainTab>
        :
        "no data go to search"
        }
        </>
    )
}

export default Home
