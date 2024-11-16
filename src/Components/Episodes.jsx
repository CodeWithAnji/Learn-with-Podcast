import React from 'react';
const Episodes = ({ title, pubDate, link, mp3 }) => {
    return (
        <div className=' container1 '>
            <div className='cont11'>
                <a className='link' href={link} target='_blank' rel="noopener noreferrer"
                    
                >
                    <p className='title2'>{title}</p>
                </a>
                <audio className='audios' src={mp3} controls />
                <p className='date'>{pubDate}</p>
            </div>
            <div className='cont2'>
                <label>Make Notes Here</label>
                <textarea className='text' placeholder='what did you learn from this episode?' rows={5} />
            </div>
        </div>
    )
}

export default Episodes;
