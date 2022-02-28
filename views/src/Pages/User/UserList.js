import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { deleteUserByID, getUsers } from "../../Store/user/actions";
import Edit_icon from "../../Assets/icons/Edit.svg";
import Delete_icon from "../../Assets/icons/Delete.svg";
import ConfirmationAlert from "../../Components/ConfirmationAlert";
import ShopPagination from "../../Components/Pagination";

const UserList = () => {
    const navigate = useNavigate()
    const dispatch =  useDispatch()
    const Users = useSelector((state) => state.Users);
    const [showPromptPopUp, setShowPromptPopUp] = useState(false);
    const [promptMessage, setPromptMessage] = useState({});
    const toggle = () =>{
      setShowPromptPopUp(!showPromptPopUp)
    }

    console.log(Users?.userList?.count);
    const basicRequest = {
      sort: "time_created",
      sort_order: "asc",
      page: 1,
      page_count: 3,  
    };
    const [request, setRequest] = useState({ ...basicRequest });
   
    useEffect(()=>{
      request && dispatch(getUsers(request))
    },[request])
    
    const handleAddClick=()=>{
        navigate({pathname:"/add-user"})
    }

    const okHandler = () => {
      dispatch(
        deleteUserByID({
          id: promptMessage.id,
          callback: () => dispatch(getUsers()),
        })
      );
    };

    console.log(Users);
  
    const deletePromptHandler = (id) => {
      setShowPromptPopUp(!showPromptPopUp);
      setPromptMessage({
        id: id,
        title: "",
        content: "Are you sure do you want to delete this user",
        type: "delete",
      });
    };


  return <div>
    <h2 className="text-center my-5">Users</h2>
    <div className="container mt-3">
    <div className="text-end mb-4">
    <button className="btn btn-danger" onClick={handleAddClick}>ADD</button>
    </div>
    <table>
        <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Gender</th>
            <th>Interest</th>
            <th>Created Time</th>
        </tr>
        {Users?.userList?.result?.length && 
            Users?.userList?.result?.map((user,i) =>(

        <tr>
            <td>{i+1}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.description}</td>
            <td>{user?.gender}</td>
            <td>{user?.interest}</td>
            <td>{user?.createAt}</td>
            <td>
            <button
            className="btn color-violet action-btn"
            title="Edit"
            onClick={() =>
                navigate(`/edit-user/${user?._id}`)
            }
          >
            <img src={Edit_icon} alt="Edit" />
          </button>
            </td>
            <td>
            <button
            onClick={() => deletePromptHandler(user._id)}
            className="btn color-red action-btn"
            title="Delete"
          >
            <img src={Delete_icon} alt="Delete" />
          </button>
            </td>
        </tr>
            ))
         }
    </table>

    <ShopPagination
                        totalRecords={4}
                        loading={Users?.loading}
                        setRequest={setRequest}
                        request={request}
                      />

    </div>

    <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
        toggle={toggle}
      />
  </div>;
};

export default UserList;
