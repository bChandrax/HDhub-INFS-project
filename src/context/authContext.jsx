import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
    const [user, setUser]       = useState(null);
    const [token, setToken]     = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // On mount: verify stored token and rehydrate user
    useEffect(() => {
        if (!token) { setLoading(false); return; }
        fetch(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (data.user) setUser(data.user);
                else logout();
            })
            .catch(logout)
            .finally(() => setLoading(false));
    }, []);

    function saveSession(newToken, newUser) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    async function login(email, password) {
        const res  = await fetch(`${API}/auth/login`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");
        saveSession(data.token, data.user);
        return data.user;
    }

    async function register(name, email, password) {
        const res  = await fetch(`${API}/auth/register`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
        saveSession(data.token, data.user);
        return data.user;
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}