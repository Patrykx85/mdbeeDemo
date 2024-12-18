import { Flex, Burger, Button, AppShell, Text } from "@mantine/core";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = ({ toggle, opened }: any) => {
  return (
    <AppShell.Header bg="#FF0000">
      <Flex
        justify="space-between"
        align="center"
        style={{ padding: "10px 20px 10px 20px" }}
      >
        <Text c={"#FFF"}>DentalBee Demo</Text>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Flex>
    </AppShell.Header>
  );
};

export default Header;
