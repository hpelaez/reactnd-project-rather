import { NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import AuthedUser from "./AuthedUser";

function Header(props) {
  const { pathname } = useLocation();

  const Links = [
    { targetPage: "/", label: "Home" },
    { targetPage: "/add", label: "New Question" },
    { targetPage: "/leaderboard", label: "Leader Board" },
  ];

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto m-auto justify-content-center text-center">
            {Links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.targetPage}
                  isActive={() => link.targetPage.includes(pathname)}
                  activeClassName={link.targetPage === pathname ? 'text-decoration-underline' : ''}
                  className="nav-link px-2 text-white"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="text-end">
            <AuthedUser />
          </div>
        </div>
      </div>
    </header>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Header);
