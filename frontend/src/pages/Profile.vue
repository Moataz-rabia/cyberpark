<template>
  <div style="max-width:400px;margin:40px auto;">
    <sidebar />
    <h2>Test Profil (GET /me)</h2>

    <button @click="loadProfile">Charger mon profil</button>

    <pre v-if="response">{{ response }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMe } from "../api/auth";
import Sidebar from "../components/sidebar.vue";
const response = ref(null);
const router = useRouter();

const loadProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/");
    return;
  }

  try {
    const res = await getMe(token);
    response.value = res.data;
  } catch (err) {
    // Token expiré ou invalide
    localStorage.removeItem("token");
    router.push("/signin");
  }
};

onMounted(() => {
  loadProfile();
});
</script>
