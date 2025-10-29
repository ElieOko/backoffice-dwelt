<script setup lang="ts">
import { useAxiosRequest } from '@/utils/service/custom';
import { ref, watchEffect } from 'vue';
import { shallowRef } from 'vue'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
const files = ref<File[]>([]);
const loader = ref(false)
// function removeFile(index : number) {
//   files.value.splice(index, 1)
// }
const type = "infinite-spinner"
const show       = ref<Boolean>(true)
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
const notify = (msg:string) => {
      toast(msg, {
        autoClose: 5000,
      });
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

const dataInput = ref<IMaison>({
  maisonId: 0,
  nom: "",
  caracteristique: [], // ex: [{ nom: "" }]
  images: [], // ex: [{ nom: "" }]
  measure:"0",
  agentId: 1,
  cityId: 1,
  communeId: 4,
  propertyTypeId: 1,
  statusPropertyId: 2,
  isDisponible: true,
  superficie:"0",
  prix: 0,
  partPayed: "",
  countryId: 1,
  codePostal: "012",
  cuisine: 0,
  chambre: 0,
  salleBain:0,
  garage:0
})


const fetchAllData = () =>{
    watchEffect(async()=>{
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
async function pushData() {
 show.value = true
await prepareImages()

const objSend = {
  maisonId: dataInput.value.maisonId,
  nom: dataInput.value.nom,               // [{ nom, nombre }]
  caracteristique: dataInput.value.caracteristique, // [{ nom }]
  images: dataInput.value.images,              // [{ nom, data }]
  measure: dataInput.value.measure,
  agentId: Number(dataInput.value.agentId),
  cityId: Number(dataInput.value.cityId),
  communeId: Number(dataInput.value.communeId),
  propertyTypeId: Number(dataInput.value.propertyTypeId),
  statusPropertyId: Number(dataInput.value.statusPropertyId),
  isDisponible: dataInput.value.isDisponible,
  superficie: dataInput.value.superficie,
  prix: Number(dataInput.value.prix),
  partPayed: dataInput.value.partPayed,
  countryId: Number(dataInput.value.countryId),
  codePostal: dataInput.value.codePostal,
  chambre: Number(dataInput.value.chambre),
  cuisine : Number(dataInput.value.cuisine),
  salleBain: Number(dataInput.value.salleBain),
  garage: Number(dataInput.value.garage),
  description: dataInput.value.description
  
  }
  

  watchEffect(async () => {
    await (
      useAxiosRequest().post("maisons", objSend,
         {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
      ).then((response) => {
         notify(response.data.message)
      //  alert("Enregistement reussie")
        
      }).catch(function (error) {
        console.log(error);
         notify(`${error} une erreur est sur les champs envoyés`)
        alert(error)
      }).finally(function () {
               show.value = false
      })
    )
  })
    
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
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Nom de la maison *</v-label>
        <v-text-field variant="outlined" v-model="dataInput.nom" color="primary" />
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Prix *</v-label>
        <v-text-field type="number" variant="outlined" v-model="dataInput.prix" color="primary" />
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Tranche</v-label>
         <v-select :items="tranchePaiement" v-model="dataInput.partPayed"  item-title="name" id="sg" item-value="code"  single-line variant="outlined"></v-select>
      </v-col>

      <!-- <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Disponible</v-label>
        <v-switch v-model="dataInput.isDisponible" color="primary" inset />
      </v-col> -->

      <!-- Localisation -->
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Pays *</v-label>
        <v-select :items="collectionData" v-model="dataInput.countryId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Ville *</v-label>
        
       <v-select :items="collectionDataCity" v-model="dataInput.cityId"  item-title="name" id="sg" item-value="id"  single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Commune *</v-label>
         <v-select :items="collectionDataCommune" v-model="dataInput.communeId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Code Postal</v-label>
        <v-text-field variant="outlined" v-model="dataInput.codePostal" color="primary" />
      </v-col>

      <!-- Agent / Propriété -->
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Agent *</v-label>
       <v-select :items="collectionDataAgent" v-model="dataInput.agentId"  item-title="nom" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Propriété *</v-label>
         <v-select :items="collectionProperty" v-model="dataInput.propertyTypeId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Statut *</v-label>
        <v-select :items="collectionDataStatus" v-model="dataInput.statusPropertyId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <!-- Sections complexes -->
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Superficie terrain maison</v-label>
         <v-text-field type="number" variant="outlined" v-model="dataInput.superficie" color="primary" />
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Mesure</v-label>
        <v-text-field type="number" variant="outlined" v-model="dataInput.measure" color="primary" />
      </v-col>
        <v-col cols="12" md="4">
                <v-label class="mb-2 font-weight-medium">Chambre</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.chambre" color="primary" />
        </v-col>
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Cuisine</v-label>
        <v-text-field type="number" variant="outlined" v-model="dataInput.cuisine" color="primary" />
      </v-col>
      <v-col cols="12" md="4">
         <v-label class="mb-2 font-weight-medium">Salle de bain</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.salleBain" color="primary" />
      </v-col>
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Garage</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.garage" color="primary" />
      </v-col>
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Caractéristiques</v-label>
         <v-combobox v-model="select" :items="collectionCaracteristique" hide-details label="" item-title="name"  item-value="id" item-text="label" multiple chips return-object></v-combobox>
      </v-col>
      <v-col cols="12" md="6">
          <v-label class="mb-2 font-weight-medium" for="fn">Description</v-label>
          <v-textarea variant="outlined" color="primary" v-model="dataInput.description" id="ln"></v-textarea>
      </v-col>

      <v-col cols="12">
           <v-container>
    <!-- Upload -->
    <v-file-upload
      v-model="files"
      label="Uploader vos fichiers"
      multiple
      accept="image/*"
    />

    <!-- Liste des fichiers -->
    <div v-if="files.length" class="mt-4">
      <h3>Fichiers sélectionnés :</h3>
      <v-row>
        <v-col
          v-for="(file, index) in files"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card>
            <!-- Aperçu image -->
            <v-img
              v-if="file.type.startsWith('image/')"
              :src="filePreview(file)"
              height="150"
              cover
            />

            <v-card-text>
              {{ file.name }} <br />
              {{ (file.size / 1024).toFixed(1) }} KB
              <span>X</span>
              <!-- <v-btn
                class="text-red-500"
                color="red"
                variant="text"
                @click="removeFile(index)"
              >
                
              </v-btn> -->
            </v-card-text>

            <!-- Bouton supprimer -->
            <v-card-actions>
              
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
      </v-col>
    </v-row>
  </v-form>
  <!-- {{ dataInput.agentId }}
  {{ isDispo }} -->
        <div class="mb-8 flex justify-center p-8">
             <!-- <v-btn color="error" class="mr-3" rounded="pill">Cancel</v-btn> -->
              <v-btn color="#2F4F4F" class="w-[450px]" @click="pushData()" rounded="pill">Sauvegarder</v-btn>
        </div>
       
         </v-col>
    </v-row>
    </v-card>


<!-- <div v-if="show" class="k-loader-container k-loader-container-md k-loader-top">
      <div class="k-loader-container-overlay k-overlay-dark" />
      <div class="k-loader-container-inner">
        <Loader :size="'large'" :type="type" />
      </div>
    </div> -->
</template>