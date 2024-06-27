<template>
    <div>
        <v-img class="mx-auto my-6" max-width="228" src="../../assets/login.png"></v-img>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
            <v-text-field v-model="email" density="compact" placeholder="Email address" :rules="[required]" clearable
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
            <v-btn class="mb-4" color="blue" size="large" variant="tonal" block @click="signIn">
                Log In
            </v-btn>
            <v-btn class="mb-4" color="" size="large" variant="tonal" block @click="_loginWithGithub">
                <v-icon class="me-2" size="large">
                    mdi-github
                </v-icon>
                login with Github
            </v-btn>
            <v-btn class="mb-4" color="" size="large" variant="tonal" block @click="_loginWithGoogle">
                <v-icon class="me-2" size="large">
                    mdi-google
                </v-icon>
                login with google
            </v-btn>
            <!-- <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" @click="register">
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text> -->
        </v-card>
    </div>
</template>
<script setup method>
import { ref } from 'vue'
import { signInWithEmailAndPassword,signOut } from 'firebase/auth'
import { auth } from '@/firebase';
import {  loginWithGoogle, loginWithGithub,_existUser } from "@/models/company_users";
import { useRouter } from 'vue-router' // import router
const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const router = useRouter() // get a reference to our vue router
const signIn = () => { // we also renamed this method
    console.log(email.value, password.value);
    signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
        .then(async() => {
            if(await _existUser(email.value,'users')){
                await signOut(auth);
                errMsg.value = "This is user account, you can not access with this user."
            }else{
                console.log('Successfully logged in!');
                router.push('/my_survey') // redirect to the feed
            }
        })
        .catch(error => {
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
const register = () => {
    router.push('register')
}
const _loginWithGithub = async () => {
    const result = await loginWithGithub();
    errMsg.value  = result;
    if(result === true){
        router.push('/my_survey');
    }
}
const _loginWithGoogle = async () => {
    const result = await loginWithGoogle();
    errMsg.value  = result;
    if(result === true){
        router.push('/my_survey');
    }
}
</script>