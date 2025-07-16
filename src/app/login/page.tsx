import Login from "../../pages/auth/Login";
import { AuthProvider } from "app/context/AuthContext";


export default function LoginPage() {
    return (
      <AuthProvider>
        <Login />;
      </AuthProvider>
  );
}
