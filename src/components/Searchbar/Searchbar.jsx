import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt }   from 'react-icons/bi'
import { toast } from 'react-toastify';
import { SearchbarBox, SearchForm, Button, Input } from './Searchbar.styled';

export default function Searchbar({onSubmit}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      toast.error("Please fill in the input.");
      return;
    }
    onSubmit( searchQuery );
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarBox>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <BiSearchAlt size={26} />
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarBox>
  );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}