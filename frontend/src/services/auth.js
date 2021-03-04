export const TOKEN_KEY = 'token';
export const USERNAME_KEY = 'username';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUsername = () => localStorage.getItem(USERNAME_KEY);
export const login = token => localStorage.setItem(TOKEN_KEY, token);
export const currentUser = username => localStorage.setItem(USERNAME_KEY, username);
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
}
