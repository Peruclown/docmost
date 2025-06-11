import { useState } from "react";
import * as z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import useAuth from "@/features/auth/hooks/use-auth";
import { IForgotPassword } from "@/features/auth/types/auth.types";
import {
  Box,
  Button,
  Container,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated";
import logo from "@/assets/lg.png";
import classes from "./login-peruclown.module.css";

const formSchema = z.object({
  email: z
      .string()
      .min(1, { message: "El correo es obligatorio" })
      .email({ message: "Correo inválido" }),
});

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading } = useAuth();
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);
  useRedirectIfAuthenticated();

  const form = useForm<IForgotPassword>({
    validate: zodResolver(formSchema),
    initialValues: {
      email: "",
    },
  });

  async function onSubmit(data: IForgotPassword) {
    if (await forgotPassword(data)) {
      setIsTokenSent(true);
    }
  }

  return (
      <div className={classes.pageWrapper}>
        <div id="bg" className={classes.bg}></div>
        <Container size="lg" className={classes.container}>
          <Box py="xl" px="xl" className={classes.card}>
            <img src={logo} alt="Logo PerúClown" className={classes.logo} />
            <Title order={2} className={classes.title} style={{ padding: "20px 0px" }}>
              Olvidé mi contraseña
            </Title>

            <form onSubmit={form.onSubmit(onSubmit)}>
              {!isTokenSent && (
                  <TextInput
                      id="email"
                      type="email"
                      label="Correo electrónico"
                      placeholder="correo@ejemplo.com"
                      {...form.getInputProps("email")}
                  />
              )}

              {isTokenSent && (
                  <Text mt="md">
                    Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.
                  </Text>
              )}

              {!isTokenSent && (
                  <Button type="submit" fullWidth mt="xl" loading={isLoading}>
                    Enviar enlace de restablecimiento
                  </Button>
              )}
            </form>
          </Box>
        </Container>
      </div>
  );
}
