import axios from "axios"
import { useEffect, useState } from "react"

const fetchData = (endpoint) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchingData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(endpoint)
      setLoading(false)
      setData(response.data.results)    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchingData()
  },[])
  return {data, loading}
}
export default fetchData