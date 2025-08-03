"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

interface Props {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
    const router = useRouter();
    const { isAuthenticated, loading, hydrate } = useAuthStore();

    // Hidratación inicial del estado
    useEffect(() => {
        hydrate(); // solo la primera vez
    }, [hydrate]);

    // Redirigir si no está autenticado y ya terminó de hidratar
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    // Mientras se hidrata
    if (loading) return <div className="text-center p-4">Cargando...</div>;

    // Mostrar contenido si está autenticado
    return <>{children}</>;
};

export default AuthGuard;