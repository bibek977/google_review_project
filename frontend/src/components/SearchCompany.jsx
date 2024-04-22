import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const SearchCompany = () => {

    const searchCompany = async()=>{
        try{
            const response = await axios.post('http://127.0.0.1:8000/search/',{'title':'nabil bank'})
            console.log(response.data)
            return response.data
        }
        catch (error) {
            throw new Error(error);
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

    const sendData = async()=>{
        await searchCompanyMutate()
    }


  return (
    <>
        <button onClick={sendData}>Send Data</button>
    </>
  )
}

export default SearchCompany