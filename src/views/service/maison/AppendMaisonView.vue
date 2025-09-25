<script setup lang="ts">
import { useAxiosRequest } from '@/utils/service/custom';
import { ref, watchEffect } from 'vue';
import { shallowRef } from 'vue'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

let model = shallowRef([])
const files = ref([])
function removeFile(index) {
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

const uniteMesureMaison: Array<IUniteMeasure & { id: number }> = [
  { id: 1, name: "Mètre carré", code: "m2" },
  { id: 2, name: "Mètre cube", code: "m3" },
  { id: 3, name: "Mètre", code: "m" },
  { id: 4, name: "Centimètre", code: "cm" },
  { id: 5, name: "Kilomètre", code: "km" },
  { id: 6, name: "Hectare", code: "ha" },
  { id: 7, name: "Acre", code: "ac" },
  { id: 8, name: "Pied carré", code: "ft2" },
  { id: 9, name: "Yard carré", code: "yd2" }
]

const tranchePaiement: Array<{ id: number; name: string; code: string }> = [
  { id: 1, name: "Paiement mensuel", code: "mois" },
  { id: 2, name: "Paiement trimestriel", code: "trimestre" },
  { id: 3, name: "Paiement semestriel", code: "semestre" },
  { id: 4, name: "Paiement annuel", code: "annee" },
  { id: 5, name: "Paiement unique", code: "unique" }
]

const communesKinshasa: { id: number; nom: string; cityId: number }[] = [
  { id: 1, nom: "Barumbu", cityId: 1 },
  { id: 2, nom: "Bumbu", cityId: 1 },
  { id: 3, nom: "Gombe", cityId: 1 },
  { id: 4, nom: "Kalamu", cityId: 1 },
  { id: 5, nom: "Kasa-Vubu", cityId: 1 },
  { id: 6, nom: "Kimbanseke", cityId: 1 },
  { id: 7, nom: "Kinshasa", cityId: 1 },
  { id: 8, nom: "Kintambo", cityId: 1 },
  { id: 9, nom: "Kisenso", cityId: 1 },
  { id: 10, nom: "Lemba", cityId: 1 },
  { id: 11, nom: "Limete", cityId: 1 },
  { id: 12, nom: "Lingwala", cityId: 1 },
  { id: 13, nom: "Makala", cityId: 1 },
  { id: 14, nom: "Maluku", cityId: 1 },
  { id: 15, nom: "Masina", cityId: 1 },
  { id: 16, nom: "Matete", cityId: 1 },
  { id: 17, nom: "Mont Ngafula", cityId: 1 },
  { id: 18, nom: "Ndjili", cityId: 1 },
  { id: 19, nom: "Ngaba", cityId: 1 },
  { id: 20, nom: "Ngaliema", cityId: 1 },
  { id: 21, nom: "Nsele", cityId: 1 },
  { id: 22, nom: "Selembao", cityId: 1 },
  { id: 23, nom: "Ngiri-Ngiri", cityId: 1 },
  { id: 24, nom: "Bandalungwa", cityId: 1 }
]

const cities = ref<ICity[]>([
  { id: 1, nom: 'Kinshasa' }
]);


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

let isDispo = ref(true)

const dataInput = ref<IMaison>({
  maisonId: 0,
  nom: "",
  caracteristique: [], // ex: [{ nom: "" }]
  images: [], // ex: [{ nom: "" }]
  measure:"",
  agentId: "",
  cityId: "",
  communeId: "",
  propertyId: "",
  statusPropertyId: "",
  isDisponible: true,
  superficie:"",
  prix: 0,
  partPayed: "",
  countryId: "",
  codePostal: ""
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
  propertyId: Number(dataInput.value.propertyId),
  statusPropertyId: Number(dataInput.value.statusPropertyId),
  isDisponible: true,
  superficie: dataInput.value.superficie,
  prix: Number(dataInput.value.prix),
  partPayed: Number(dataInput.value.partPayed),
  countryId: Number(dataInput.value.countryId),
  codePostal: dataInput.value.codePostal
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
        alert("Enregistement reussie")
        
      }).catch(function (error) {
        console.log(error);
        alert(error)
      }).finally(function () {
               // show.value = false
      })
    )
  })
    
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
        <v-text-field variant="outlined" v-model="dataInput.nom" color="primary" />
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Prix</v-label>
        <v-text-field type="number" variant="outlined" v-model="dataInput.prix" color="primary" />
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Tranche</v-label>
         <v-select :items="tranchePaiement" v-model="dataInput.partPayed"  item-title="code" id="sg" item-value="id"  single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Disponible</v-label>
        <v-switch v-model="isDispo" color="primary" inset />
      </v-col>

      <!-- Localisation -->
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Pays</v-label>
        <v-select :items="collectionData" v-model="dataInput.countryId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Ville</v-label>
        
       <v-select :items="collectionDataCity" v-model="dataInput.cityId"  item-title="name" id="sg" item-value="id"  single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Commune</v-label>
         <v-select :items="collectionDataCommune" v-model="dataInput.communeId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Code Postal</v-label>
        <v-text-field variant="outlined" v-model="dataInput.codePostal" color="primary" />
      </v-col>

      <!-- Agent / Propriété -->
      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Agent</v-label>
       <v-select :items="collectionDataAgent" v-model="dataInput.agentId"  item-title="nom" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Propriété</v-label>
         <v-select :items="collectionProperty" v-model="dataInput.propertyId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Statut</v-label>
        <v-select :items="collectionDataStatus" v-model="dataInput.statusPropertyId"  item-title="name" id="sg" item-value="id" single-line variant="outlined"></v-select>
      </v-col>

      <!-- Sections complexes -->
      <v-col cols="12">
        <v-label class="mb-2 font-weight-medium">Superficie terrain maison</v-label>
         <v-text-field type="text" variant="outlined" v-model="dataInput.superficie" color="primary" />
      </v-col>

      <v-col cols="12">
        <v-label class="mb-2 font-weight-medium">Mesure</v-label>
        <v-text-field type="text" variant="outlined" v-model="dataInput.measure" color="primary" />
      </v-col>
        <v-col cols="12" md="6">
                <v-label class="mb-2 font-weight-medium">Chambre</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.chambre" color="primary" />
                <v-label class="mb-2 font-weight-medium">Cuisine</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.cuisine" color="primary" />
                 <v-label class="mb-2 font-weight-medium">Salle de bain</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.salleBain" color="primary" />
                 <v-label class="mb-2 font-weight-medium">Garage</v-label>
                <v-text-field type="number" variant="outlined" v-model="dataInput.garage" color="primary" />
        </v-col>

      <v-col cols="12">
        <v-label class="mb-2 font-weight-medium">Caractéristiques</v-label>
         <v-combobox v-model="select" :items="collectionCaracteristique" hide-details label="" item-title="name"  item-value="id" item-text="label" multiple chips return-object></v-combobox>
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
              :src="URL.createObjectURL(file)"
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
        <v-btn color="error" class="mr-3" rounded="pill">Cancel</v-btn>
        <v-btn color="primary" @click="pushData()" rounded="pill">Sauvegarder</v-btn>
         </v-col>
    </v-row>
    </v-card>



</template>