import './App.css'
import Navbar from './components/custom/Navbar.jsx'
import Footer from './components/custom/footer'
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Footer />
    </>
  )
}

export default App
