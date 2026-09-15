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
import PrivateRoute from "./PrivateRoute"

function App() {


  return (
    <>
      <Routes >
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/allbook" element={<PrivateRoute><Allbook></Allbook></PrivateRoute>}></Route>
          <Route path="/bookdetails/:id" element={<PrivateRoute><BookDetails></BookDetails></PrivateRoute>}></Route>
          <Route path="/addbook" element={<PrivateRoute><Addbook></Addbook></PrivateRoute>}></Route>
          <Route path="/browwedbook" element={<PrivateRoute><BorrowedBook></BorrowedBook></PrivateRoute>}></Route>
        </Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        

      </Routes>
    </>
  )
}

export default App
