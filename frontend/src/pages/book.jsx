import { useParams } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import { useAuth } from '../store/auth-provider';
export default function Book() {
    const { id } = useParams();
    const { toast } = useToast();
    const { isLoggedIn } = useAuth();
    console.log(id);
    const [reviewText, setReviewText] = useState('');
    const [reviewBody, setReviewBody] = useState('');

    const [book, setBook] = useState([]);
    const [stars, setStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const [reviews, setReviews] = useState([]);

    const handleStarClick = (star) => {
        setStars(star);
    };
    const handleStarHover = (star) => {
        setHoveredStars(star);
    };

    useEffect(() => {
        fetch(`http://localhost:3000/book/all-books/${id}`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error fetching books:', error));


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

        fetch(`http://localhost:3000/reviews/${id}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));

        console.log(reviews);

    }, []);

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookId: id,
                    title: reviewText,
                    content: reviewBody,
                    rating: stars,
                    userId: userDetails?.user?._id
                })
            });

            if (response.ok) {
                console.log('Review created successfully');
                setReviewText('');
                setReviewBody('');
                setStars(0);
                toast({
                    title: 'Review created successfully',
                    description: 'Your review has been created successfully',
                })
            } else {
                console.error('Error creating review:', response.statusText);
                toast({
                    title: 'Error',
                    description: 'Error creating review',
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.error('Error creating review:', error);
            toast({
                title: 'Error',
                description: 'Error creating review',
                variant: 'destructive'
            })
        }
    };

    return (
        <div className='flex'>
            <div className='w-96 px-10 mt-10 flex flex-col gap-4'>
                <img src={book.image}
                    alt=""
                    className="w-full  object-cover hover:opacity-80 transition-opacity duration-300 ease-in-out rounded-lg 
                  "
                />
                {
                    book.link ? (
                        <Button className="w-full">
                            <a href={book.link} target="_blank" rel="noreferrer">
                                Download <Download className="inline-block" size={16} />
                            </a>
                        </Button>
                    ) : null
                }
            </div>
            <div className='
            flex flex-col w-full h-full
            '>
                <div className='px-10 mt-10'>
                    <h1 className='text-3xl font-bold'>
                        {book.name}
                    </h1>
                    <p className='text-gray-400'>By {book.author}</p>
                    <p className='text-gray-400'>Type: {book.type}</p>
                    <p className='text-gray-400'>Rating: {book.rating} &#9733;</p>
                    <p className='text-gray-400'>Price: ₹ 100</p>
                </div>
                <div className='px-10 mt-10'>
                    <p className='text-justify'>
                        {book.description}
                    </p>
                </div>
                <div className='flex flex-col mt-16 px-10 gap-4'>
                    <div className='flex gap-2'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => handleStarHover(star)}
                                onMouseLeave={() => handleStarHover(0)}
                                onClick={() => handleStarClick(star)}
                                className={`text-2xl ${(hoveredStars >= star || stars >= star) ? 'text-yellow-400' : 'text-gray-300'
                                    } cursor-pointer`}
                            >
                                &#9733;
                            </button>
                        ))}
                    </div>
                    <Input placeholder='Enter your review'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <Textarea placeholder='Enter your review'
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                    />
                    <Button
                        onClick={handleReviewSubmit}
                    >
                        Submit Review
                    </Button>
                </div>

                <div className='px-10 mt-10'>
                    <h1 className='text-3xl font-bold'>
                        Reviews
                    </h1>
                    {
                        reviews.map((review, i) => (
                            <div className='mt-4' key={i}>
                                <p className='text-gray-400'>By {review?.userId?.username}</p>
                                <p className='text-gray-400'>Rating:{review.rating.toFixed(2)} &#9733;</p>
                                {
                                    userDetails?.user?.role === 'teacher' && (
                                        <Button
                                            variant='ghost'
                                            className='text-yellow-500'
                                        >
                                            A teacher reviewed this book
                                        </Button>
                                    )
                                }
                                <p className='text-justify'>
                                    {review.content}
                                </p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div >
    )
}
