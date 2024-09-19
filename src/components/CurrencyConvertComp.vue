<template>
  <h1 class="mb-3">
    hello world <br />
    currency convertor
  </h1>
  <div class="d-flex flex-column justify-center align-center">
    <v-row>
    <v-col cols="2">
      <h2>From:</h2>
    </v-col>
    <v-col cols="5">
      <v-autocomplete
    v-model="fromCurrency"
    :items="symbols"
    clearable
  ></v-autocomplete>
    </v-col>
  <v-col cols="5"> 
    <v-text-field type="number" v-model="amount" ></v-text-field>
    </v-col>
  </v-row>
  <v-row >
    <v-col cols="2">    
      <h2>To:</h2>
    </v-col>
    <v-col cols="5">
      <v-autocomplete
    v-model="toCurrency"
    :items="symbols"
    :title="currencies"
    clearable
  ></v-autocomplete>
    </v-col>
  <v-col cols="5">
    <v-text-field
    type="number"
    readonly
    v-model="resultConversion"
  ></v-text-field>
  </v-col>
  </v-row>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";

const fromCurrency = ref("");
const toCurrency = ref("");
const symbols = ref([]);
const amount = ref(null);
const currencies = ref([]);
const resultConversion = ref(null);

const fetchCurrencies = async () => {
  const url =
    "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "096339dfcdmshf459ee8181b2b9fp18d767jsn61250751abc6",
      "X-RapidAPI-Host":
        "currency-conversion-and-exchange-rates.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    symbols.value = Object.keys(result.symbols);
    currencies.value = Object.values(result.symbol);

    console.log("Symbols:", symbols.value);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const convertApi = async () => {
  const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amount.value}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "096339dfcdmshf459ee8181b2b9fp18d767jsn61250751abc6",
      "X-RapidAPI-Host":
        "currency-conversion-and-exchange-rates.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result, "mere?");
    resultConversion.value = result.result;
    console.log(resultConversion.value);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};


onMounted(() => {
  fetchCurrencies();
});

watch([fromCurrency, toCurrency, amount], () => {
  console.log("From:", fromCurrency.value);
  console.log("To:", toCurrency.value);
  console.log("Amount:", amount.value);
  if (fromCurrency.value && toCurrency.value && amount.value) {
    convertApi();
  }
});
</script>
