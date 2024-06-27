<template>
    <div class="container">
        <div class="top-[112px] relative">
            <h2 class="md:text-[40px] text-[26px] font-[400] text-center">
                Receipt has been<br class="md:hidden" />
                already used
            </h2>
        </div>
        <div class="mt-10 relative top-[100px] justify-center flex">
            <img src="/assets/Prize_disabled.png" alt="" width="228">
        </div>
        <div class="relative top-[120px]">
            <div class="md:text-[26px] text-[16px] text-center">
                Check the fields we have detected,<br class="md:hidden" />
                and eventually correct them.
            </div>
        </div>
        <div class="relative top-[160px] justify-center flex">
            <v-btn variant="text"
                class="text-[14px] font-[600] font-[Gotham Rounded] text-center uppercase !bg-[none] text-[red]">
                CANCEL
            </v-btn>
        </div>
        <div class="relative top-[180px] justify-center flex">
            <v-btn class="uppercase w-[auto] rounded-[100px] !bg-[red]" color="red">manual verification</v-btn>
        </div>
    </div>

</template>