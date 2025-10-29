<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <v-label class="mb-2 font-weight-medium mt-5">Toutes les publicités</v-label>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <v-card v-for="property in collectionData" :key="property.id as number" class="mx-auto max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300">
        
        <!-- Image -->
        <v-img
          height="200"
          :src="`${property.image}`" cover
        >
          <v-card-title class="text-white bg-black bg-opacity-50">{{ property.name }}</v-card-title>
        </v-img>


        

        <!-- Card main content -->
        <v-card-text class="pl-4 pr-4 pt-2 text-gray-700">
          <div><strong></strong> {{ property.description }} $</div>
          
        </v-card-text>

        <!-- Actions -->
        <v-card-actions>
          <!-- <router-link :to="{ name: 'maison_id', params: { id: property.id } }">
            <v-btn color="orange">Detail</v-btn>
          </router-link> -->
           <v-btn  color="#FF5252" @click="deletePub(property.id as number)">Delete</v-btn>
          <v-btn icon @click="toggleExpand(property.id as number)">
            <v-icon>{{ expandedId === property.id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

    
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
import { useAxiosRequest } from '@/utils/service/custom'
import { Loader } from '@progress/kendo-vue-indicators';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { IFile } from './PubliciteView.vue';

interface Standar{
     id? : Number
  name: String,
     description?:String,
     image: String
     path : String
     is_active: Boolean
     created_at: String
     updated_at:String
}

const type = "infinite-spinner"
const show       = ref<Boolean>(true)
const collectionData = ref<Standar[]>([])
const expandedId = ref<number | null>(null)
const defaultImage = 'https://via.placeholder.com/400x200.png?text=No+Image'

const toggleExpand = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id
}

// Fetch data
const fetchAllData = () => {
  watchEffect(async () => {
    await useAxiosRequest().get(`/publicite`)
      .then(response => {
        collectionData.value = response.data.pubs
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
const deletePub = (id:number) => {
  watchEffect(async () => {
    await useAxiosRequest().get(`/publicite/destroy/${id}`)
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
