import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    expiryHour: 2
  }),
  actions: {
    async register (userData) {
        let res = await axios.post('/api/auth/register', userData);
    },
    async login(userData) {
        try {
            let res = await axios.post('/api/auth/login', userData);
            if(res.data.success) {
                const expiryDate = new Date();
                expiryDate.setTime(expiryDate.getTime() + (this.expiryHour * 60 * 60 * 1000));

                const tokenWithExpiry = {
                value: res.data.data.remember_token,
                expiry: expiryDate,
                };
                
                localStorage.setItem('rr_auth_token', JSON.stringify(tokenWithExpiry));
                localStorage.setItem('rr_user_id', JSON.stringify(res.data.data.id));
                
                Cookies.set('rr_auth_token', res.data.data.cookie, { expires: expiryDate });

                this.isAuthenticated = true;
                this.user = res.data.data;

                return res.data;
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    },
    async getUser() {
        try {
            const rememberToken = localStorage.getItem('rr_auth_token');
            const cookieToken = Cookies.get('rr_auth_token');
            console.log('rememberToken =>', rememberToken, 'cookieToken =>', cookieToken)
            if (cookieToken === undefined) {
                console.log('Cookie has expired');
                await logout()
            } else {
                if (rememberToken) {
                    let res = await axios.get(`/api/auth/user?cookie=${cookieToken}&rememberToken=${rememberToken}`);
                    if(res.data.success) {
                        this.isAuthenticated = true;
                        this.user = res.data.data
                    }
                } 
            }
        } catch (error) {
            console.error('Error occurred during get user:', error);
        }
    },
    async logout() {
        try {
            let res = await axios.get(`/api/auth/logout?user_id=1`);
            if(res.data.success) {
                this.isAuthenticated = false;
                this.user = null

                Cookies.remove('rr_auth_token');

                localStorage.removeItem('rr_auth_token');

                localStorage.removeItem('rr_user_id');
            }
        } catch (error) {
            console.error('Error occurred during logout:', error);
        }
    },
  },
});
