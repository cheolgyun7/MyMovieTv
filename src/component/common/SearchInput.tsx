import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(query);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [query, setSearchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <input
        type='text'
        placeholder='제목으로 검색'
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
