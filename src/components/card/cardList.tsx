"use client"
import React, {useState } from 'react';
import Image from "next/image";
import Button from "../Button";
type Props = {
    title:string,
    years:string,
    author:string,
    text:string,
    years1:string,
    width:number,
    height:number,
    url:string,
    Alt:string
}

const CardList = ({title,years,author,text,years1, width,height,url,Alt,href}: Props) => {
    const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    // Get existing saved books from local storage or initialize an empty array
    const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
      book = null
    if (!isFavorite) {
      // Add the book to the savedBooks array if it's not already saved
      favoriteBooks.push(book);
      localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
    } else {
      // Remove the book from the savedBooks array if it's already saved
      const updatedBooks = favoriteBooks.filter(favoriteBook => favoriteBook.id !== book.id);
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedBooks));
    }

    // Toggle the saved state
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

                  <div className="flex">
                  <Button
                text={isFavorite?"favorited" : "favorite"}
                // onClick={toggleFavorite}
                className='bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
                />
                  </div>
                </div>
              </div>
            </li>
            </ul>
            </div>
            </div>
    )
    
}
export default CardList;