<template>
  <div id="content" v-show="false">
    <div
      v-for="(item, index) in items"
      :key="index"
      style="
        width: 400px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #f9f9f9;
      "
    >
      <div
        class="d-flex justify-space-between"
        v-for="(value, key) in item"
        :key="key + index"
      >
        <span style="font-weight: bold">{{ key }}:</span>
        <span class="truncate-text">{{
          value.length > 50 ? value.substring(0, 30) : value
        }}</span>
      </div>
    </div>
  </div>

  <div>
    <h1 class="mb-4">Istoric Produse Adaugate</h1>
  </div>
  <div>
    <v-card color="grey-darken-4">
      <v-card-title class="d-flex align-center">
        Cautare

        <v-spacer></v-spacer>

        <v-btn flat color="orange" class="mx-2" @click="htmlToPdf"
          >Export to PDF
        </v-btn>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          dense
          label="Search"
          single-line
          flat
          hide-details
          variant="solo-filled"
        ></v-text-field>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table
        ref="dataTable"
        v-model:search="search"
        :items="items"
        :headers="headers"
        show-overflow
        fixed-header
        class="fill-height flex-column"
        :items-per-page="25"
      >
        <template v-slot:item.product_link="{ item }">
          <a :href="item.product_link" target="_blank">{{
            linkFormat(item.product_link)
          }}</a>
        </template>

        <template v-slot:item.image_id="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img :src="item.image_id" height="64" cover></v-img>
          </v-card>
        </template>
        <template v-slot:item.delete_entry="{ item }">
          <v-btn @click="toggleModal(item)" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-card
      color="grey-darken-4"
      width="100%"
      style="position: sticky; bottom: 0px"
    >
      <v-card-title class="d-flex" style="justify-content: space-evenly">
        <v-btn @click="$router.push('/')" flat color="orange">
          <v-icon>mdi-calculator</v-icon>
          <span class="ml-2 flex-grow">Calculator</span>
        </v-btn>
        <v-divider vertical class="ma-3"></v-divider>
        <v-btn @click="$router.push('/history')" flat color="orange">
          <v-icon>mdi-history</v-icon>
          <span class="ml-2">Vezi produse salvate</span>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-dialog v-model="modalVisible" max-width="500px">
      <v-card>
  <v-card-title class="headline text-center">Sterge produs</v-card-title>
  <v-card-text class="text-center">
    Esti sigur(a) ca doresti sa stergi acest produs?
  </v-card-text>
  <v-card-actions class="d-flex justify-center">
    <v-btn @click="deleteItem(currentItemId)">Sterge</v-btn>
    <v-btn @click="toggleModal">Close</v-btn>
  </v-card-actions>
</v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import headers from "../components/js/headers";
const search = ref("");
const items = ref([]);
const pagination = ref(false);
const dataTable = ref(null);
const currentItemId = ref(null);
const modalVisible = ref(false);
const showComponent = ref(false);

const toggleModal = (item) => {
  currentItemId.value = item.id;
  console.log("Current Item ID:", currentItemId.value);
  modalVisible.value = !modalVisible.value;
};

const closeModal = () => {
  modalVisible.value = false;
};

const fetchItems = () => {
  fetch("https://roffon.ro/api_seb/calculator.php")
    .then((response) => response.json())
    .then((data) => {
      items.value = data;
    })
    .catch((err) => console.log(err));
};

const deleteItem = (itemId) => {
  fetch("https://roffon.ro/api_seb/calculator.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: itemId }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to delete item");
      }
    })
    .then((data) => {
      console.log(data);
      items.value = items.value.filter((item) => item.id !== itemId);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
    });
};

const htmlToPdf = async () => {
  const htmlContent = document.getElementById("content").innerHTML;
  const url = "https://yakpdf.p.rapidapi.com/pdf";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "096339dfcdmshf459ee8181b2b9fp18d767jsn61250751abc6",
      "X-RapidAPI-Host": "yakpdf.p.rapidapi.com",
    },
    body: JSON.stringify({
      source: {
        html: htmlContent,
      },
      pdf: {
        format: "A4",
        scale: 1,
        printBackground: true,
      },
      wait: {
        for: "navigation",
        waitUntil: "load",
        timeout: 2500,
      },
    }),
  };

  try {
    const response = await fetch(url, options);
    const pdfContent = await response.blob();

    // Create a Blob URL for the PDF content
    const blobUrl = URL.createObjectURL(pdfContent);

    // Create a link element
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = "output.pdf";

    // Append the link to the document and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error(error);
  }
};

const linkFormat = (product_link) => {
  return product_link.length > 80
    ? product_link.substring(0, 80) + "..."
    : product_link;
};

onMounted(fetchItems);
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .v-data-table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px; /* Adjust the maximum width as needed */
  }

  .v-data-table td {
    border-bottom: thin solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    display: block;
    text-align: right;
    line-height: 48px;
  }

  .v-data-table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  .v-data-table td:last-child {
    border-bottom: 0;
  }

  .v-data-table tr:not(:first-child) > td:first-child {
    border-top: medium solid
      rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
