"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

type Props = {
  title: string;
  years: string;
  author: string;
  width: number;
  height: number;
  url: string;
  Alt: string;
  href: string;
  id: string;
};

const BookList: React.FC<Props> = ({
  title,
  years,
  author,
  width,
  height,
  url,
  Alt,
  href,
  id,
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem('favoriteBooks') || '[]').some(
      (book: { id: string }) => book.id === id
    )
  );

  const toggleFavorite = () => {
    
    const storedFavoriteBooks = localStorage.getItem('favoriteBooks') || '[]';
  const favoriteBooks: Props[] = JSON.parse(storedFavoriteBooks);
  const bookToAddOrRemove = {
    id,
    title,
    author,
    years,
    url,
    Alt,
    width,   // Include necessary properties from Props type
    height,  // Include necessary properties from Props type
    href,    // Include necessary properties from Props type
  };

  if (!isFavorite) {
    favoriteBooks.push(bookToAddOrRemove);
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  } else {
    const updatedBooks = favoriteBooks.filter(
      (favoriteBook: Props) => favoriteBook.id !== id
    );
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedBooks));
  }

  setIsFavorite(!isFavorite);
};
  return (
    <div className="flex flex-1 flex-col mt-8">
      <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6">
              <div className="h-48 w-48 overflow-hidden rounded-md border border-gray-200">
                <Image
                width={width}
                height={height} 
                src={url} alt={Alt} 
                className="h-full w-full object-cover object-center"/>
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={href}>{title}</a>
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{author}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">{years}</p>
                  <div>
        <Button
          text={isFavorite ? 'Favorited' : 'Favorite'}
          onClick={toggleFavorite}
          className="bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>
                </div>
              </div>
            </li>
            </ul>
            </div>
            </div>
  );
};

export default BookList;
