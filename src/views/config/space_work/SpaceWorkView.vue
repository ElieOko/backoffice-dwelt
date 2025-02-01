<script setup lang="ts">
import { ref } from "vue";
import { columnsWorkSpace } from '@/utils/kendo/col';
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Loader } from '@progress/kendo-vue-indicators'

const dialog = ref(false);
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false);
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
            const index = data.findIndex((d  => d._id === e.dataItem.id ))
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
</script>

<template>
<v-card elevation="10" class="px-5 p-10">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="secondary" dark v-bind="props" rounded="outlined" class="ml-auto mt-5">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un WorkSpace
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark style="flex: unset">
          <v-btn icon color="white" @click="dialog = false" flat>
            <XIcon  width="20" />
          </v-btn>
          <v-toolbar-title class="text-white">Append new WorkSpace</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark color="white" @click="dialog = false" flat> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item>
          <v-list lines="two" subheader>
            User Controls
            <v-list-item
              title="Content filtering"
              subtitle="Set the content filtering level to restrict apps that can be downloaded"
            ></v-list-item>
            <v-list-item
              title="Password"
              subtitle="Require password for purchase or use password to restrict purchase"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list lines="two" subheader>
            General
            <v-list-item
              title="Notifications"
              subtitle="Notify me about updates to apps or games that I downloaded"
            >
              <template v-slot:prepend>
                <v-checkbox v-model="notifications"></v-checkbox>
              </template>
            </v-list-item>
            <v-list-item
              title="Sound"
              subtitle="Auto-update apps at any time. Data charges may apply"
            >
              <template v-slot:prepend>
                <v-checkbox v-model="sound"></v-checkbox>
              </template>
            </v-list-item>
            <v-list-item
              title="Auto-add widgets"
              subtitle="Automatically add home screen widgets"
            >
              <template v-slot:prepend>
                <v-checkbox v-model="widgets"></v-checkbox>
              </template>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-card>
    </v-dialog>
        <v-row class="mt-5 mb-8">
                <grid
                @pagechange="pageChangeHandler"
                :columns="columnsWorkSpace as any"
                :edit-field="'inEdit'"
                :filter="filter"
                @cellclick="cellClick"
                @itemchange="itemChange"
                @filterchange="filterChange"
                :loader="loader"
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