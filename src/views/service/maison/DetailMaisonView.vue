<script setup lang="ts">
import { useAxiosRequest } from '@/utils/service/custom';
import { ref, watchEffect } from 'vue';
import { shallowRef } from 'vue'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { useRoute } from 'vue-router'
import type { Property } from './IDev';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute()
let model = shallowRef([])
const files = ref<File[]>([]);
const loader = ref(false)
function removeFile(index : number) {
  files.value.splice(index, 1)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

async function prepareImages() {
  dataInput.value.images = await Promise.all(
    files.value.map(async file => ({
      nom: file.name,
      data: await fileToBase64(file)
    }))
  )
}



const tranchePaiement: Array<{ id: number; name: string; code: string }> = [
  { id: 1, name: "Paiement mensuel", code: "mois" },
  { id: 2, name: "Paiement trimestriel", code: "trimestre" },
  { id: 3, name: "Paiement semestriel", code: "semestre" },
  { id: 4, name: "Paiement annuel", code: "annee" },
  { id: 5, name: "Paiement unique", code: "unique" }
]


interface Standar{
    id: Number
    name: String
    is_active: Boolean
    created_at: String
    updated_at:String
}
interface City {
    id: Number
    name: String
    country_id: Number
    is_active: Boolean
    created_at: String
    updated_at:String
}
interface Commune {
    id: Number
    name: String
    city_id : Number
    is_active: Boolean
    created_at: String
    updated_at:String
}
const collectionDataStatus = ref<Array<Standar>>([])
const collectionData = ref<Array<Standar>>([])
const collectionCaracteristique = ref<Array<Standar>>([])
const collectionProperty = ref<Array<Standar>>([])
const collectionDataAgent = ref<Array<IAgent>>([])
const collectionDataCommune = ref<Array<Commune>>([])
const collectionDataCity = ref<Array<City>>([])
const select = ref([]);
let dataInput = ref<IMaison>({
  maisonId: 0,
  nom: "",
  caracteristique: [],
  images: [],
  measure:"",
  agentId: "",
  cityId: "",
  communeId: "",
  propertyTypeId: "",
  statusPropertyId: "",
  isDisponible: true,
  superficie:"",
  prix: 0,
  partPayed: "",
  countryId: "",
  codePostal: ""
})
let collectionDataGet = ref<Property>({
  id: 0,
  nom: '',
  caracteristique: null,
  measure: '',
  agentId: 0,
  cityId: 0,
  communeId: 0,
  propertyId: 0,
  statusPropertyId: 0,
  isDisponible: false,
  superficie: '',
  prix: '',
  partPayed: '',
  countryId: 0,
  codePostal: '',
  salleBain: 0,
  cuisine: 0,
  garage: 0,
  chambre: 0,
  created_at: '',
  updated_at: '',
  images: [],
  agent: {
    role: "",
    nom: "",
    email: "",
    phone: "",
    is_active:true,
    image:[] ,
    path: "",
    description:"",
    created_at: '',
    updated_at: '',
    
  }
})
const id = route.params.id
const fetchAllData = () =>{
  watchEffect(async () => {
        
        await(useAxiosRequest().get(`/maisons/${Number(id)}`)
            .then(function (response) {
              collectionDataGet.value = response.data.data 
              //dataInput.value.nom = collectionDataGet.value?.nom
              console.log(collectionDataGet.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));
        await(useAxiosRequest().get(`/country`)
            .then(function (response) {
              collectionData.value = response.data.country 
              console.log(collectionData.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));

        await(useAxiosRequest().get(`/city`)
            .then(function (response) {
              collectionDataCity.value = response.data.cities 
              console.log(collectionDataCity.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));

        await(useAxiosRequest().get(`/commune`)
            .then(function (response) {
              collectionDataCommune.value = response.data.communes 
              console.log(collectionDataCommune.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));
           
            await(useAxiosRequest().get(`/agents/all`)
            .then(function (response) {
              collectionDataAgent.value = response.data.agents 
              console.log(collectionDataAgent.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));

            await(useAxiosRequest().get(`/status/property`)
            .then(function (response) {
              collectionDataStatus.value = response.data.value 
              console.log(collectionDataStatus.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));

            await(useAxiosRequest().get(`/type/property`)
            .then(function (response) {
               collectionProperty.value = response.data.type_property 
              console.log(collectionProperty.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));

            await(useAxiosRequest().get(`/caracteristique`)
            .then(function (response) {
              collectionCaracteristique.value = response.data.value 
              console.log(collectionCaracteristique.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // show.value = false
            }));
    })
    
}
 fetchAllData()

 const notify = (msg:string) => {
      toast(msg, {
        autoClose: 5000,
      });
}
async function pushData() {
  const objSend = {
    nom: collectionDataGet.value.nom,           
    isDisponible: collectionDataGet.value.isDisponible,
  }
  
  // watchEffect(async () => {
    await (
      useAxiosRequest().put(`maisons/${Number(collectionDataGet.value.id)}`, objSend
      ).then((response) => {
        // alert("Enregistement reussie")
        notify(response.data.message)
       
        
      }).catch(function (error) {
        console.log(error);
        alert(error)
      }).finally(function () {
             
      })
    )
  // })
    
}

const filePreview = (file:File) => {
    return URL.createObjectURL(file)
}

</script>

<template>
    <v-card elevation="10" class="px-5 p-10">
<v-row>
            <v-col cols="12" lg="12">
                <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Information sur la nouvelle maison </v-alert>
               
                <v-form>
    <v-row>
      <!-- Infos générales -->
      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Nom de la maison</v-label>
        <v-text-field variant="outlined" v-model="collectionDataGet.nom" color="primary" />
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Prix</v-label>
        <v-text-field type="number" variant="outlined" v-model="collectionDataGet.prix" color="primary" />
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Disponible</v-label>
        <v-switch v-model="collectionDataGet.isDisponible" color="primary" inset />
      </v-col>


     

    

      <v-col cols="12">
          
      </v-col>
    </v-row>
  </v-form>
  <!-- {{ dataInput.agentId }}
  {{ isDispo }} -->

        <!-- <v-btn color="error" class="mr-3" rounded="pill">Cancel</v-btn> -->
        <v-btn color="primary" @click="pushData()" rounded="pill">Sauvegarder</v-btn>
         </v-col>
    </v-row>
    </v-card>



</template>