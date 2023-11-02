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
import { Button } from './ui/button';
import { useAuth } from '../store/auth-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

export default function Navbar() {
    const { setSearchQuery, searchQuery } = useSearch();
    const { isLoggedIn } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isLoggedIn) {
            fetch(`http://localhost:3000/user/profile?token=${token}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => setUserDetails(data))
                .catch(error => console.error('Error fetching user details:', error));
        }
        console.log('userDetails:', userDetails);
    }, [isLoggedIn]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
    };
    return (
        <nav className="bg-white py-4 px-0 border-b dark:bg-black">
            <div className="container mx-auto">
                <div className="flex justify-between items-center ">
                    <div className='flex items-center gap-4'>
                        <Link to="/">
                            <h1 className="text-black font-bold text-xl dark:text-white">Gyaan</h1>
                        </Link>
                        <div className="flex items-center">

                            <Input className="lg:w-96" placeholder="Search" value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery &&
                                <button
                                    // style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                    onClick={() => setSearchQuery('')}
                                    className='absolute  transform -translate-y-0 focus:outline-none translate-x-80 ml-5
                            '
                                >
                                    <XIcon className='text-gray-400 dark:text-gray-700' />
                                </button>
                            }
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center gap-4">
                        <ModeToggle />
                        {
                            isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                                                <AvatarFallback>SC</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {userDetails?.user?.username}
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {userDetails?.user?.role}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Link to="/about-us">
                                                    About Us
                                                </Link>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            Log out
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link to="/login">
                                    <Button variant="ghost">
                                        Login
                                    </Button>
                                </Link>
                            )
                        }
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
