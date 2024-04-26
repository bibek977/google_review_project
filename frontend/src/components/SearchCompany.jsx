import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchCompany = () => {
    const navigate = useNavigate()
    const getCompanyData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/");
            // console.log(response.data)
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    const { data: companyData, isError: companyDataError, isLoading: companyDataLoading } = useQuery({
        queryKey: ['fetchCompanyData'],
        queryFn: getCompanyData
    })
    if (companyData){
        navigate("/")
    }
    const [searchInput,setSearchInput] = useState({'title':''})
    const [connectHref,setConnectHref] = useState( {
        'link' : ""
    })
    const handleChangeInput = (event) => {
        setSearchInput({ "title": event.target.value });
    };

    const searchCompany = async()=>{
        try{
            const response = await axios.post('http://127.0.0.1:8000/search/',searchInput)
            console.log(response.data.results)
            return response.data.results
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }

    }
    const {data : searchCompanyData,
        isPending:searchCompanyPending,
        isSuccess:searchCompanySuccess,
        mutate : searchCompanyMutate,
        isError:searchCompanyError}
         = useMutation({
            mutationKey : ['postSearchCompany'],
            mutationFn : searchCompany
         })

    const sendData = ()=>{
        searchCompanyMutate()
    }

    const companyConnect = async()=>{
        try{
            const response = await axios.post("http://127.0.0.1:8000/connect/",connectHref)
        console.log(response.data)
        return response.data
        }
        catch(error){
            throw new Error(error)
        }
    }
    const {
        mutate:postConnectCompany,
        data : connectCompanyData,
        isPending : connectCompanyPending,
        isError : connectCompanyError
    } = useMutation({
        mutationKey : ['connectCompany'],
        mutationFn : companyConnect,
        onSuccess: ()=>{
            navigate("/")
        }
    })

    const handleConnectBtn = (href)=>{
        setConnectHref({"link":href})
        postConnectCompany()
    }



  return (
    <>
        <div className="search-main">
            <div className="search-container">
                <div className="search-title">Search Company Name from Google Map</div>
                <div className="search-box-container">
                    <input type="text" className='search-box' value={searchInput.title} onChange={handleChangeInput} />
                    <button onClick={sendData} className='search-btn'>Search</button>
                </div>
            </div>
            <div className="search-results">
                {searchCompanyData?.map((e,i)=>{
                    return(
                        <div className="search-results-box" key={i}>
                        <div className="results-data-box">
                            <h1 className="results-title">{e.name}</h1>
                            <div className="results-reviews-box">
                                <h1>star: {e.rating}</h1>
                                <h1>reviews: {e.reviews}</h1>
                            </div>
                        </div>
                        <button className='connect-btn' onClick={()=>handleConnectBtn(e.href)}>Connect</button>
                    </div>
                    )
                })}
               
            </div>
        </div>

    </>
  )
}

export default SearchCompany