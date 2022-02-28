import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserByID, getUsers } from "../../Store/user/actions";
import Edit_icon from "../../Assets/icons/Edit.svg";
import Delete_icon from "../../Assets/icons/Delete.svg";
import ConfirmationAlert from "../../Components/ConfirmationAlert";
import ShopPagination from "../../Components/Pagination";
import Loader from "../../Components/Loader";
import UserSearch from "../../Components/UserSearch";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.Users);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [nameSelect, setNameSelect] = useState(false);
  const toggle = () => {
    setShowPromptPopUp(!showPromptPopUp);
  };

  console.log(Users);

  console.log(Users?.userList?.count);
  const basicRequest = {
    sort: "time_created",
    sort_order: "asc",
    page: 1,
    page_count: 10,
    keyword: "",
  };
  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    request && dispatch(getUsers(request));
  }, [request]);

  const handleAddClick = () => {
    navigate({ pathname: "/add-user" });
  };

  const okHandler = () => {
    dispatch(
      deleteUserByID({
        id: promptMessage.id,
        callback: () => dispatch(getUsers(request)),
      })
    );
  };

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure do you want to delete this user",
      type: "delete",
    });
  };

  return (
    <div>
      <h2 className="text-center my-5">Users</h2>
      <div className="container mt-3">
        <div>
          <UserSearch
            setRequest={setRequest}
            request={request}
            searchTerm={request.keyword}
            setNameSelect = {setNameSelect}
          />

<div >
                    {request.keyword.length && nameSelect
 ? (
                      <ul
                        className={`${
                          Users?.userList?.result?.length
                            ? "superstar-suggestion-list-container"
                            : "superstar-suggestion-empty-container"
                        } col-md-6`}
                      >
                        {Users?.userList?.result?.length
                          ?Users?.userList?.result?.map((user) => (
                              <li
                                key={user._id}
                                className=" superstar-suggestion-list"
                                value={user._id}
                                onClick={() => {
                                    setNameSelect(false)
                                    setRequest({...request,keyword:user.name});
                                  }}
                              >
                                <a
                                  className="cursor-pointer superstar-suggestion-list_link"
                           
                                >
                                  {user.name}
                                </a>
                              </li>
                            ))
                          : !Users?.loading && (
                              <li className="superstar-suggestion-list">
                                No data found
                              </li>
                            )}{" "}
                      </ul>
                    ) : null}
                  </div>
        </div>
        <div className="text-end mb-4">
          <button className="btn btn-danger" onClick={handleAddClick}>
            ADD
          </button>
        </div>
        {Users?.userList?.count ? (
          <table style={{overflowX:"auto"}}>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Description</th>
              <th>Gender</th>
              <th>Interest</th>
              <th>Created Time</th>
              <th>Action</th>
            </tr>
            {Users?.userList?.result?.length
              ? Users?.userList?.result?.map((user, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <div className="profileWrap" data-tag="allowRowEvents">
                        <div data-tag="allowRowEvents">
                          <img
                            data-tag="allowRowEvents"
                            className="table_profileImg"
                            src={user?.image && require(`../../../public/uploads/${user?.image}`)}
                          />
                        </div>
                      </div>
                    </td>
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
                        onClick={() => navigate(`/edit-user/${user?._id}`)}
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
              : null}
          </table>
        ) : 
            
            !Users.loading ?
          <div className="my-5">
            <p className="text-center my-5">No Users Available</p>
          </div>
         :null   
        }

    
        {Users?.userList?.count ? (
          <ShopPagination
            totalRecords={Users?.userList?.count}
            loading={Users?.loading}
            setRequest={setRequest}
            request={request}
          />
        ) : null}


      </div>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
        toggle={toggle}
      />
      {Users?.loading && <Loader darkBg={true} />}
    </div>
  );
};

export default UserList;
