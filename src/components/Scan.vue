<template>
  <div>
    <div class="relative left-1/2 transform -translate-x-1/2 z-[1000] w-full text-center">
      <p class="text-[20px]">{{ errorText }}</p>
      <p v-if="scanResult === 'long_detected' || scanResult === 'no_promoted'" class="text-[14px]">{{ sErrorText }}</p>
    </div>
    <div class="fixed right-4 top-4 transform -translate-x-1 z-[1000]">
      <span @click="gotoFaq">
        <v-icon class="me-2 text-[40px]" size="large">
          mdi-help-circle-outline
        </v-icon>
      </span>
    </div>
    <input type="hidden" class="videokey" value="e588bf50c9a92f31fa45eba15705a7b5" />
    <!-- <div id="scanresult">{{ scanResult }}</div> -->
    <div class="fixed bottom-[50px] left-1/2 transform -translate-x-1/2 z-[1000]">
      <v-btn v-if="errorText === ''" @click="gotoHome"
        class="uppercase w-[auto] rounded-[100px] !bg-[white]  text-[red]">Cancel</v-btn>
      <v-btn v-if="errorText !== ''" @click="gotoManual"
        class="uppercase w-[auto] rounded-[100px] !bg-[white]  text-[red]">MANUAL VERIFICATION</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = import.meta.env.VITE_SCAN_API;
export default {
  data() {
    return {
      showButton: false,
      showCancel: false,
      scanResult: 'no_visible',
      errorText: 'Opening the camera, please wait',
      sErrorText: ''
    };
  },
  mounted() {
    this.initializeVideoScan();
  },
  methods: {
    initializeVideoScan() {
      this.startVideoScan();
      window.videoscan_finish_callback = function (is_success, res) {
        console.log(is_success, res);
      }
      const preloader = document.querySelector("ti-preloader")
      window.videoscan_session_callback = function (ssid) {
        console.log(ssid, 444)
        // This is called a moment after videoscan_start_callback after session ID is negotiated.
        // save session id for scan to identify it when webhook is called
      }
      window.videoscan_start_callback = function () {
        preloader.style['display'] = 'none'
      }
      window._v_ui.localVideo.addEventListener('playing', function () {
        this.errorText = ''
      })
      setInterval(() => {
        this.fetchScanData();
      }, 5000);
      // setTimeout(() => {this.changeStatusViaResult('no_visible',`No visible data`)}, 5000);
      // setTimeout(() => {this.changeStatusViaResult('long_detected',`Long receipt detected`,`Move the camera slowly down`)}, 10000);
      // setTimeout(() => {this.changeStatusViaResult('no_promoted',`No promoted product`,`Only Fanta Zero 1,5l is promoted`)}, 15000);
      // setTimeout(() => {this.gotoCongrate()}, 20000);
    },
    async fetchScanData() {
      const element = document.querySelector("#ti-remote-video-wrapper")
      const { data } = await axios.get(API_URL);
      if (data.status === 'long_detected' || data.status === 'no_promoted') {
        // element.style.position = "fixed"
        element.style.top = "30px"
      } else {
        // element.style.position = "fixed"
        element.style.top = "20px"
      }
      if (data.status === 'success') {
        // this.gotoCongrate();
      } else {
        this.changeStatusViaResult(data.status, data.text, data.sub_text)
      }
    },
    changeStatusViaResult(status, error, s_error = '') {
      this.scanResult = status;
      this.errorText = error;
      this.sErrorText = s_error
    },
    gotoHome() {
      return location.href = '/'
    },
    gotoFaq() {
      return location.href = '/faq'
    },
    gotoManual() {
      return location.href = '/manual_verify'
    },
    gotoCongrate() {
      return location.href = '/congrate'
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
