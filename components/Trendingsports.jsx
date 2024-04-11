import React from 'react'
import NewsCard from './NewsCard'

const Trendingsports = ({articles}) => {
    const sortedArticles = articles?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return (
        <>
        <h2 className='font-bold text-black text-2xl md:p-[1rem]'>Trending</h2>
            <div className='bg-white grid md:grid-cols-3 max-md:grid-cols-2'>
            {sortedArticles?.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </>
    )
}

export default Trendingsports
