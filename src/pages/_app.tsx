import "@/styles/globals.css"; // Asegúrate de que la ruta sea correcta
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <AuthProvider> ← Si usas contextos globales
      <Component {...pageProps} />
    // </AuthProvider>
  );
}
