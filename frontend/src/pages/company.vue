<template>
  <div class="company-layout">
    <Sidebar />
    
    <div class="company-page">
      <div class="company-content">
        <h1>Espace Entreprise</h1>
        <p>Bienvenue dans votre espace entreprise.</p>
        
        <h2>Liste des entreprises</h2>
        <ul class="companies-list">
          <li v-for="company in companies" :key="company.id" class="company-item">
            <strong>{{ company.name }}</strong> - {{ company.address }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getMe } from "../api/auth";
import { getCompanies } from "../api/companies";
import Sidebar from "../components/sidebar.vue";

const router = useRouter();
const companies = ref([]);

onMounted(async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await getMe(token);
    console.log("Utilisateur OK :", res.data);
    
    const companiesRes = await getCompanies();
    companies.value = companiesRes.data;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/signin");
  }
});
</script>

<style scoped>
.company-layout {
  display: flex;
  min-height: 100vh;
}

.company-page {
  flex: 1;
  margin-left: 220px;
  padding: 40px;
  background: linear-gradient(135deg, #f8efe7 0%, #ffffff 100%);
  min-height: 100vh;
}

.company-content {
  max-width: 1200px;
  margin: 0 auto;
}

.company-content h1 {
  color: #2B5F7F;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.company-content p {
  color: #556E79;
  margin-bottom: 2rem;
}

.company-content h2 {
  color: #2B5F7F;
  font-size: 1.5rem;
  margin: 2rem 0 1rem 0;
}

.companies-list {
  list-style: none;
  padding: 0;
}

.company-item {
  background: white;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  border: 1px solid #E8DCC8;
  box-shadow: 0 2px 8px rgba(74, 159, 191, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.company-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 159, 191, 0.15);
}

.company-item strong {
  color: #2B5F7F;
}

@media (max-width: 760px) {
  .company-page {
    margin-left: 0;
    padding: 20px;
  }
}
</style>