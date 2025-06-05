import React from 'react'

const MovieCard = ({ movie:
    { title, vote_average, poster_path, release_date, original_language }
}) => {
    return (
        <div className='movie-card'>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '../../public/no-movie.png'}
                className='poster'
                alt={title}
            />

            <div className='mt-4'>
                <h3 className='text-center'>{title}</h3>

                <div className='meta'>
                    <div className='rating'>
                        <img className='star' src='../../public/star.svg' alt='Star Icon' />
                        <p className='text-center uppercase'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className='lang uppercase'>{original_language}</p>

                    <span>•</span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;