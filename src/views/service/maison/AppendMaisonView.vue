<script setup lang="ts">
import { ref } from 'vue';
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


const people = ref<IAgent[]>([
  {
      nom: 'Jean Mukoko',
      role: 'Directeur Général',
      description: 'Responsable de la stratégie et de la gestion globale de l’entreprise.',
      phone: '+243 999 111 222',
      email: 'jean.mukoko@example.com',
      image: 'https://via.placeholder.com/150',
      id: 1
  },
  {
      nom: 'Marie Kabasele',
      role: 'Chef de Projet',
      description: 'Coordonne les projets et s’assure du respect des délais et budgets.',
      phone: '+243 999 333 444',
      email: 'marie.kabasele@example.com',
      id: 2
  },
  {
      nom: 'Pierre Luntumbue',
      role: 'Responsable Marketing',
      description: 'Développe la stratégie marketing et les campagnes publicitaires.',
      phone: '+243 999 555 666',
      email: 'pierre.luntumbue@example.com',
      image: 'https://via.placeholder.com/150',
      id: 3
  }
])
const country = ref<ICity[]>([
  { id: 1, nom: 'République Démocratique du Congo' }
]);

type Amenity = {
  id: number;
  label: string;
};

// Liste des équipements possibles
const amenities = ref<Amenity[]>([
  { id: 1, label: 'Air conditionné' },
  { id: 2, label: 'Réfrigérateur' },
  { id: 3, label: 'Machine à laver' },
  { id: 4, label: 'Télévision' },
  { id: 5, label: 'Internet haut débit' },
  { id: 6, label: 'Piscine' },
  { id: 7, label: 'Parking' },
  { id: 8, label: 'Générateur électrique' }
]);

const select = ref([]);
type PropertyType = {
  id: number;
  name: string;
  description?: string; // optionnel
};

// Liste des types de propriété
const propertyTypes = ref<PropertyType[]>([
  { id: 1, name: 'Villa', description: 'Maison individuelle avec jardin/piscine' },
  { id: 2, name: 'Hôtel', description: 'Établissement avec chambres et services' },
  { id: 3, name: 'Appartement', description: 'Unité dans un immeuble collectif' },
  { id: 4, name: 'Studio', description: 'Petit logement pour 1 ou 2 personnes' },
  { id: 5, name: 'Maison d’hôtes', description: 'Chambres chez l’habitant avec petit-déjeuner' },
]);


const dataInput = ref<IMaison>({
  maisonId: 0,
  nom: "",
  piece: [], // ex: [{ nom: "", nombre: 0 }]
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
type PropertyStatus = {
  id: number;
  label: string;
};

// Liste des statuts possibles
const propertyStatuses = ref<PropertyStatus[]>([
  { id: 1, label: 'À louer' },
  { id: 2, label: 'À vendre' },
  { id: 3, label: 'Vendu' },
  { id: 4, label: 'Loué' },
  { id: 5, label: 'En négociation' }
]);

//useAxiosRequest
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
         <v-select :items="tranchePaiement" v-model="dataInput.partPayed"  item-title="code" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Disponible</v-label>
        <v-switch v-model="dataInput.isDisponible" color="primary" inset />
      </v-col>

      <!-- Localisation -->
      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Pays</v-label>
        <v-select :items="country" v-model="dataInput.countryId"  item-title="nom" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Ville</v-label>
        
       <v-select :items="cities" v-model="dataInput.cityId"  item-title="nom" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-label class="mb-2 font-weight-medium">Commune</v-label>
         <v-select :items="communesKinshasa" v-model="dataInput.communeId"  item-title="nom" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Code Postal</v-label>
        <v-text-field variant="outlined" v-model="dataInput.codePostal" color="primary" />
      </v-col>

      <!-- Agent / Propriété -->
      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Agent</v-label>
       <v-select :items="people" v-model="dataInput.agentId"  item-title="nom" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Propriété</v-label>
         <v-select :items="propertyTypes" v-model="dataInput.propertyId"  item-title="name" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-label class="mb-2 font-weight-medium">Statut</v-label>
        <v-select :items="propertyStatuses" v-model="dataInput.statusPropertyId"  item-title="label" id="sg" item-value="id" return-object single-line variant="outlined"></v-select>
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
         <v-combobox v-model="select" :items="amenities" hide-details label="I use chips" item-title="label"  item-value="id" item-text="label" multiple chips return-object></v-combobox>
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
        <v-btn color="error" class="mr-3" rounded="pill">Cancel</v-btn>
        <v-btn color="primary" @click="()=>{}" rounded="pill">Sauvegarder</v-btn>
         </v-col>
    </v-row>
    </v-card>



</template>