import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const handleSearch = () => {
    setSearchQuery(query); // 검색 버튼 클릭 시 검색어 업데이트
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else {
      console.log('qw');
    }
  };

  return (
    <div className='searchContainer'>
      <input
        type='text'
        className='searchInput'
        placeholder='제목으로 검색'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className='searchButton' onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default SearchInput;
