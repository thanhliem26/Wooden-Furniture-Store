import { useEffect, useRef, useState } from "react";
import styled from "./index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "@/utils/debounce";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { searchUser, setPagination } from "@/store/manageUser";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const pagination = useAppSelector((state) => state.manageUser.pagination);

  const dispatch = useAppDispatch();
  const inputSearch = useRef<any>(null);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setPagination({current: 1}))
  };
  
  const debounceSearch = debounce(onChangeSearch, 500);
  const handleResetSearch = () => {
    inputSearch.current.value = ''
    setSearch("");
    dispatch(setPagination({current: 1}))
  };

  useEffect(() => {
    dispatch(searchUser({search, params: {page: pagination.current, limit: pagination.pageSize}}));
  }, [search, pagination]);

  return (
    <div className={styled["search__user"]}>
      <div className="search__user-contain">
        <div className="search__icon">
          <SearchOutlined />
        </div>
        <div className="search__content">
          <input
            ref={inputSearch}
            placeholder="Search users"
            onChange={debounceSearch}
          />
        </div>
        <div className="search__icon-delete" onClick={handleResetSearch}>
            X
          </div>
      </div>
    </div>
  );
};

export default SearchUser;
