<template>
  <div class="admin-layout">
    <Sidebar />
    
    <div class="admin-page">
      <div class="admin-box">
        <h1>Espace Administrateur</h1>
        <h2>Tableau de bord</h2>

        <div class="info">
          <p><strong>Utilisateur :</strong> {{ user?.email || '—' }}</p>
          <p><strong>Rôle :</strong> {{ user?.role || '—' }}</p>
        </div>

        <div class="actions">
          <button class="primary" @click="goToCompanies">Gérer les entreprises</button>
        </div>

        <pre v-if="error" class="response-box">{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getMe } from "../api/auth";
import Sidebar from "../components/Sidebar.vue";

const router = useRouter();
const storedUser = localStorage.getItem("user");
const user = ref(storedUser ? JSON.parse(storedUser) : null);
const error = ref(null);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/signin");
    return;
  }

  try {
    const res = await getMe(token);
    user.value = res.data?.user ?? res.data;
    if (user.value) localStorage.setItem("user", JSON.stringify(user.value));
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    error.value = err.response?.data || String(err);
    router.push("/signin");
  }
});

const goToCompanies = () => {
  router.push({ path: "/company" });
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-page {
  flex: 1;
  margin-left: 220px;
  background: linear-gradient(135deg, #4A9FBF 0%, #2B5F7F 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  position: relative;
  padding: 2rem 1rem;
}

.admin-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/cyberparctn.png') no-repeat center center;
  background-size: cover;
  opacity: 0.08;
  z-index: 0;
}

.admin-box {
  background: linear-gradient(145deg, rgba(248, 239, 231, 0.95), rgba(255, 255, 255, 0.95));
  padding: 3rem 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 640px;
  color: #2C2C2C;
  box-shadow: 0 10px 40px rgba(43, 95, 127, 0.25), 0 0 0 1px rgba(74, 159, 191, 0.08);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(4px);
  text-align: center;
}

.admin-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #4A9FBF, #C9A961);
  border-radius: 0 0 4px 4px;
}

.admin-box h1 {
  margin: 0 0 0.25rem 0;
  font-size: 2rem;
  color: #2B5F7F;
}

.admin-box h2 {
  margin: 0 0 1.25rem 0;
  font-size: 1.25rem;
  color: #556E79;
  font-weight: 500;
}

.info {
  text-align: left;
  margin: 1rem 0 1.25rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  background: #FAFAFA;
  border: 1px solid #E8DCC8;
}

.info p { margin: 0.25rem 0; color: #333 }

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.actions .primary {
  flex: 1;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #4A9FBF 0%, #2B5F7F 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(74, 159, 191, 0.28);
  transition: transform 0.2s ease;
}

.actions .primary:hover { 
  transform: translateY(-2px); 
}

.response-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #F5F5F5;
  border-left: 4px solid #4A9FBF;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #2C2C2C;
  text-align: left;
}

@media (max-width: 760px) {
  .admin-page {
    margin-left: 0;
  }
  
  .admin-box { 
    padding: 2rem 1.5rem; 
  }
  
  .actions { 
    flex-direction: column; 
  }
}
</style>