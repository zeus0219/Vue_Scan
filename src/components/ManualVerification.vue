<template>
    <div class="container">
        <div class="top-[112px] relative">
            <h2 class="md:text-[14px] text-[14px] font-[400] text-center leading-[22px]">
                We were not able to process some data on<br class="md:hidden" />
                your receipt.
            </h2>
            <h2 class="md:text-[14px] text-[14px] font-[400] text-center text-[#F40000] leading-[22px]">
                Click on a text field you would like to update
            </h2>
        </div>
        <div class="mt-10 relative top-[100px] justify-center m-auto w-[70%]">
            <v-text-field class="leading-[14px] text-[14px]">Receipt No.</v-text-field>
            <v-text-field type="date" class="leading-[14px] text-[14px]">Date</v-text-field>
            <v-text-field class="leading-[14px] text-[14px]">NIP</v-text-field>
            <v-text-field class="leading-[14px] text-[14px]">Suma</v-text-field>
        </div>
        <div class="relative top-[180px] justify-center flex">
            <v-btn class="uppercase w-[auto] rounded-[100px] !bg-[red]" color="red" @click="gotoCongrate()">verify</v-btn>
            <v-btn class="mx-20 uppercase w-[auto] rounded-[100px] !bg-[red]" color="red" @click="gotoHome()">Cancel</v-btn>
        </div>
    </div>

</template>
<script>
export default {
    methods: {
        gotoCongrate(){
            return location.href = '/congrate'  
        },
        gotoHome(){
            return location.href = '/'  
        }
    }
}
</script>