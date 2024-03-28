import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        credentials: "include",
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data);
      }
      setLoading(false)
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext)
  if(context === undefined){
    throw new Error('useAuth must be used within the AuthProvider')
  }
  return context;
};
export default AuthProvider;
