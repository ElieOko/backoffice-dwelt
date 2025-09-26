<script setup lang="ts">
import { useAxiosRequest } from '@/utils/service/custom';
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Loader } from '@progress/kendo-vue-indicators';
import { ref, watchEffect } from 'vue';
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { columns } from './column';

interface IFile{
     nom: String
}
interface Standar{
     id? : Number
     nom: String
     description: String
     role: String
     phone : String
     email : String
     image: Array<IFile>
     path : String
     is_active: Boolean
     created_at: String
     updated_at:String
}

const dataInput = ref<Standar>({
  nom: "",
  image: [],
  path: "",
  is_active: true,
  created_at: "",
  updated_at: "",
  description: "",
  role: "",
  email: "",
  phone : ""
})

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

async function prepareImages() {
  dataInput.value.image = await Promise.all(
    files.value.map(async file => ({
      nom: file.name,
      data: await fileToBase64(file)
    }))
  )
}

const show1 = ref(false);
const dialog = ref(false);
const files = ref([])
const collectionData = ref<Array<Standar>>([])
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false);
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


const pushData = async () => {
     await prepareImages()
const objSend = {
       nom: dataInput.value.nom,
       role: dataInput.value.role,
       phone: dataInput.value.phone,
       description: dataInput.value.description,
       email: dataInput.value.email, 
       images : dataInput.value.image
     }
     watchEffect(async () => {
    await (
      useAxiosRequest().post("agents", objSend,
         {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
      ).then((response) => {
          alert(response.data.message)
          fetchAllData()
        
      }).catch(function (error) {
        console.log(error);
        alert(error)
      }).finally(function () {
               // show.value = false
      })
    )
  })
}

const fetchAllData = () => {
     watchEffect(async () => {
          await (useAxiosRequest().get(`/agents/all`)
               .then(function (response) {
                    collectionData.value = response.data.agents
                    console.log(collectionData.value)
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

</script>
<template>
     <div>
          <v-card elevation="10" class="px-5 p-10">
          <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="secondary" dark v-bind="props" rounded="outlined" class="ml-auto mt-5">
            <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un Agent Immobilier
        </v-btn>
      </template>
      <v-card class="p-10">
        <v-toolbar dark style="flex: unset">
          <v-btn icon color="white" @click="dialog = false" flat>
            <XIcon  width="20" />
          </v-btn>
          <v-toolbar-title class="text-white">Append Agent Immobilier</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark color="white" @click="dialog = false" flat> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item class="px-4">
            <Form class="">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-label class="text-subtitle-1 font-weight-medium pb-2">Nom complet</v-label>
                        <VTextField
                            class="mb-4"
                            required
                            v-model="dataInput.nom"
                            hide-details="auto"></VTextField>
                            <v-label class="text-subtitle-1 font-weight-medium pb-2">Email</v-label>
                        <VTextField
                            class="mb-4"
                            required
                            v-model="dataInput.email"
                            hide-details="auto"></VTextField>
                        <v-label class="text-subtitle-1 font-weight-medium pb-2">Phone</v-label>
                        <VTextField
                            class="mb-4"
                            required
                            v-model="dataInput.phone"
                            hide-details="auto"></VTextField>
                            <v-label class="text-subtitle-1 font-weight-medium pb-2">Role</v-label>
                        <VTextField
                            class="mb-4"
                            required
                            v-model="dataInput.role"
                            hide-details="auto"></VTextField>
                    <v-label class="mb-2 font-weight-medium" for="fn">Description</v-label>
                    <v-textarea variant="outlined" color="primary" v-model="dataInput.description" id="ln"></v-textarea>
                    </v-col>
                </v-row>
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
                <v-col cols="12" sm="4">
                    <v-btn size="large" rounded="pill" @click="pushData()" color="primary" class="bg-red-500"   block type="button" flat>Sauvegarder</v-btn>
                </v-col>
            </Form>
        </v-card-item>
      </v-card>
          </v-dialog>
               <v-row class="mt-5 mb-8">
           <grid
            @pagechange="pageChangeHandler"
            :columns="columns as any"
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
         
     </div>
</template>