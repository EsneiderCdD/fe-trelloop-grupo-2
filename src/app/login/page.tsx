import Login from "../../pages/auth/Login";
import { AuthProvider } from "context/AuthContext";


export default function LoginPage() {
<<<<<<< HEAD
  return <Login />;
=======
    return (
      <AuthProvider>
        <Login />;
      </AuthProvider>
  );
>>>>>>> 0ba71c9fa1fecfa3b25c57b58a44318d4ba09528
}
