// This is a mock authentication utility for client-side use.
// In a real application, this would be replaced with a proper authentication service.

const USER_KEY = 'startup-ally-user';

export const login = (email: string): void => {
  if (typeof window !== 'undefined') {
    const user = { email, name: 'Founder', avatar: `https://i.pravatar.cc/150?u=${email}` };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};

export const isLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem(USER_KEY);
  }
  return false;
};

export const getUser = (): { email: string; name: string; avatar: string } | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};
