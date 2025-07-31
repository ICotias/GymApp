import React, { useState, useRef } from "react";
import { Button } from "@components/button";
import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { View, Image, Text, TextInput, ScrollView, Alert } from "react-native";
import { Input } from "@components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const signUpSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: yup
      .string()
      .required("Confirmação de senha é obrigatória")
      .oneOf([yup.ref("password")], "As senhas não coincidem"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = async ({ name, email, password }: SignUpFormData) => {
    setIsLoading(true);
    try {
      await api.post("users", {
        name,
        email,
        password,
      });

      Alert.alert(
        "Conta criada com sucesso",
        "Você será direcionado sua conta"
      );
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao cadastrar";
      Alert.alert(title, "Não foi possível cadastrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={BackgroundImg}
        accessibilityLabel="Pessoas treinando"
        defaultSource={BackgroundImg}
        resizeMode="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 40,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Logo />
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Treine sua mente e o corpo
          </Text>
        </View>

        <View style={{ flex: 1, gap: 15 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Crie sua conta
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={nameRef}
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                isErrored={!!errors.name}
                errorMessage={errors.name?.message}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={emailRef}
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                isErrored={!!errors.email}
                errorMessage={errors.email?.message}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={passwordRef}
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                isErrored={!!errors.password}
                errorMessage={errors.password?.message}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={confirmPasswordRef}
                placeholder="Confirmar senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                isErrored={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleSignUp)}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />

          <Button
            title="Voltar para o login"
            onPress={() => {
              navigation.goBack();
            }}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
