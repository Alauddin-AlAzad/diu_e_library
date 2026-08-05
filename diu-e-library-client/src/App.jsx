import { Route, Routes } from "react-router"
import Root from "./Layout/Root"
import Home from "./pages/Home"
import Allbook from "./pages/Allbook"
import ErrorPage from "./pages/ErrorPage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import BookDetails from "./pages/BookDetails"
import Addbook from "./pages/Addbook"
import BorrowedBook from "./pages/BorrowedBook"

function App() {


  return (
    <>
      <Routes >
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/allbook" element={<Allbook></Allbook>}></Route>
          <Route path="/bookdetails/:id" element={<BookDetails></BookDetails>}></Route>
          <Route path="/addbook" element={<Addbook></Addbook>}></Route>
          <Route path="/browwedbook" element={<BorrowedBook></BorrowedBook>}></Route>
        </Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        

      </Routes>
    </>
  )
}

export default App
