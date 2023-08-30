"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardBook from '@/components/card';
import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import NavBar from '@/components/Nav';
import Button from '@/components/Button';
import Link from 'next/link';
import CardList from '@/components/card/cardList';


const BookSearchComponent: React.FC = () => {
  const { register, handleSubmit, formState: { errors },setValue,getValues } = useForm();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=search+terms&startIndex=${startIndex}`;
      try {
        setLoading(true)
        setError(null);
        const response = await axios.get(apiUrl);
        setBooks(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(alert("Failed"));
        setLoading(false)
      }
    };

    fetchData();
  }, [startIndex]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(data.title)}`);
      setBooks(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  const sortBooks = (field) => {
    const sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
      if (field === 'title') {
        return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
      } else if (field === 'publishDate') {
        const dateA = a.volumeInfo.publishedDate || '0000-01-01';
        const dateB = b.volumeInfo.publishedDate || '0000-01-01';
        return dateA.localeCompare(dateB);
      }
    });
    setBooks(sortedBooks);
  };
  const goToPreviousPage = () => {
    if (startIndex >= 10) {
      setStartIndex(startIndex - 10);
    }
  };

  const goToNextPage = () => {
    setStartIndex(startIndex + 10);
  };
  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };
  
  return (
    <div>
      <div className='header'>
        <NavBar/>
        <form className='bg-slate-400 float-right px-4 py-3 rounded-full' onSubmit={handleSubmit(onSubmit)}>
         <input className='mx-8' {...register("title", { required: true })} />
         <button type="submit" className='text-sm font-semibold text-gray-900'>Search<span aria-hidden="true">&rarr;</span></button>
       </form>
       <div className='flex mx-4'>
       <Button 
       text='Sort by Title'
       className="bg-indigo-600 px-3 py-2 mx-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       onClick={() => sortBooks('title')}/>
      <Button 
      text='Sort by Publish Date'
      className='bg-indigo-600 px-3 py-2 text-sm mx-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
      onClick={() => sortBooks('publishDate')}/>
      <Button
          className="bg-indigo-600 px-3 py-2 text-sm mx-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={toggleViewMode}
          text={viewMode === 'grid' ? 'List' : 'Grid'}
        />
      </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading?(<Loading/>): (
         <div className="bg-white">   
        {books.map ((book)=> {
          <Link to={`/books/${book.id}`} key={book.id}></Link>
          return (
            viewMode === 'grid'?(
              <CardBook
              href={`/books/${book.id}`}
              width={320}
              height={270}
              key={book.id}
              url={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
              Alt={book.volumeInfo.publisher} 
              title={book.volumeInfo.title} 
              writer={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Tidak ada informasi penulis'}
              years={book.volumeInfo.publishedDate}
              />
              ):(<CardList
                href={`/books/${book.id}`}
                width={320}
                height={270}
                key={book.id}
                url={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
                Alt={book.volumeInfo.publisher} 
                title={book.volumeInfo.title} 
                author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Tidak ada informasi penulis'}
                years={book.volumeInfo.publishedDate}
              />)
          )
        })}
      <div>
      <div className='flex justify-center'>
      <Button
      text='Previous Page' 
      onClick={goToPreviousPage} 
      className='bg-indigo-600 px-3 py-2 mx-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      disabled={startIndex === 0}/>
      <Button
      text='Next Page'
      className='bg-indigo-600 px-3 py-2 mx-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      onClick={goToNextPage} 
      />
      </div>  
      </div>
      </div>
      )
      
      }
      
    </div>
  );
};

export default BookSearchComponent;
