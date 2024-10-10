<template>
  <h1 class="mt-6"><v-icon>mdi-calculator</v-icon>Calculator e-commerce</h1>
  <h2 class="ma-3">
    Exchange rate on {{ getDate() }} <br />
    1 USD is {{ currencyUSD }} RON <br />
    1 EUR is {{ currencyEUR }} RON
  </h2>

  <div class="card" style="position: relative; min-height: 100vh">
    <v-card color="grey-darken-4">
      <v-title>Add product details</v-title>

      <v-card color="grey-darken-3" class="mx-6 mt-6 mb-8 pb-0">
        <v-text-field
          class="mx-2 mt-6"
          variant="outlined"
          label="add product name"
          prepend-inner-icon="mdi-plus"
          v-model="productName"
        ></v-text-field>
        <v-text-field
          class="ma-2"
          variant="outlined"
          label="add product link"
          v-model="productLink"
          prepend-inner-icon="mdi-link-variant"
        ></v-text-field>
        <v-text-field
          class="ma-2"
          variant="outlined"
          label="add photo link"
          prepend-inner-icon="mdi-camera"
          v-model="productImage"
        ></v-text-field>
        <v-text-field
          class="ma-2"
          variant="outlined"
          label="Product cost"
          min="0"
          v-model="productCost"
          type="number"
        />
        <v-text-field
          class="ma-2"
          variant="outlined"
          label="Shipping cost"
          min="0"
          v-model="shippingCost"
          type="number"
        />
        <v-text-field
          class="ma-2"
          variant="outlined"
          label="Number of products"
          v-model="numOfProducts"
          type="number"
        />
        <v-text-field
          class="ma-2"
          variant="outlined"
          label="monthly number of ordered products"
          v-model="numOfMonthlyProducts"
          type="number"
        />
        <v-combobox
          class="ma-2"
          variant="outlined"
          label="ROI"
          v-model="selectedPercentage"
          :items="ROI"
        ></v-combobox>
      </v-card>
      <v-divider color="orange" class="border-opacity-100 mb-6"></v-divider>
      <v-row>
        <v-col style="width: 500px">
          <v-chip variant="flat" size="large" color="orange" class="mb-6"
            >Product costs</v-chip
          >
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Product price + shipping"
            min="0"
            v-model="calculateShippingandProductCost"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Product cost + Alibaba Comission"
            min="0"
            v-model="calculateAlibabaCommission"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="VAT (product + shipping + commission) + 19%"
            min="0"
            v-model="calculateOrderValuePlusVAT"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Customs fee(1-9%)"
            min="0"
            v-model="taxaVamala"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Import value after customs"
            v-model="calculateCustomsFee"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Tranzit tax"
            min="0"
            v-model="transitTax"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Customs broker"
            min="0"
            v-model="comisionarVamal"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Ads price"
            min="0"
            v-model="calculateAdsPrice"
            type="number"
          />
        </v-col>
        <v-col style="width: 500px">
          <v-chip variant="flat" size="large" color="orange" class="mb-6"
            >Subscriptions</v-chip
          >
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Minea sub"
            v-model="subscriptionMinea"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="EasySell Sub"
            v-model="subscriptionPaperform"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Shopify Sub"
            v-model="subscriptionMake"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="FGO Sub"
            v-model="subscriptionFgo"
            type="number"
          />
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Hosting and domain"
            v-model="hostAndDomain"
            type="number"
          />
        </v-col>
        <v-col style="width: 500px">
          <v-chip variant="flat" size="large" color="orange" class="mb-6"
            >Storage + local shipping costs</v-chip
          >
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="add height(H)"
            v-model="productHeight"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="add length(L)"
            v-model="productLength"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="add Width(W)"
            v-model="productWidth"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Storage cost (Euro per pallet)"
            v-model="storageCost"
            min="10"
            max="15"
            type="number"
          ></v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Packing cost"
            v-model="packingCost"
            type="number"
          ></v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Local shipping cost"
            v-model="shippingCourierCost"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider color="orange" class="border-opacity-100"></v-divider>
      <v-row>
        <v-col style="width: 500px">
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Total cost/shipping"
            v-model="totalComputed"
            type="number"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="total cost per product"
            v-model="calculateMultipleProducts"
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Monthly subscription cost"
            v-model="subscriptionMonthlyCost"
            type="number"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="Total cost per product including subscriptions"
            v-model="costWithMonthlyAds"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="total storage cost"
            v-model="calculateStorageCostTotal"
            type="number"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="storage cost per product"
            v-model="calculateStorageCostPerProduct"
            type="number"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="storage + packing cost"
            v-model="calculateStorageCostPlusPacking"
            type="number"
          >
          </v-text-field>
          <v-text-field
            class="ma-4"
            variant="outlined"
            label="storage cost + packing + local courier"
            v-model="calculateStoragePackingandShipping"
            type="number"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-chip variant="flat" size="large" color="orange" class="mb-6"
                >Product final price</v-chip
              >
            </v-col>
            <v-divider color="orange" class="border-opacity-100"></v-divider>
            <v-col>
              <v-text-field
                class="ma-4"
                variant="outlined"
                label="total cost"
                v-model="calculateTotalCost"
              ></v-text-field>

              <v-text-field
                class="ma-4"
                variant="outlined"
                label="price with profict"
                v-model="calculateWithAddedROI"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-btn color="orange" class="ma-4" @click="saveFormData"
        >Add product <v-icon>mdi-plus</v-icon></v-btn
      >
      <v-divider color="orange" class="border-opacity-100"></v-divider>
    </v-card>
    <v-card
      color="grey-darken-3"
      width="100%"
      style="position: sticky; bottom: 0px"
    >
      <v-card-title class="d-flex" style="justify-content: space-evenly">
        <v-btn @click="$router.push('/')" flat color="orange" class="mb-2">
          <v-icon>mdi-calculator</v-icon>
          <span class="ml-2 flex-grow">Calculator</span>
        </v-btn>
        <v-divider vertical class="ma-3"></v-divider>
        <v-btn
          @click="$router.push('/history')"
          flat
          color="orange"
          class="mb-2"
        >
          <v-icon>mdi-history</v-icon>
          <span class="ml-2">View product history</span>
        </v-btn>
      </v-card-title>
    </v-card>
  </div>

  <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref, watchEffect } from "vue";

