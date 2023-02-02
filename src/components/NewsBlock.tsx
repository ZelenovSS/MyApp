import { FC } from 'react';

import Marquee from "react-fast-marquee";
import { useNews } from '../hooks/useNews';


export const NewsBlock: FC = () => {
  const { isLoading, error, data, refetch } = useNews();

  const fetchedData = () => {
    return error
      ? <div>Something went wrong</div>
      : isLoading
        ? <div>Loading...</div>
        : <Marquee
            className="news_block_content"
            speed={50}
            delay={1}
            onCycleComplete={refetch}
            gradient={false}
          >{data?.joke}</Marquee>
  }

  return (
    <div className="news_block">
      {fetchedData()}      
    </div>
  )
}