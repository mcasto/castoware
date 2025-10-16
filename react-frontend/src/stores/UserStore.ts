import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../assets/call-api'

interface UserState {
    token: string | null;
    isLoading: boolean;

    // Actions
    setToken: (token: string) => void;
    clearToken: () => void;

    // Async actions
    validateToken: () => Promise<boolean>;
    isAuthenticated: () => Promise<boolean>;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            token: null,
            isLoading: false,

            setToken: (token: string) => set({ token }),

            clearToken: () => set({ token: null }),

            validateToken: async (): Promise<boolean> => {
                const { token } = get();

                if (!token) {
                    return false;
                }

                set({ isLoading: true });

                try {
                    const response = await api<{ status: 'success' | number }>({
                        path: '/validate-token',
                        method: 'get',
                        useAuth: true,
                    });

                    // Simple check: if status is 'success', token is valid
                    const isValid = response.status === 'success';

                    if (!isValid) {
                        set({ token: null }); // Clear invalid token
                    }

                    return isValid;
                } catch (error: unknown) {
                    console.error(error)

                    set({ token: null }); // Clear token on any error
                    return false;
                } finally {
                    set({ isLoading: false });
                }
            },

            isAuthenticated: async (): Promise<boolean> => {
                const { token, validateToken } = get();

                if (!token) {
                    return false;
                }

                return await validateToken();
            },
        }),
        {
            name: 'cw-user-storage',
        }
    )
);
