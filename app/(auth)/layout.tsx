import { AuthProvider } from "../contexts/AuthContext";
import NavbarAuth from "../components/NavbarAuth";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                <NavbarAuth />
                {children}
            </div>
        </AuthProvider>
    );
} 