import React, { useState, useEffect } from "react";

const UserSearch = ({ setRequest, request, searchTerm }) => {
  let [searchText, setSearchText] = useState(searchTerm || "");

  useEffect(() => {
    setSearchText(searchTerm || "");
  }, [searchTerm]);

  const searchButtonHandler = () => {
    setRequest({ ...request, keyword: searchText });
  };

  const keyPressAction = (e) => {
    e.charCode === 13 && setRequest({ ...request, keyword: searchText });
  };
  return (
    <div>
      <div className="SearchWrapper">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="form-control tableSearchField"
          onKeyPress={(e) => keyPressAction(e)}
        />
        <div
          className="searchIconWrapper"
          onClick={() => searchButtonHandler()}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
