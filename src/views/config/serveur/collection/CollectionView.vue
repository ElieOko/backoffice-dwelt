<script setup lang="ts">
import { ref } from "vue";
import { columnsCollection } from '@/utils/kendo/col';
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Loader } from '@progress/kendo-vue-indicators'
const show1 = ref(false);
const dialog = ref(false);
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false);
const server = ref("");
const servers = ref<Array<any>>([{name:"127.0.0.1"},{name:"127.123.4.1"},{name:"127.5.5.5"},{name:"127.0.0.4"}]);
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
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter une collection
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark style="flex: unset">
          <v-btn icon color="white" @click="dialog = false" flat>
            <XIcon  width="20" />
          </v-btn>
          <v-toolbar-title class="text-white">Append Collection</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark color="white" @click="dialog = false" flat> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item >
            <Form @submit="">
              <v-row>
                <v-col cols="12" sm="4">
                    <v-label class="text-subtitle-1 font-weight-medium pb-2">Server*</v-label>
                    <v-autocomplete v-model="server" label="Server"  item-title="name" item-value="name"   :items="servers" color="primary" variant="outlined" hide-details></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-label class="text-subtitle-1 font-weight-medium pb-2">Collection*</v-label>
                    <VTextField
                        label="Name"
                        class="mb-4"
                        required
                        hide-details="auto"></VTextField>
                </v-col>
              </v-row>
                
                <v-col cols="12" sm="4">
                    <v-btn size="large" rounded="pill" :loading="show1" color="primary" class="bg-red-500"  block type="submit" flat>Sauvegarder</v-btn>
                </v-col>
            </Form>    
        </v-card-item>
      </v-card>
    </v-dialog>
    <v-row class="mt-5 mb-8">
        <grid
            @pagechange="pageChangeHandler"
            :columns="columnsCollection as any"
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