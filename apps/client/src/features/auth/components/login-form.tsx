import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Anchor,
  Box,
  Title,
  Text,
  Checkbox,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated";
import useAuth from "@/features/auth/hooks/use-auth";
import APP_ROUTE from "@/lib/app-route";
import logo from "@/assets/lg.png";
import * as z from "zod";
import classes from "./login-peruclown.module.css";
import {ILogin} from "@/features/auth/types/auth.types.ts"; // ← Nuevo archivo de estilos

const formSchema = z.object({
  email: z.string().min(1, { message: "email is required" }).email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginForm() {
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuth();
  useRedirectIfAuthenticated();

  const form = useForm<z.infer<typeof formSchema>>({
    validate: zodResolver(formSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });


  return (
      <div className={classes.pageWrapper}>
        <div id="bg" className={classes.bg}></div>
        <Container size={420} className={classes.container}>
          <Box p="xl" className={classes.card}>
            <img src={logo} alt="PerúClown Logo" className={classes.logo} />
            <Title order={2} className={classes.title} style={{padding: "20px 0px"}}>¡Bienvenido! 👋</Title>
            <Text size="sm" c="dimmed" mb="md">Por favor ingrese sus credenciales para ingresar al sistema</Text>

            <form onSubmit={form.onSubmit((values) => signIn(values as ILogin))}>
              <TextInput
                  label="Email"
                  placeholder="Ingrese su correo electrónico"
                  {...form.getInputProps("email")}
              />

              <PasswordInput
                  label="Password"
                  placeholder="••••••••"
                  mt="md"
                  {...form.getInputProps("password")}
              />

              <Group justify="center" mt="sm">
                <Anchor  component={Link} to={APP_ROUTE.AUTH.FORGOT_PASSWORD} size="sm">
                  ¿Olvidaste tu Contraseña?
                </Anchor>
              </Group>

              <Button type="submit" fullWidth mt="lg" loading={isLoading}>
                Ingresar
              </Button>

              <Text mt="md" size="xs">
                <Anchor href="https://sales.peruclown.com/politicas/privacidad" target="_blank">
                  Mira nuestra política de privacidad
                </Anchor>
              </Text>
            </form>
          </Box>
        </Container>
      </div>
  );
}
