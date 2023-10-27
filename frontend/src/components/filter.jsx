import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import books from "../../public/books.json";


export default function Filter() {
  return (
      <div>
          <Sheet>
              <SheetTrigger>
                  <Button variant='ghost'>
                      Filter
                  </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                  <SheetHeader>
                      <SheetTitle>Filter</SheetTitle>
                      <SheetDescription>
                          <Select>
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder="book" />
                              </SelectTrigger>
                              <SelectContent>
                                  {
                                        books.map((book, i) => (
                                            <SelectItem key={i}>
                                                {book.genre}
                                            </SelectItem>
                                        ))
                                  }
                              </SelectContent>
                          </Select>
                      </SheetDescription>
                  </SheetHeader>
              </SheetContent>
          </Sheet>

    </div>
  )
}
