import React, { useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const logoutModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {}, [isAuthenticated]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const openLogoutModal = () => {
    logoutModalRef.current?.showModal();
  };

  const handleConfirmLogout = () => {
    logout();
    logoutModalRef.current?.close();
  };

  const handleCancelLogout = () => {
    logoutModalRef.current?.close();
  };

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Movie
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/favorites" className="btn btn-ghost">
                  Favorites
                </NavLink>
              </li>
              <li>
                <button className="btn btn-error" onClick={openLogoutModal}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button className="btn" onClick={handleLoginClick}>
                Login
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Modal for logout confirmation */}
      <dialog ref={logoutModalRef} id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Logout</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleConfirmLogout}>
              Yes
            </button>
            <button className="btn" onClick={handleCancelLogout}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
