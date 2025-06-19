// Layout pour les routes protégées

import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { PageTracker } from "../components/PageTracker";
// import ProtectedGuard from "../components/ProtectedGuard";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {/* <ProtectedGuard> */}
            <PageTracker
                enabled={true}
                minTimeSpent={3} // 3 secondes minimum pour les pages protégées
                trackOnUnload={true}
            />
            <Navbar />
            {children}
            {/* </ProtectedGuard> */}
        </AuthProvider>
    );
}