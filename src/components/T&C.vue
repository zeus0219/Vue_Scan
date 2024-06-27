<template>
    <div class="container">
        <div class="top-[90px] relative">
            <h2 class="md:text-[40px] text-[26px] font-[400] text-center">TERMS AND CONDITIONS</h2>
        </div>
        <div class="mt-10 relative top-[70px] justify-center">
            <p class="font-weight-black">
                What is Lorem Ipsum?
            </p>
            <p class="text-left mt-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
            </p>
        </div>  
        <div class="relative top-[80px]">
            <p class="font-weight-black mt-6">
                Where does it come from?
            </p>
            <p class="text-left mt-6">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in 
            </p>
        </div>
        <div class="relative top-[160px] justify-center flex">
            <v-btn @click="backToScanPage()" class="uppercase w-[auto] rounded-[100px] !bg-[red]" color="red" >BACK TO SCANNING</v-btn>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router' // import router
    const router = useRouter() // get a reference to our vue router
    const backToScanPage = ()=>{
        return router.push('/');
    }
</script>
