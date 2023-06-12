import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    initializeAuth() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.isAuthenticated = !!user;
      });
    }
  }
});
