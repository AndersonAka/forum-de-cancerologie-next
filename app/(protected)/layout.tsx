// Layout pour les routes protégées

import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
    );
}