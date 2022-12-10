import { ExitToAppOutlined, SearchOutlined, VideoCallOutlined } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../store/store";
import { logout } from "../store/user/userSlice";
import { resetQuery, setQuery } from "../store/video/videoSlice";
import { Upload } from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
  outline: 0.5px solid #ccc;
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 7px 3px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { actualQuery } = useSelector((state: RootState) => state.video);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleNavigate = () => {
    if (actualQuery) {
      navigate(`/search?q=${actualQuery}`);
      dispatch(resetQuery());
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={handleSearch} value={actualQuery} />
            <SearchOutlined onClick={handleNavigate} style={{ cursor: "pointer" }} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined onClick={() => setOpen(true)} style={{ cursor: "pointer" }} />
              {currentUser.img && <Avatar src={currentUser.img ? currentUser.img : ""} />}
              {currentUser.name}
              <ExitToAppOutlined
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              ></ExitToAppOutlined>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};
