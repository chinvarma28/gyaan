import { Input } from '@/components/ui/input'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useSearch } from '@/store/search-context';
import { Link } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi'
import { ModeToggle } from './mode-toggle';
export default function Navbar() {
    const { setSearchQuery } = useSearch();
  return (
      <nav className="bg-white p-4 border-b dark:bg-black">
          <div className="container mx-auto">
              <div className="flex justify-between items-center ">
                  <div className='flex items-center gap-4'>
                      <Link to="/">
                          <h1 className="text-black font-bold text-xl dark:text-white">Gyaan</h1>
                        </Link>
                      <Input className="lg:w-96" placeholder="Search"
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                  </div>
                  <div className="hidden md:flex space-x-4 items-center gap-4">
                      <ModeToggle/>
                      <GiBookshelf className="text-2xl text-black dark:text-white
                        hover:text-gray-400 transition-colors duration-300 ease-in-out
                      " />
                      <Avatar>
                          <AvatarImage src="https://www.bing.com/images/blob?bcid=rPTgXNTm2T0GbA" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                  </div>
                  <div className="md:hidden flex items-center">
                      <button id="burger-icon" className="text-black focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </nav>
  )
}
