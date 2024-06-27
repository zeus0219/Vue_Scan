import { createRouter, createWebHistory } from 'vue-router'
import ScanReceipt from "../components/ScanReceipt.vue";
import ScanCongrate from "../components/ScanCongrate.vue";
import UsedReceipt from "../components/UsedReceipt.vue";
import RequestManual from "../components/RequestManual.vue";
import FAQ from "../components/FAQ.vue";
import SCAN from "../components/Scan.vue";
import TAndC from "../components/T&C.vue";
import NotFound from "../pages/NotFound.vue";
import ManualVerification from "../components/ManualVerification.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/",component:ScanReceipt},
    { path: "/congrate",component:ScanCongrate},
    { path: "/used-receipt",component:UsedReceipt},
    { path: "/used-receipt",component:UsedReceipt},
    { path: "/request-manual",component:RequestManual},
    { path: "/faq",component:FAQ},
    { path: "/scan",component:SCAN},
    { path: "/terms",component:TAndC},
    { path: "/manual_verify",component:ManualVerification},
    { path: '/:pathMatch(.*)*', component: NotFound }, 
    
  ]
})

export default router
