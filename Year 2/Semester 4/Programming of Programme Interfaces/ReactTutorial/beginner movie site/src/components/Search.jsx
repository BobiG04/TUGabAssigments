import React from 'react'
import SearchIcon from '../../public/search.svg'


const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src={SearchIcon} alt='search icon'/>

            <input
                type="text"
                placeholder='Search for movies...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search