defineProps({
  msg: String,
});

// const saveFormData = async () => {
//   try {
//     const URL = "https://roffon.ro/seb_api/calculator.php";
//     const data = {
//       product_name: productName.value,
//       product_link: productLink.value,
//       product_base_price: productCost.value,
//       product_base_shipping: shippingCost.value,
//       product_amount: numOfProducts.value,
//       product_base_cost_all: totalComputed.value,
//       product_base_cost: calculateMultipleProducts.value,
//       product_storage_packing_shipping:
//         calculateStoragePackingandShipping.value,
//       product_finaI_cost: calculateTotalCost.value,
//       product_final_ROI: calculateWithAddedROI.value,
//     };
//     const response = await axios.post(URL, data);
//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

const productName = ref("");
const productLink = ref("");
const productImage = ref("");
const productCost = ref(0);
const shippingCost = ref(0);
const shippingCourierCost = ref(null);
const taxaVamala = ref(9);
const transitTax = ref(null);
const comisionarVamal = ref(null);
const tvaAfterCustoms = ref(0);
const customsFee = ref(0);
const subscriptionMinea = ref(99);
const subscriptionPaperform = ref(50);
const subscriptionMake = ref(16.7);
const subscriptionFgo = ref(9);
const hostAndDomain = ref(6);
const numOfProducts = ref(1);
const numOfMonthlyProducts = ref(1);
const packingCost = ref(1.28);
const storageCost = ref(15);
const productHeight = ref(0);
const productWidth = ref(0);
const productLength = ref(0);
const ROI = ref([100, 110, 120, 150]);
const selectedPercentage = ref(null);
const snackbar = ref(false);
const timeout = 2000;
const snackbarColor = ref("green-accent-1");
const text = ref("Produsul a fost adaugat cu success.");
const currencyUSD = ref(null);
const currencyEUR = ref(null);

const getDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
const calculateWithAddedROI = computed(() => {
  if (
    calculateTotalCost.value > 0 &&
    calculateTotalCost.value > 0 &&
    selectedPercentage.value > 0
  ) {
    return parseFloat(
      calculateTotalCost.value +
        (calculateTotalCost.value * selectedPercentage.value) / 100
    ).toFixed(2);
  }
});

const calculateStorageCostPlusPacking = computed(() => {
  console.log(packingCost.value + calculateStorageCostTotal.value, "test");
  return parseFloat(packingCost.value + calculateStorageCostTotal.value);
});

const calculateStoragePackingandShipping = computed(() => {
  return parseFloat(
    calculateStorageCostPlusPacking.value + shippingCourierCost.value
  ).toFixed(2);
});

const calculateStorageCostTotal = computed(() => {
  const productVolume =
    productHeight.value * productWidth.value * productLength.value;
  const totalVolume = parseFloat(numOfProducts.value) * productVolume;

  return ((totalVolume / 1000000) * storageCost.value).toFixed(2);
});

const calculateStorageCostPerProduct = computed(() => {
  return calculateStorageCostTotal.value / numOfProducts.value;
});

const subscriptionMonthlyCost = computed(() => {
  return (
    subscriptionMinea.value +
    subscriptionPaperform.value +
    subscriptionMake.value +
    subscriptionFgo.value +
    hostAndDomain.value
  );
});

const calculateShippingandProductCost = computed(() => {
  const productCostValue = parseFloat(productCost.value) || 0;
  const shippingCostValue = parseFloat(shippingCost.value) || 0;
  return parseFloat((productCostValue + shippingCostValue).toFixed(2));
});

