import React, { useRef, useState } from "react";
import { View, Image, Text, TextInput, ScrollView } from "react-native";
import { Input } from "@components/input";
import { Button } from "@components/button";
import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useAuth } from "@hooks/useAuth";
type SignInFormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = async ({ email, password }: SignInFormData) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Email/Senha incorretos";
      ToastMessage({
        type: "error",
        title,
        message: "Não foi possível fazer login",
      });
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
          paddingTop: 100,
          paddingHorizontal: 40,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            Acesse sua conta
          </Text>

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
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          {isLoading ? (
            <Button isLoading={isLoading} />
          ) : (
            <Button
              title="Entrar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          )}
          <Button
            title="Criar nova conta"
            onPress={() => navigation.navigate("SignUp")}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
