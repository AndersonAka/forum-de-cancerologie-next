// Layout pour les routes protégées

import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
// import ProtectedGuard from "../components/ProtectedGuard";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {/* <ProtectedGuard> */}
            <Navbar />
            {children}
            {/* </ProtectedGuard> */}
        </AuthProvider>
    );
}