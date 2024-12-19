import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Stack,
} from "@mantine/core";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(props: PaperProps) {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 8 characters"
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const register = (values: any) => {
    AuthService.register(values.email, values.password).then(
      () => {
        // TODO add modal with in "you can now login"
        navigate("/login");
      },
      (error) => {
        console.log(error.message);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      },
    );
  };

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
          <form onSubmit={form.onSubmit(register)}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
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
                  "Password should include at least 8 characters"
                }
                radius="md"
              />
              <PasswordInput
                required
                label="Confirm password"
                placeholder="Confirm your password"
                value={form.values.confirmPassword}
                onChange={(event) =>
                  form.setFieldValue(
                    "confirmPassword",
                    event.currentTarget.value,
                  )
                }
                error={form.errors.confirmPassword}
                radius="md"
              />
            </Stack>
            <Group justify="right" mt="xl">
              <Button type="submit" radius="s" bg={"#FF0000"}>
                Register
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </div>
  );
}
