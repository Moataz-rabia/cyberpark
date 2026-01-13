<template>
  <div style="padding: 40px;">
    <h1>Espace Entreprise</h1>
    <p>Bienvenue dans votre espace entreprise.</p>
    <h1>liste des companies</h1>
    <ul>
      <li v-for="company in companies" :key="company.id">
        {{ company.name }} - {{ company.address }}
      </li>
    </ul>

    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMe } from "../api/auth"; // adapte selon ton projet
import { getCompanies } from "../api/companies";
import { ref } from "vue";
const router = useRouter();
const companies = ref([]);

onMounted(async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await getMe(token);
    console.log("Utilisateur OK :", res.data);
    // Fetch companies after user is verified
    const companiesRes = await getCompanies();
    companies.value = companiesRes.data;
  } catch (err) {
    // Token expiré ou invalide
    localStorage.removeItem("token");
    router.push("/signin");
  }
});


const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/signin");
};
</script>
<style scoped>
/* Ajoute ici tes styles spécifiques à cette page */

</style>
