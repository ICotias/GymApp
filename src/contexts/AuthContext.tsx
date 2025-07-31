import { createContext, useEffect, useState } from "react";
import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import {
  storageUserGet,
  storageUserSave,
  storageUserRemove,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

export type AuthContextData = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

async function userAndTokenUpdate(
  userData: UserDTO,
  token: string,
  setUser: (user: UserDTO) => void
) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setUser(userData);
}

async function storageUserAndTokenSave(
  userData: UserDTO,
  token: string,
  setIsLoadingUserStorageData: (isLoading: boolean) => void
) {
  try {
    setIsLoadingUserStorageData(true);

    await storageUserSave(userData);
    await storageAuthTokenSave(token);
  } catch (error) {
    throw error;
  } finally {
    setIsLoadingUserStorageData(false);
  }
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("sessions", { email, password });
      if (data.user && data.token) {
        await storageUserAndTokenSave(
          data.user,
          data.token,
          setIsLoadingUserStorageData
        );
        userAndTokenUpdate(data.user, data.token, setUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token, setUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
