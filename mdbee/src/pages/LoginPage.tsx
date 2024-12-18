import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Stack,
  Flex,
} from "@mantine/core";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props: PaperProps) {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const login = (values: any) => {
    console.log('444xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    AuthService.login(values.email, values.password).then(
      () => {
        console.log('333xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        navigate("/");
      },
      (error) => {

        console.log('5555xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(error.message)
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      },
    );
  };

  const goToRegister = () => {
    navigate("/register")
  }


  return (
    <div
      style={{ height: "100vh", background: "#FF0000", position: "relative" }}
    >
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 36,
          position: "absolute",
          top: 0,
        }}
      >
        <Paper
          shadow="md"
          p={30}
          bg="white"
          style={{
            width: "380px",
            justifySelf: "center",
          }}
        >
          <form onSubmit={form.onSubmit(login)}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="enter you email"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />
            </Stack>
            <Flex justify={"space-between"}>
              <Group justify="left" mt="xl">
                <Button onClick={goToRegister} bg={"#FFF"} c={"#FF0000"}>
                  Register
                </Button>
              </Group>
              <Group justify="right" mt="xl">
                <Button type="submit" radius="s" bg={"#FF0000"}>
                  Login
                </Button>
              </Group>
            </Flex>
          </form>
        </Paper>
      </div>
    </div>
  );
}
