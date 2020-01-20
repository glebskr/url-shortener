import { useEffect, useState, useCallback } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string | null | any>(null);
  const [userId, setUserId] = useState<string | null | any>(null);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: jwtToken,
        token: id
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!)

    if (data && data.token)
      login(data.token, data.userId) 
  }, [login])
  return {login, logout, token, userId}
};
