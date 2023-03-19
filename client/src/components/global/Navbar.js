import React from "react";
import "../../styles/global/Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbar">
      <div className="link-holder">
        {/* <Link
          className="patreon-link"
          to="https://patreon.com/user?u=90456358"
          target="_blank"
        >
          Patreon
        </Link> */}
        <Link
          className="discord-link"
          to="https://discord.gg/Vm3fc7yAYC"
          target="_blank"
        >
          Discord
        </Link>
        <Link
          className="github-link"
          to="https://github.com/mramazzini/Bit-By-Bit"
          target="_blank"
        >
          Github
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
