<template>
  <div>
    <div class="absolute top-[30px] left-1/2 transform -translate-x-1/2 z-[1000] w-full text-center">
      <p class="text-[20px]">{{errorText}}</p>
      <p v-if="scanResult==='long_detected'" class="text-[14px]">Only Fanta Zero 1,5l is promoted</p>
    </div>
    <div class="absolute top-[30px] right-0 transform -translate-x-1 z-[1000]">
      <v-btn @click="gotoFaq" class="uppercase w-[auto] rounded-full !bg-[white] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-[red]">?</v-btn>
    </div>
    <input type="hidden" class="videokey" value="e588bf50c9a92f31fa45eba15705a7b5" />
    <!-- <div id="scanresult">{{ scanResult }}</div> -->
    <div class="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 z-[1000]">
      <v-btn v-if="errorText === ''" @click="gotoHome" class="uppercase w-[auto] rounded-[100px] !bg-[white]  text-[red]">Cancel</v-btn>
      <v-btn v-if="errorText !== ''" @click="gotoManual" class="uppercase w-[auto] rounded-[100px] !bg-[white]  text-[red]">MANUAL VERIFICATION</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false,
      showCancel: false,
      scanResult: 'no_visible',
      errorText:'',
      sErrorText:''
    };
  },
  mounted() {
    this.initializeVideoScan();
  },
  methods: {
    initializeVideoScan() {
      this.startVideoScan();
      window.videoscan_finish_callback = function (is_success, res) {
        console.log(is_success,res);
      }
      window.videoscan_session_callback = function (ssid) {
        console.log(ssid,444)
       // This is called a moment after videoscan_start_callback after session ID is negotiated.
       // save session id for scan to identify it when webhook is called
      }
      this.changeStatusViaResult('long_detected',`Long receipt detected`,`Move the camera slowly down`)
    },
    changeStatusViaResult(status,error,s_error = ''){
      this.scanResult = status;
      this.errorText = error;
      this.sErrorText = s_error
    },
    gotoHome(){
      return location.href = '/'
    },
    gotoFaq(){
      return location.href = '/faq'
    },
    gotoManual(){
      return location.href = '/manual_verify'
    },
    startVideoScan() {
      console.log('Start video scan');
      this.showCancel = true;
      // Example: Trigger a scan function from the external library
      const videoScanButton = document.querySelector('.videoscan');
      const cancelWrapper = document.querySelector('#cancelWrapper');
      if (videoScanButton) {
        videoScanButton.click(); // Simulate a click if the library requires it
      }
      if (cancelWrapper) {
        cancelWrapper.style.display = 'none'
      }
    },
    cancelVideoScan() {
      console.log('Cancel video scan');
      this.showCancel = false;

      // Example: Trigger a cancel function from the external library
      const videoCancelButton = document.getElementById('videocancel');
      if (videoCancelButton) {
        videoCancelButton.click(); // Simulate a click if the library requires it
      }
    },
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
