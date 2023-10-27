import books from "../../public/books.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearch } from "../store/search-context";
import { Link } from "react-router-dom";
import Filter from "../components/filter";
export default function Books() {
  const { searchQuery } = useSearch();
  const filteredBooks = searchQuery !== ''
    ? books.filter(book => book.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : books;
  return (
    <div className="flex flex-col gap-4">
      {/* <Filter /> */}
      <div className="
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 
    ">
        {filteredBooks.length > 0
          ? filteredBooks
            .sort((a, b) => b.rating - a.rating)
            .map((book, i) => (
              <div className="text-start" key={i}>
                <Link to={`/books/${i}`}>
                  <Card className="
            aspect-square rounded-t-lg
            ">
                    <img src="https://th.bing.com/th/id/R.847ff818eb060a80aa401c0273ee49ef?rik=PitBxG7NXly9yA&riu=http%3a%2f%2fi2.wp.com%2fgeekdad.com%2fwp-content%2fuploads%2f2013%2f02%2fHP1-Kibuishi.jpg&ehk=uafYYv3yMqpRGlecJf0Si6SPSZwksDcZUzc982%2byhlQ%3d&risl=&pid=ImgRaw&r=0"
                      alt=""
                      className="w-full h-48 object-cover hover:opacity-80 transition-opacity duration-300 ease-in-out
                  "
                    />
                    <CardHeader className="rounded-lg">
                      <CardTitle className="truncate">{book.name}</CardTitle>
                      <CardDescription>
                        <div className="flex justify-between">
                          <p className="text-gray-400">Genre: {book.genre}</p>
                          <p className="text-gray-400">Rating: {book.rating} &#9733;</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">By {book.author}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <p>
                          Buy for <span className="text-gray-400">₹ {book.price * 100}</span>
                        </p>
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
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

