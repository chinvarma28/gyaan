import './App.css'
import Books from '@/pages/Books'
import Navbar from './components/navbar'
import { SearchProvider } from './store/search-context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './pages/book';
import { ThemeProvider } from './store/theme-providor';
import { Login } from './pages/login';
function App() {

  return (
    <>
      <Router>
        <SearchProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
            <div className="px-32">
              <Navbar />
              <Routes>
                <Route element={<Books />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<Book />} path="/books/:id" />
              </Routes>
            </div>
          </ThemeProvider>
        </SearchProvider>
      </Router>
    </>
  )
}

export default App
