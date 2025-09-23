<script setup lang="ts">
import { ref } from 'vue';


const dataInput = ref<IAgentRequest>({
    nom: "",
    role: "",
    description: "",
    phone: "",
    email: "",
    image: ""
})
const pushData = () => {
    
}
</script>
<template>
    <v-card elevation="10" class="px-5 p-10">
<v-row>
            <v-col cols="12" lg="12">
                <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Informatuin personnel agent </v-alert>
               
                <v-row>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium" for="fn">Nom Complet Agent</v-label>
                        <v-text-field variant="outlined" v-model="dataInput.nom" color="primary" id="fn"></v-text-field>
                         <v-label class="mb-2 font-weight-medium" for="fn">Role Agent </v-label>
                        <v-text-field variant="outlined" v-model="dataInput.role" color="primary" id="fn"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium" for="sg">Telephone</v-label>
                       <v-text-field variant="outlined" v-model="dataInput.phone" color="primary" id="fn"></v-text-field>
                       <v-label class="mb-2 font-weight-medium" for="sg">Email</v-label>
                       <v-text-field variant="outlined" v-model="dataInput.email" color="primary" id="fn"></v-text-field>
                    </v-col>
                    
                     <v-col>
                    <v-label class="mb-2 font-weight-medium" for="fn">Description</v-label>
                    <v-textarea variant="outlined" color="primary" v-model="dataInput.description" id="ln"></v-textarea>
                </v-col>
                </v-row>
               
                <v-btn color="error" class="mr-3" rounded="pill">Cancel</v-btn>
                <v-btn color="primary" @click="pushData()" rounded="pill">Sauvegarder</v-btn>
            </v-col>
        </v-row>
    </v-card>



</template>