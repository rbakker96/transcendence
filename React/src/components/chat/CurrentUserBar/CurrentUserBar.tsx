import Navbar from "react-bootstrap/Navbar";
import "./CurrentUserBar.css"

type CurrentUserBarType = {
  Avatar: string;
  UserName: string;
};

function CurrentUserBar(props: CurrentUserBarType) {
  return (
    <Navbar bg="dark" variant="dark" className="navbaruser">
      <Navbar.Brand>
        <img
          alt="Avatar"
          src={props.Avatar}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        {props.UserName}
      </Navbar.Brand>
    </Navbar>
  );
}

export default CurrentUserBar;
