<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <v-label class="mb-2 font-weight-medium mt-5">Toutes les maisons</v-label>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <v-card v-for="property in collectionData" :key="property.id" class="mx-auto max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300">
        
        <!-- Image -->
        <v-img
          height="200"
          :src="property.images.length ? `${property.images[0].nom}` : defaultImage" cover
        >
          <v-card-title class="text-white bg-black bg-opacity-50">{{ property.nom }}</v-card-title>
        </v-img>

        <!-- Subtitle -->
        <v-card-subtitle class="pt-2 pl-4 text-gray-700">
          {{ property.city?.name || 'Ville inconnue' }}
        </v-card-subtitle>

        <!-- Card main content -->
        <v-card-text class="pl-4 pr-4 pt-2 text-gray-700">
          <div><strong>Prix :</strong> {{ property.prix }} $</div>
          <div><strong>Superficie :</strong> {{ property.superficie }} m²</div>
          <div><strong>Agent :</strong> {{ property.agent?.nom }}</div>
        </v-card-text>

        <!-- Actions -->
        <v-card-actions>
          <router-link :to="{ name: 'maison_id', params: { id: property.id } }">
            <v-btn color="orange">Detail</v-btn>
          </router-link>
           <v-btn  color="#FF5252" @click="deleteProperty(property.id)">Delete</v-btn>
          <v-btn icon @click="toggleExpand(property.id)">
            <v-icon>{{ expandedId === property.id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <!-- Expandable section -->
        <v-expand-transition>
          <div v-show="expandedId === property.id" class="pl-4 pr-4 pb-4 text-gray-700">
            <v-divider class="mb-2"></v-divider>
            <div class="space-y-1">
              <div><strong>Caractéristiques :</strong> {{ property.caracteristique?.map(c => c.nom).join(', ') || 'N/A' }}</div>
              <div><strong>Commune :</strong> {{ property.commune?.name || 'N/A' }}</div>
              <div><strong>Status :</strong> {{ property.status_property?.name || 'N/A' }}</div>
              <div><strong>Salle de bain :</strong> {{ property.salleBain || 'N/A' }}</div>
              <div><strong>Chambre :</strong> {{ property.chambre || 'N/A' }}</div>
              <div><strong>Cuisine :</strong> {{ property.cuisine || 'N/A' }}</div>
              <div><strong>Garage :</strong> {{ property.garage || 'N/A' }}</div>
            </div>
          </div>
        </v-expand-transition>

      </v-card>
    </div>
  </div>
   <div v-if="show" class="k-loader-container k-loader-container-md k-loader-top">
      <div class="k-loader-container-overlay k-overlay-dark" />
      <div class="k-loader-container-inner">
        <Loader :size="'large'" :type="type" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Property } from './IDev'
import { useAxiosRequest } from '@/utils/service/custom'
import { Loader } from '@progress/kendo-vue-indicators';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const type = "infinite-spinner"
const show       = ref<Boolean>(true)
const collectionData = ref<Property[]>([])
const expandedId = ref<number | null>(null)
const defaultImage = 'https://via.placeholder.com/400x200.png?text=No+Image'

const toggleExpand = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id
}

const shareProperty = (property: Property) => {
  alert(`Partager la propriété : ${property.nom}`)
}

const exploreProperty = (property: Property) => {
  alert(`Explorer la propriété : ${property.nom}`)
}

// Fetch data
const fetchAllData = () => {
  watchEffect(async () => {
    await useAxiosRequest().get(`/maisons`)
      .then(response => {
        collectionData.value = response.data.data
        console.log(collectionData.value)
      })
      .catch(error => console.log(error))
      .finally(function () {
        show.value = false
      })
  })
}

fetchAllData()

const notify = (msg:string) => {
      toast(msg, {
        autoClose: 5000,
      });
}
const deleteProperty = (id:number) => {
  watchEffect(async () => {
    await useAxiosRequest().get(`/maisons/destroy/${id}`)
      .then(response => {
        notify(response.data.message)
        console.log(response.data.message)
        fetchAllData()
      })
      .catch(error => console.log(error))
  })
}

</script>

<style scoped>
/* Si tu veux un style additionnel pour le hover ou la transition */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
