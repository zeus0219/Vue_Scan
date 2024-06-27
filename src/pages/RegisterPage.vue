<template>
    <div>
        <v-img class="mx-auto my-6" max-width="228" src="../../assets/login.png"></v-img>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
            <v-text-field v-model="email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>
            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>
            <v-card v-if="errMsg" class="mb-4" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption">
                    <p>{{ errMsg }}</p>
                </v-card-text>
            </v-card>
            <v-btn class="mb-4" color="blue" size="large" variant="tonal" block @click="register">
                Sign up
            </v-btn>
            <v-btn class="mb-4" color="" size="large" variant="tonal" block @click="_registerWithGithub">
                <v-icon class="me-2" size="large">
                    mdi-github
                </v-icon>
                Signup with Github
            </v-btn>
            <v-btn class="mb-4" color="" size="large" variant="tonal" block @click="_registerWithGoogle">
                <v-icon class="me-2" size="large">
                    mdi-google
                </v-icon>
                Signup with google
            </v-btn>
            <!-- <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" @click="login">
                    Login now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text> -->
        </v-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createUser, registerWithGithub, registerWithGoogle, checkCompanyUser, _existUser, _createUser } from '@/models/users'
import { auth } from '@/firebase';
import { useRouter } from 'vue-router' // import router
import bcrypt from 'bcryptjs';
const router = useRouter() // get a reference to our vue router

const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const uid = router.currentRoute.value.params; // Access the route parameter
var companyId = uid.id;

const register = async () => {
    const _password = await bcrypt.hash(password.value, 10);
    await createUserWithEmailAndPassword(auth, email.value, '123123')
        .then(async ({ user }) => {

            await createUser({ ...user, _password, companyId, }, `USER`)
            localStorage.clear();
            localStorage.setItem('baseUrl', companyId)

            router.push('survey');
        })
        .catch(async (error) => {
            switch (error.code) {
                case 'auth/weak-password':
                    errMsg.value = 'Password should be at least 6 characters'
                    break;
                case 'auth/email-already-in-use':
                    var isExistsThisCompany = await checkCompanyUser(email.value, companyId);
                    if (isExistsThisCompany) {
                        await signOut(auth);
                        return errMsg.value = 'Email is exists!'
                    } else {
                        if (await _existUser(email.value, 'company_users')) {
                            await signOut(auth);
                            return errMsg.value = "This is company account, you can not access with this user."
                        } else {
                            signInWithEmailAndPassword(auth, email.value, `123123`) // THIS LINE CHANGED
                                .then(async ({ user }) => {
                                    await _createUser({ ...user, companyId }, `USER`)
                                    console.log('Successfully logged in!');
                                    localStorage.clear();
                                    localStorage.setItem('baseUrl', companyId)
                                    router.push('survey') // redirect to the feed
                                })
                                .catch(error => {
                                    console.log(error);
                                    switch (error.code) {
                                        case 'auth/invalid-email':
                                            errMsg.value = 'Invalid email'
                                            break
                                        case 'auth/user-not-found':
                                            errMsg.value = 'No account with that email was found'
                                            break
                                        case 'auth/wrong-password':
                                            errMsg.value = 'Incorrect password'
                                            break
                                        default:
                                            errMsg.value = 'Email or password was incorrect'
                                            break
                                    }
                                });
                        }
                    }
                    break;
                default:
                    errMsg.value = "invalid email"
                    break;
            }
        })
}
const login = () => {
    router.push(`login`)
}
const _registerWithGithub = async () => {
    const result = await registerWithGithub(companyId);
    errMsg.value = result;
    if (result === true) {
        router.push('survey');
    }
}
const _registerWithGoogle = async () => {
    const result = await registerWithGoogle(companyId);
    errMsg.value = result;
    if (result === true) {
        router.push('survey');
    }
}

</script>