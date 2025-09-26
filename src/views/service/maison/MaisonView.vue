<script setup lang="ts">

import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Loader } from '@progress/kendo-vue-indicators';
import { ref, watchEffect } from 'vue';
import { columnsMaison } from './column';
import type { Property } from './IDev';
import { useAxiosRequest } from '@/utils/service/custom';
import router from '@/router';
 

const collectionData = ref<Array<Property>>([])
const loader       = ref<Boolean>(false)
const show       = ref<Boolean>(true)
const type = "infinite-spinner"
const editField = ref<any>()
const gridPageable = {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: true,
        previousNext: true,
      } 
const sortable = ref(true);
const skip = ref<number>(0);
const take = ref<number>(4);
const sort = ref<SortDescriptor[] | undefined>([
      { field: "id", dir: "asc" }
    ]);
const filter = ref<CompositeFilterDescriptor>({logic: "and", filters: []});
const pageChangeHandler = (event:any) => {
      loader.value = true;
      setTimeout(() => {
       loader.value = false;
        skip.value = event.page.skip;
        take.value = event.page.take;
      }, 300);
    }
const cellClick = (e: any) => {
      if (e.dataItem.inEdit && e.field === editField.value) {
        return;
      }
      exitEdit(e.dataItem, true);
      editField.value = e.field;
      e.dataItem.inEdit = e.field;
    }
const exitEdit =  (dataItem:any, exitEdit:any) => {
      if (!exitEdit && dataItem.inEdit) {
        return;
      }
      collectionData.value.forEach((d:any) => {
        if (d.inEdit) {
          d.inEdit = undefined;
        }
      });
      editField.value = undefined;
    }
const itemChange =  (e:any)=> {
            const data =  collectionData.value.slice();
            const index = data.findIndex((d  => d.id === e.dataItem.id ))
            data[index] = { ...data[index], [e.field]: e.value };
            collectionData.value  = data;
        }
const filterChange =  (ev:any)=> {
      loader.value = true;
      console.log(ev);
      setTimeout(() => {
        filter.value = ev.filter;
        loader.value = false;
      }, 300);
    }

const fetchAllData = () =>{
    watchEffect(async()=>{
        await(useAxiosRequest().get(`/maisons/all`)
            .then(function (response) {
              collectionData.value = response.data.data 
              console.log(collectionData.value)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                show.value = false
            }));
    })
}
const routage = () => {
  router.push("/maison/add");
}
fetchAllData()
</script>
<template>
    <v-card elevation="10" class="px-5 p-10">
   
    
        <v-btn @click="routage()" color="secondary" dark rounded="outlined" class="ml-auto mt-5">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter une maison
        </v-btn>
    <v-row class="mt-5 mb-8">
        <grid
            @pagechange="pageChangeHandler"
            :columns="columnsMaison as any"
            :total ="collectionData.length"
                :data-items="collectionData"
            :edit-field="'inEdit'"
            :filter="filter"
            @cellclick="cellClick"
            :column-menu="true"
            :pageable="gridPageable"
            :sortable="sortable"
            :sort="sort"
            :take="take"
            :skip="skip"
            >
            </grid>
    </v-row>

    </v-card>
    
</template>