import React from 'react';
import { useForm } from 'react-hook-form';

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { handleSubmit, register } = useForm();

  const handleFormSubmit = (data: any) => {
    onSearch(data.searchTerm);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        type="text"
        name="searchTerm"
        placeholder="Cari judul buku..."
        className="border p-2 rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2">
        Cari
      </button>
    </form>
  );
};

export default SearchForm;
