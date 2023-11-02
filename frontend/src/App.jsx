import './App.css'
import Books from '@/pages/books'
import Navbar from './components/navbar'
import { SearchProvider } from './store/search-context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './pages/book';
import { ThemeProvider } from './store/theme-providor';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './store/auth-provider';
import AboutUs from './pages/about-us';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <SearchProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
              <div className="lg:px-32">
                <Navbar />
                <Toaster />
                <Routes>
                  <Route element={<Books />} path="/" />
                  <Route element={<Login />} path="/login" />
                  <Route element={<Register />} path="/register" />
                  <Route element={<Book />} path="/books/:id" />
                  <Route element={<AboutUs/>} path='about-us' />
                </Routes>
              </div>
              {/* <Footer /> */}
            </ThemeProvider>
          </SearchProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
