import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import RouterSwitcher from "./components/RouterSwitcher";
import { FC, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthService from "./services/auth.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLogged(true);
    }
  }, []);
  const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
    console.log("0xxxxxxxxxxxxxxxxxxxx");
    if (!isLogged) {
      console.log("1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      return <Navigate to={"/login"} />;
      // return <LoginPage />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <AppShell
                header={{ height: 60 }}
                navbar={{
                  width: 300,
                  breakpoint: "sm",
                  collapsed: { mobile: !opened },
                }}
                padding="md"
              >
                <Header toggle={toggle} opened={opened} />
                <Navbar />
                <AppShell.Main bg={"#F1F3F5"}>
                  <RouterSwitcher />
                </AppShell.Main>
              </AppShell>
            </RequireAuth>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
