import axios from "axios";

const API_BASE_URL = "https://by-alot.me";


export const authAPI = {
    async login(username: string, password: string): Promise<{ user: any }> {
        const userData = new URLSearchParams();
        userData.append("username", username);
        userData.append("password", password);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/jwt/login`, userData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true,
            });

            const { user } = response.data;
            sessionStorage.setItem('isAuthenticated', 'true');
            return { user };
        } catch (error) {
            throw error;
        }
    },

    async register(
        name: string,
        surname: string,
        middleName: string,
        email: string,
        password: string
    ): Promise<any> {
        const userData = {
            email: email,
            password: password,
            name: name,
            surname: surname,
            middle_name: middleName,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async recovery(email: string): Promise<void> {
        const userData = {
            email,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/recovery`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getUserData(): Promise<any> {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/me`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async postUserData(
        surname: string,
        name: string,
        middle_name: string,
        email: string,
    ): Promise<any> {
        try {
            const userData = {
                surname,
                name,
                middle_name,
                email,
            };

            const response = await axios.patch(`${API_BASE_URL}/users/me`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async logout(): Promise<void> {
        try {
            await axios.post(`${API_BASE_URL}/auth/jwt/logout`, '', {
                withCredentials: true,
            });
            sessionStorage.removeItem('isAuthenticated');
        } catch (error) {
            throw error;
        }
    },

};
