"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookSearchComponent: React.FC = () => {
    const { booksId } = useParams();
    const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes/${booksId}`;

        axios.get(apiUrl)
          .then(response => {
            setBookDetails(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    };

    fetchData();
  }, [booksId]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  const { volumeInfo } = bookDetails;

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
      className='bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
      onClick={() => sortBooks('publishDate')}/>
      </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading?(<Loading/>): (
         <div className="bg-white">
         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
           <h2 className="sr-only">Books</h2>
      <ul className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>  
        {books.map ((book)=> {
          <Link to={`/books/${book.id}`} key={book.id}></Link>
          return (
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
          )
        })}
      </ul>
      </div>
      <BookDetail/>
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
