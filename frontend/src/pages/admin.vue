<template>
  <div style="padding: 40px;">
    <h1>Espace Administrateur</h1>
    <p>Bienvenue dans le tableau de bord Admin.</p>

    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMe } from "../api/auth"; // adapte selon ton projet

const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await getMe(token);
    console.log("Utilisateur OK :", res.data);
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
