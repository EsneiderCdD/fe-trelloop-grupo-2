import Login from "../../pages/auth/Login";
import { AuthProvider } from "context/AuthContext";


export default function LoginPage() {
    return (
      <AuthProvider>
        <Login />;
      </AuthProvider>
  );
}
