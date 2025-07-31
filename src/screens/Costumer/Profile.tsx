import { Header } from "@components/header";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { UserPhoto } from "@components/userPhoto";
import { Input } from "@components/input";
import { Button } from "@components/button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ToastMessage } from "@components/ToastMessage";
import { useAuth } from "@hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormDataProps = {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string | undefined;
  confirmPassword: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().email("E-mail inválido").required("Informe o e-mail."),
  oldPassword: yup.string().required("Informe a senha atual."),
  newPassword: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirmPassword: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf(
      [yup.ref("newPassword"), null],
      "A confirmação de senha não confere."
    ),
});

export function Profile() {
  const inputRefName = useRef<TextInput>(null);
  const inputRefEmail = useRef<TextInput>(null);
  const inputRefOldPassword = useRef<TextInput>(null);
  const inputRefNewPassword = useRef<TextInput>(null);
  const inputRefConfirmPassword = useRef<TextInput>(null);
  const { user } = useAuth();
  const [userPhoto, setUserPhoto] = useState(user.avatar);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      oldPassword: user.password,
      // newPassword: "",
      // confirmPassword: "",
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 1,
        allowsEditing: true,
      });

      const photoURI = photoSelected.assets?.[0]?.uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        const photoSizeInMB = photoInfo.size / (1024 * 1024);

        if (photoSizeInMB > 5) {
          ToastMessage({
            type: "error",
            title: "Imagem muito grande",
            message: "Por favor, selecione uma imagem menor que 5MB.",
          });
          return;
        }
      }
      if (photoURI) {
        setUserPhoto(photoURI);
      }
    } catch (error) {
      ToastMessage({
        type: "error",
        title: "Erro",
        message: "Não foi possível selecionar a foto. Tente novamente.",
      });
    }
  }

  function handleProfileUpdate(data: FormDataProps) {
    console.log("Dados válidos:", data);
  }

  return (
    <>
      <Header title="Perfil" variant="default" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#121214",
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
              }}
            >
              <UserPhoto width={150} height={150} source={{ uri: userPhoto }} />
              <TouchableOpacity
                onPress={handleUserPhotoSelect}
                style={{ alignItems: "center" }}
              >
                <Text
                  style={{
                    color: "#00B37E",
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  Alterar foto
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingHorizontal: 40,
                  width: "100%",
                  flex: 1,
                  gap: 50,
                }}
              >
                <View style={{ gap: 20 }}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={inputRefName}
                        variant="onEditing"
                        placeholder={user.name}
                        keyboardType="default"
                        onSubmitEditing={() => inputRefEmail.current?.focus()}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={inputRefEmail}
                        variant="onDisabled"
                        placeholder={user.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>

                <View style={{ gap: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Alterar senha
                  </Text>
                  <Controller
                    control={control}
                    name="oldPassword"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={inputRefOldPassword}
                        variant="onDisabled"
                        placeholder={user.password}
                        keyboardType="default"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={inputRefNewPassword}
                        variant="onEditing"
                        placeholder="Nova senha"
                        keyboardType="default"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        ref={inputRefConfirmPassword}
                        variant="onEditing"
                        placeholder="Confirmar nova senha"
                        keyboardType="default"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                        isErrored={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                      />
                    )}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "flex-end",
                    marginTop: "auto",
                    marginBottom: 30,
                  }}
                >
                  <Button
                    title="Atualizar"
                    onPress={handleSubmit(handleProfileUpdate)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
