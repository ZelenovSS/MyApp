import axios from "axios"
import { useQuery } from 'react-query';

export const useNews = () => {
  const { isLoading, error, data, isFetching, refetch } = useQuery({
    queryKey: ['new'],
    queryFn: () => axios.get('https://sv443.net/jokeapi/v2/joke/Any?type=single').then(res => res.data),
  })

  return {
    isLoading, error, data, isFetching, refetch
  }
}