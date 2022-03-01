import { Navigate, Route, Routes } from "react-router-dom";
import AddUser from "./Pages/User/AddUser";
import EditUser from "./Pages/User/EditUser";
import UserList from "./Pages/User/UserList";

const App = () => {
  return <div>


<Routes>
    <Route exact path="/"   element={<UserList/>}  />
      <Route path="/user-list" element={<UserList/>}  />
      <Route path="/add-user" element={<AddUser/>}  />
      <Route path="/edit-user/:id" element={<EditUser/>}  />
    </Routes>
  </div>;
};
export default App