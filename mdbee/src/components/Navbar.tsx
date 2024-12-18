import { AppShell, Divider, NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <AppShell.Navbar p="md" style={stylingObject.navbar}>
      <NavLink label="Add Note" onClick={() => navigate("/add")} />
      <NavLink label="All Notes" onClick={() => navigate("/packages")} />

      <Divider my="md" />
      <NavLink label="Log out" onClick={logout} />
    </AppShell.Navbar>
  );
};

export default Navbar;

const stylingObject = {
  navbar: {
    paddingBottom: "40px",
  },
};
