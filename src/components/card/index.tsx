"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

type Props = {
  url: string;
  Alt: string;
  href: string;
  title: string;
  writer: string;
  years: string; // Change to the appropriate type for years
  width: number;
  height: number;
  id: string;
};

const CardBook: React.FC<Props> = ({
  id,
  url,
  Alt,
  href,
  title,
  writer,
  years,
  height,
  width,
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(
    // Check if the book is already in favorites
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
    writer,
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
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <a href={href} className="group block">
        <div className="relative aspect-w-3 aspect-h-4">
          <Image
           width={width}
           height={height} 
            src={url}
            alt={Alt}
            layout="fill"
            objectFit="cover"
            className="hover:opacity-75"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{writer}</h3>
          <p className="text-lg text-gray-700">{title}</p>
          <p className="text-lg font-medium text-gray-900">{years}</p>
          <Button
            text={isFavorite ? 'Favorited' : 'Favorite'}
            onClick={toggleFavorite}
            className="bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
        </div>
      </a>
    </div>
  );
};

export default CardBook;
