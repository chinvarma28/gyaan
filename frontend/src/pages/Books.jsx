// import books from "../../public/books.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { useSearch } from "../store/search-context";
import { Link } from "react-router-dom";
// import Filter from "../components/filter";
import { useEffect, useState } from "react";
export default function Books() {
  const { searchQuery } = useSearch();
  const [activeTab, setActiveTab] = useState('all');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/book/all-books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));

    console.log('books:', books)
  }, []);

  const filterBooks = (type) => {
    return books.filter(book => {
      return (
        (type === 'all' || book.type.toLowerCase() === type) &&
        (searchQuery === '' ||
          book.name.toLowerCase().includes(searchQuery.toLowerCase()) 
          || (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    });
  };

  const filteredBooks = filterBooks(activeTab);

  const tabs = ['all', 'unani', 'siddha', 'ayurveda'];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 mt-3">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xl font-bold ${activeTab === tab ? 'text-black-500' : 'text-gray-500'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4  
    ">
        {filteredBooks.length > 0
          ? filteredBooks
            .sort((a, b) => b.rating - a.rating)
            .map((book, i) => (
              <div className="text-start" key={i}>
                <Card className="
            aspect-square rounded-t-lg h-[23rem] w-[19rem]
            ">
              <Link to={`/books/${book._id}`}>
                  <img src={book.image}
                    alt=""
                    className="w-full h-48 object-cover hover:opacity-80 transition-opacity duration-300 ease-in-out
                      "
                  />
                    <CardHeader className="rounded-lg">
                      <CardTitle className="truncate">{book.name}</CardTitle>
                      <CardDescription>
                        <div className="flex justify-between">
                          <p className="text-gray-400">Genre: {book.type}</p>
                          <p className="text-gray-400">Rating: {book.rating} &#9733;</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 truncate">By {book.author}</p>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            ))
          : (
            <div className="text-center text-gray-500">
              No items found.
            </div>
          )
        }
      </div>
    </div>

  );
}

