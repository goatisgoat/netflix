import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { moviePagePass } from "../reducer/reducercollection/moviePageSlice";

const Navigation = () => {
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 검색값 입력
  const searchchChange = (e) => {
    e.preventDefault();
    if (e.target.value === null) {
      setSearch("");
      dispatch(moviePagePass.search({ search }));
    } else if (e.target.value) {
      setSearch(e.target.value);
      dispatch(moviePagePass.search({ search }));
    }
  };

  // 검색값 입력
  useEffect(() => {
    dispatch(moviePagePass.search({ search }));
  }, [search]);

  // 엔터누르면 페이지 이동
  const gotosearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/movies`);
    }
  };

  const goToEvent = () => {
    navigate(`/movies`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            to={"/"}
            width={80}
            src="https://blog.kakaocdn.net/dn/c4jzIT/btrghQIPMkh/sByblE0p50HHtMiEDdn8k1/img.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className="navbarLink" to={"/"} href="#action1">
              Home
            </Link>
            <Link className="navbarLink" to={"/movies"} href="#action2">
              Movies
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => searchchChange(e)}
              onKeyPress={(e) => gotosearch(e)}
            />
            <Button onClick={goToEvent} type="submit" variant="outline-danger">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
