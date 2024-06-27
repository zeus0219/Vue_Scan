<template>
    <div class="container">
        <div class="top-[90px] relative">
            <h2 class="md:text-[40px] text-[26px] font-[400] text-center">Request manual verification</h2>
        </div>
        <div class="mt-10 relative top-[70px] justify-center flex">
            <img src="/assets/logo.png" alt="" width="228">
        </div>  
        <div class="relative top-[80px]">
            <div class="md:text-[26px] text-[16px] text-center">
                Once our team decide to reward you for this<br class="md:hidden" />
                receipt, your in-app balance will be<br />
                changed. It may take up to 24h.
            </div>
        </div>
        <div class="relative top-[140px] justify-center flex">
            <v-btn variant="text" class="text-[14px] font-[600] font-[Gotham Rounded] text-center uppercase !bg-[none] text-[red]" >
                cancel
            </v-btn>
        </div>
        <div class="relative top-[160px] justify-center flex">
            <v-btn class="uppercase w-[auto] rounded-[100px] !bg-[red]" color="red" >REQUEST manual verification</v-btn>
        </div>
    </div>

</template>