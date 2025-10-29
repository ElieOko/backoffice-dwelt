<script setup lang="ts">
import { ref } from 'vue';
// import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/icon-facebook.svg';
import { progress } from '@/utils/animation/routage';
import router from '@/router';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import { setUser, type IUser } from '@/stores/auth';

const loader       = ref<Boolean>(false)
const show       = ref<Boolean>(true)
const checkbox = ref(false);
const show1 = ref(false);
const password = ref('');
const username = ref('');
const type = "infinite-spinner"

const callComponentWithDelay = (path:string,interval : number = 2000)=>{
    progress.start()
    setTimeout(()=>{
        progress.finish()
        router.push(path);
    },
    interval);
}
async function sendPostData() {
    if(password.value.length > 3 && username.value.length > 3){
        const data = {
            // workspace : setupWorkSpace().work.workspace,
            username :username.value,
            password :password.value
        }
        if (password.value == "1234" && username.value == "admin") {
            notify("Connexion réussie")
            setUser(data as IUser)
            router.push("/")
        } 
        else {
            notify("erreur au niveau des identifiant")
        }
         
        // useAxiosRequest().post(Parent.user.auth,data).then(res =>{
        //     if(res.status == 200){
        //         const dataUser = {
        //             user  : res.data.user,
        //             token : res.data.token
        //         }
        //         // useUserLocal().persistance(dataUser)
                
        //         callComponentWithDelay("/dashboard")
        //     }
        // }).catch(error =>{

        // });
    }

}

const notify = (msg:string) => {
      toast(msg, {
        autoClose: 5000,
      });
}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1 text-gray200 font-weight-semibold" block>
                <img :src="google" height="16" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Website</span>
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1 text-gray200 font-weight-semibold" block>
                <!-- <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" /> -->
                <span class="d-sm-flex d-none mr-1">Pro Immobilier</span>
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Authentification</span>
        </div>  
    </div>
    <Form @submit="sendPostData"  class="mt-5">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">Username</v-label>
        <VTextField
            v-model="username"
            class="mb-8"
            required
            hide-details="auto"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">Password</v-label>
        <VTextField
            v-model="password"
            required
            hide-details="auto"
            type="password"
            class="pwdInput"
        ></VTextField>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
          
        </div>
        <v-btn size="large" rounded="pill" :loading="show1" color="#2F4F4F" class="bg-red-500"  block type="submit" flat>Continuer</v-btn>
       
    </Form>
    <!-- <div v-if="show" class="k-loader-container k-loader-container-md k-loader-top">
      <div class="k-loader-container-overlay k-overlay-dark" />
      <div class="k-loader-container-inner">
        <Loader :size="'large'" :type="type" />
      </div>
    </div> -->
</template>
