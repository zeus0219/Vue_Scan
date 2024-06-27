<template>
    <div class="container">
        <div class="top-[90px] relative">
            <h2 class="md:text-[40px] text-[26px] font-[400] text-center">Frequently Asked Questions</h2>
        </div>
        <div class="relative top-[180px] flex justifiy-center w-[100%] m-auto">
            <v-expansion-panels>
                <v-expansion-panel
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    title="1. Which products participate in the promotion"></v-expansion-panel>
                <v-expansion-panel
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    title="2. What are the dates of the promotion"></v-expansion-panel>
                <v-expansion-panel
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    title="3. What I can get. What are the rewards"></v-expansion-panel>
                <v-expansion-panel
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    title="4. Who can participate"></v-expansion-panel>
                <v-expansion-panel
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    title="5. Why my receipt was rejected"></v-expansion-panel>
                <v-expansion-panel
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    title="6. Where I can write to resolve my problem"></v-expansion-panel>
            </v-expansion-panels>
        </div>
        <div class="relative top-[220px] justify-center flex">
            <v-btn variant="text"
                class="text-[14px] font-[600] font-[Gotham Rounded] text-center uppercase !bg-[none] text-[red]" @click="gotoTerms">
                SEE TERMS AND CONDITIONS
            </v-btn>
        </div>
        <div class="relative top-[240px] justify-center flex">
            <v-btn class="uppercase w-[auto] rounded-[100px] !bg-[red]" color="red" @click="backToScanPage">BACK TO SCANNING</v-btn>
        </div>
    </div>

</template>
<script setup>
import { useRouter } from 'vue-router' // import router
const router = useRouter() // get a reference to our vue router
const backToScanPage = () => {
    return router.push('/');
}
const gotoTerms = () => {
    return router.push('/terms');
}
</script>