import { useEffect, useState, useCallback } from "react";

const storageName: string = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string | null | any>(null);
  const [userId, setUserId] = useState<string | null | any>(null);
  const [ready, setReady] = useState<boolean>(false);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        userId: id
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!);

    if (data && data.token) login(data.token, data.userId);
    setReady(true);
  }, [login]);
  return { login, logout, token, userId, ready };
};
