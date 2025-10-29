<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { columns } from './column';
import { useAxiosRequest } from '@/utils/service/custom';


interface Standar{
    id: Number
    name: String
    is_active: Boolean
    created_at: String
    updated_at:String
}

const collectionDataStatus = ref<Array<Standar>>([])
const collectionData = ref<Array<Standar>>([])
const collectionCaracteristique = ref<Array<Standar>>([])
const collectionProperty = ref<Array<Standar>>([])
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
                show.value = false
            }));
    })
    
}
 fetchAllData()
</script>
<template>
     <div>
        <v-card elevation="10" class="px-5 p-10">
        <v-btn  color="#2F4F4F" dark rounded="outlined" class="ml-auto mt-5">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon> Caracteristique
        </v-btn>
    <v-row class="mt-5 mb-8">
        <grid
            @pagechange="pageChangeHandler"
            :columns="columns as any"
            :total ="collectionCaracteristique.length"
                :data-items="collectionCaracteristique"
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
    <v-card elevation="10" class="px-5 p-10 mt-5">
        <v-btn  color="#2F4F4F" dark rounded="outlined" class="ml-auto mt-5">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Type de maison
        </v-btn>
    <v-row class="mt-5 mb-8">
        <grid
            @pagechange="pageChangeHandler"
            :columns="columns as any"
            :total ="collectionProperty.length"
                :data-items="collectionProperty"
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

    <v-card elevation="10" class="px-5 p-10 mt-5">
        <v-btn  color="#2F4F4F" dark rounded="outlined" class="ml-auto mt-5">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Status Maison
        </v-btn>
    <v-row class="mt-5 mb-8">
        <grid
            @pagechange="pageChangeHandler"
            :columns="columns as any"
            :total ="collectionDataStatus.length"
                :data-items="collectionDataStatus"
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
     </div>
      <div v-if="show" class="k-loader-container k-loader-container-md k-loader-top">
      <div class="k-loader-container-overlay k-overlay-dark" />
      <div class="k-loader-container-inner">
        <Loader :size="'large'" :type="type" />
      </div>
    </div>
</template>