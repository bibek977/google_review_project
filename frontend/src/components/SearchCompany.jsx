import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

const SearchCompany = () => {

    const [searchInput,setSearchInput] = useState({'title':''})
    const handleChangeInput = (event) => {
        setSearchInput({ "title": event.target.value });
    };

    const searchCompany = async()=>{
        try{
            const response = await axios.post('http://127.0.0.1:8000/search/',searchInput)
            console.log(response.data.results)
            // console.log(typeof response.data)
            // console.log(typeof response.data.results)
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

    const handleConnectBtn = (href)=>{
        console.log(href)
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
                                <h1>{e.rating}</h1>
                                <h1>{e.reviews}</h1>
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