const calculateAlibabaCommission = computed(() => {
  const productCostValue = parseFloat(productCost.value) || 0;
  const shippingCostValue = parseFloat(shippingCost.value) || 0;
  const alibabaCommission = 6;

  const commission = (productCostValue * alibabaCommission) / 100;
  return (productCostValue + shippingCostValue + commission).toFixed(2);
});

const calculateOrderValuePlusVAT = computed(() => {
  const productCostValue = parseFloat(productCost.value) || 0;
  const shippingCostValue = parseFloat(shippingCost.value) || 0;
  const alibabaCommission = 6;
  const VAT = 19;

  const commission = (productCostValue * alibabaCommission) / 100;
  const newValue =
    ((productCostValue + shippingCostValue + commission) * VAT) / 100;
  const result = productCostValue + shippingCostValue + commission + newValue;
  return parseFloat(result.toFixed(2));
});

const calculateCustomsFee = computed(() => {
  const result =
    parseFloat(calculateOrderValuePlusVAT.value) +
    (parseFloat(calculateOrderValuePlusVAT.value) * taxaVamala.value) / 100;
  return parseFloat(result.toFixed(2));
});

// const calculateAdsPrice = computed(() => {
//   const result =
//     parseFloat(
//       calculateCustomsFee.value +
//         (transitTax.value + comisionarVamal.value) / numOfProducts.value +
//         costWithMonthlyAds.value +
//         calculateStoragePackingandShipping.value
//     ) / 3.5;

//   return parseFloat(result.toFixed(2));
// });

const totalComputed = computed(() => {
  const result =
    (Number(calculateCustomsFee.value) + Number(calculateAdsPrice.value)) *
      numOfProducts.value +
    (Number(transitTax.value) + Number(comisionarVamal.value)) /
      numOfProducts.value;
  return parseFloat(result.toFixed(2));
});

const calculateMultipleProducts = computed(() => {
  if (numOfProducts == 0) {
    return 0;
  } else {
    const result =
      (totalComputed.value +
        Number(transitTax.value) +
        Number(comisionarVamal.value)) /
      numOfProducts.value;
    return parseFloat(result.toFixed(2));
  }
});

const costWithMonthlyAds = computed(() => {
  return parseFloat(
    (subscriptionMonthlyCost.value / numOfMonthlyProducts.value).toFixed(2)
  );
});

const calculateTotalCost = computed(() => {
  const totalCost =
    Number(calculateMultipleProducts.value) +
    Number(calculateStoragePackingandShipping.value) +
    Number(costWithMonthlyAds.value);
  return totalCost;
});
const saveFormData = async () => {
  try {
    const URL = "https://roffon.ro/api_seb/calculator.php";
    const data = {
      product_name: productName.value,
      product_link: productLink.value,
      product_base_price: productCost.value,
      product_base_shipping: shippingCost.value,
      product_amount: numOfProducts.value,
      product_base_cost_all: totalComputed.value,
      product_base_cost: calculateMultipleProducts.value,
      product_storage_packing_shipping:
        calculateStoragePackingandShipping.value,
      product_finaI_cost: calculateTotalCost.value,
      product_final_ROI: calculateWithAddedROI.value,
      image_id: productImage.value,
      ROI_selected: selectedPercentage.value,
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData == "success") {
        snackbar.value = true;
        snackbarColor.value = "green-accent-1";
      }
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (err) {
    console.log("Error:", err);
    snackbar.value = true;
    snackbarColor.value = "red-accent-1";
    text.value = "No ai belit pula";
  }
};
const currencyConvertAPI = (targetCurrency, kriptovaluta) => {
  fetch(
    `https://v6.exchangerate-api.com/v6/fa676ec374c7220afe2c1cd7/latest/${targetCurrency}`
  )
    .then((response) => response.json())
    .then((data) => {
      const conversionRate = data.conversion_rates[kriptovaluta];
      console.log(conversionRate);
      if (targetCurrency === "USD") {
        currencyUSD.value = conversionRate;
        transitTax.value = parseFloat(
          290 / data.conversion_rates[kriptovaluta]
        ).toFixed(2);
        comisionarVamal.value = parseFloat(
          600 / data.conversion_rates[kriptovaluta]
        ).toFixed(2);
        shippingCourierCost.value = parseFloat(
          15 / data.conversion_rates[kriptovaluta]
        ).toFixed(2);
      } else if (targetCurrency === "EUR") {
        currencyEUR.value = conversionRate;
      }
    })
    .catch((err) => console.log(err));
};

const calculateAdsPrice = computed(() => {
  const result =
    (Number(calculateCustomsFee.value) +
      (Number(transitTax.value) + Number(comisionarVamal.value)) /
        numOfProducts.value +
      Number(costWithMonthlyAds.value) +
      Number(calculateStoragePackingandShipping.value)) /
    3.5;
  console.log(result);
  return result.toFixed(2);
});

onMounted(() => {
  currencyConvertAPI("USD", "RON");
  currencyConvertAPI("EUR", "RON");
});

watchEffect([calculateTotalCost, selectedPercentage], calculateWithAddedROI);
</script>

<style scoped>
.card {
  height: 100vh;
  padding: 16px;
}
</style>
