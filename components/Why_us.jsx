import React from 'react'

const Why_us = () => {
    const data = [
        {
            title: 'Unmatched Selection Of Sports',
            desc: 'Balldraft offers the most comprehensive selection of sports in the fantasy sports industry, so you’ll never run out of options. We’ve got you covered in all aspects of our available local games like UFC, NBA, and Soccer.',
        },
        {
            title: 'Easy-To-Use Interface',
            desc: 'Our platform - Balldraft is designed for ease of use, so you can focus on winning instead of figuring how to use the system.',
        },
        {
            title: 'Industry-Leading Analytics',
            desc: 'Balldraft provides the most comprehensive and accurate analytics in the industry, so you can make informed decisions about your desired team.',
        },
        {
            title: 'Deep Pool Of Players',
            desc: 'Balldraft has one of the largest player pools in the industry of fantasy sports, so you’ll never run out of options when it comes to building your team',
        },
        {
            title: 'Diverse Scoring Systems',
            desc: 'Balldraft offers a variety of scoring systems to choose from, so yu can find the one that best fits your style of play',
        },
        {
            title: 'Friendly COmmunity',
            desc: 'Balldraft’s community is one of the friendiest and most supportive in the fantasy sports industry, so you can easily be sure to find a welcoming environment.',
        },
    ]
  return (
    <div className='bg-white'>
      <h2 className='text-center text-4xl text-black py-[1rem]'>Why Choose Us</h2>
      <div className='grid md:grid-cols-2 gap-4 md:p-[1rem]'>
       {data.map((info, index) => {
              return (
                <div key={index} className='flex items-center justify-between p-4  my-[1rem]'>
                     <aside>
                          <h3 className='text-black font-bold md:text-2xl text-xl'>{info.title}</h3>
                          <p className='mt-[1rem] text-gray-500'>{info.desc}</p>
                     </aside>
                </div>
              )
       })}
      </div>
    <div className='w-4/5 m-auto text-center pb-[3rem]'>
    <p>Balldraft’s support team is always available to answer any questions or resolve any issues you may have. You can reach out to them via email or phone, and they’ll get back to you as soo as possible. They’re always happy to help and they’re some of the most knowledgeable and friendly people you’ll ever meet.</p>
      <p className='md:text-3xl p-[0.5rem] rounded-md bg-[#888888] text-white md:w-4/5 m-auto mt-[1rem]'>In Need Of Help? Send A Mail to - accounts@balldraft.com</p>
    </div>
    </div>
  )
}

export default Why_us
