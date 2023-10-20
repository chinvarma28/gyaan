import { useEffect, useState } from "react";
import books from "../../public/books.json";

export default function Books() {
  //   const [data, setData] = useState([]);
  //   const API_KEY = "BEuLuQH69zVvUK53VY3GiNRVu0v6wQay";
  //   const API_URL =
  //     "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
  //   useEffect(() => {
  //     const response = fetch(`${API_URL}?api-key=${API_KEY}`)
  //       .then((res) => res.json())
  //       .then((data) => setData(data));
  //   }, []);

  console.log(books);
  return (
    <div className="book-list">
      {books
        .sort((a, b) => b.rating - a.rating)
        .map((book) => (
          <div className="book-details">
            <p className="book-name">{book.name}</p>
            <p>{book.genre}</p>
            <p>
              {book.title} {book.author}
            </p>
            <p>Rs. {book.price * 100}</p>
            <p>{book.publisher}</p>
            <p className="book-rate">{book.rating} &#9733;</p>
          </div>
        ))}
    </div>
  );
}
