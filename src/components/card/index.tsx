import Image from 'next/image'
import Button from '../Button';

type Props = {
  url : string
  Alt : string
  href : string
  title : string
  writer : string
  years : React.ReactNode
  width :number
  height: number
}
const CardBook = ({url, Alt, href, title, writer, years,height,width} : Props) => {
    return (
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only flex flex-row">Books</h2>
        <div>
          <a href={href} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image 
              src={url}
              width={width}
              height={height} 
              alt={Alt}
              className="h-full w-full object-cover object-center hover:opacity-75">
                </Image>
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{writer}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">{years}</p>
            <Button
              text="Favorite"
              className='bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
              />
          </a>
          </div>
              </div>
          </div>
)
    }
export default CardBook;