<template>
    <div class="container">
        <div class="top-[112px] relative">
            <h2 class="md:text-[40px] text-[26px] font-[400] text-center">Congrats</h2>
        </div>
        <div class="mt-10 relative top-[100px] justify-center flex">
            <img src="/assets/Prize.png" alt="" width="228">
        </div>  
        <div class="relative top-[120px]">
            <div class="md:text-[26px] text-[16px] text-center">
                Reward balance 1<span class="text-[red]">$</span> will be updated <br class="md:hidden"/> up to few hours.
            </div>
        </div>
        <div class="relative top-[160px] justify-center flex">
            <v-btn @click="backToScanPage" variant="text" class="text-[14px] font-[600] font-[Gotham Rounded] text-center uppercase !bg-[none] text-[red]" >
                SCAN AGAIN
            </v-btn>
        </div>
        <div class="relative top-[180px] justify-center flex">
            <v-btn class="uppercase w-[164px] rounded-[100px] !bg-[red]" color="red" >PROCEED</v-btn>
        </div>
    </div>

</template>
<script setup>
import { useRouter } from 'vue-router' // import router
const router = useRouter() // get a reference to our vue router
const backToScanPage = () => {
    return router.push('/');
}
</script>