import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/Home">
      <img className="w-8 h-8" src="/Logo/logoTaj.png" alt="Taj Cinema Logo" />
    </Link>
  );
}

export default Logo;
