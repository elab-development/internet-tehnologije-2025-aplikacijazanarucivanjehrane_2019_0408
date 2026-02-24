import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { },
});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error('Failed to parse stored user:', error);
                    localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        }, 700);
    }, []);

    function login(userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
    }

    if (isLoading) {

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: '#ffc404'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;