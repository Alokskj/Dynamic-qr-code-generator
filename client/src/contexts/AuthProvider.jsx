import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/v1/user", {
          credentials: "include",
        });
        const res = await response.json();
        if (res.data) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const register = async (email, password) => {
    try {
      const data = await fetch("/api/v1/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const res = await data.json();
      if (res.success) {
        toast.success("User registred successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await fetch("/api/v1/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const res = await data.json();
      if (res.success) {
        toast.success("User Logged in successfully");
        setUser(res.data.LoggedInUser);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const signinWithGoogle = async (name, email, profilePicture) => {
    try {
      const data = await fetch("/api/v1/auth/google", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ email, name, profilePicture }),
      });
      const res = await data.json();
      if (res.success) {
        toast.success("User Logged in successfully");
        setUser(res.data.LoggedInUser);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, login, register,signinWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};
export default AuthProvider;
