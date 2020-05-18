import React, { useState } from "react";
import R from "./Photo/R.png";
import Popper from "popper.js";

export default function Hamburger() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogoutClick = () => {
    // setIsLoggedIn(false);
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          style={{ transition: "all .15s ease" }}
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
          className="block"
        >
          <img src={R} alt="drop down menu"></img>
        </button>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "text-base z-50 float-left list-none text-left right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-md"
          }
        >
          <a
            href="#"
            className="block px-4 py-2 text-RocketBlack hover:bg-RocketMeowth"
            onClick={(e) => e.preventDefault()}
          >
            support
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-RocketBlack hover:bg-RocketMeowth"
            onClick={(e) => e.preventDefault()}
          >
            account settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-RocketBlack hover:bg-RocketMeowth"
            onClick={(e) => {
              e.preventDefault();
              handleLogoutClick();
            }}
          >
            logout
          </a>
        </div>
      </div>
    </div>
  );
}
