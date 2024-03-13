import Logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

const Advertisement = () => {
  return (
    <div className="advertisement layout__footer-contain">
        <div className="util__logo">
          <Link to="/">
            <img width="200" height="100" src={Logo} alt="noithatbanghe" />
          </Link>
        </div>
        <div className="advertisement__content">
            <p>Reveal yourself through your choice</p>
        </div>
    </div>
  );
};

export default Advertisement;
