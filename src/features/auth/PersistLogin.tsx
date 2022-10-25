import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import { useAppSelector } from "../../app/hooks";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refresh] = useRefreshMutation();
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh().unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);
  }, [token, refresh]);

  if (isLoading) return null;
  return <Outlet />;
};

export default PersistLogin;
