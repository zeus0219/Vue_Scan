import { createStore } from 'vuex';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { getCurrentUser } from '@/models/users';

const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        fetchUser({ commit }) {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const getRole = await getCurrentUser(user.email);
                    commit('setUser', {...user,role:getRole});
                } else {
                    commit('setUser', null);
                }
            });
        }
    }
});

export default store;
