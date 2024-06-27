<template>
    <div class="container">
        <div class="top-[90px] relative">
            <h2 class="md:text-[40px] text-[26px] font-[400] text-center">Scan receipt and <br class="md:hidden" /> pick
                the prize</h2>
        </div>
        <div class="mt-10 relative top-[70px] justify-center flex">
            <img src="/assets/logo.png" alt="" width="228">
        </div>
        <div class="relative top-[80px]">
            <div class="md:text-[26px] text-[16px] text-center">
                Move your camera slowly from the top of<br class="md:hidden" /> the receipt to the total value
            </div>
        </div>
        <div class="relative top-[160px] justify-center flex">
            <v-btn @click="gotoFaq" variant="text"
                class="text-[14px] font-[600] font-[Gotham Rounded] text-center uppercase !bg-[none] text-[red]">
                Need Help?
            </v-btn>
        </div>
        <div class="relative top-[180px] justify-center flex">
            <v-btn @click="gotoScan" class="uppercase w-[164px] rounded-[100px] !bg-[red]" color="red">scan</v-btn>
        </div>
    </div>

</template>
<script>
export default {
    data: () => ({
        scanerror: false,
        decodedContent: ''
    }),
    methods: {
        gotoFaq() {
            return this.$router.push('faq');
        },
        gotoScan(){
            return this.$router.push("scan")
        }
    },
}
</script>