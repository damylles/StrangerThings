import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = ({ authentication, setAuthentication }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <header>
          <div className="logo">
            <h1>Stranger's Thing</h1>
          </div>

          <nav>
            <div className="navbutton">
              <Link to="/">Home</Link>
            </div>

            <div className="navbutton">
              <Link to="/posts">Posts</Link>
              {authentication.isLoggedIn && (
                <div className="newbox">
                  <div className="dropdown">
                    <div className="navbutton">
                      <Link to="/createpost">Create Post</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {authentication.isLoggedIn && (
              <>
                <div className="navbutton">
                  <Link to="/profile">Profile</Link>
                </div>

                <div className="navbutton">
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setAuthentication({
                        token: undefined,
                        isLoggedIn: false,
                      });
                      navigate('/');
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </>
            )}

            {!authentication.isLoggedIn && (
              <div className="navbutton">
                <Link to="/login">Log In</Link>
              </div>
            )}
          </nav>
        </header>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
