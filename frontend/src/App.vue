<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// État minimal pour l'authentification (optionnel, pour d'autres usages)
const currentUser = ref(null);
const token = ref(null);

// Lit localStorage et met à jour les refs
function refreshAuthFromStorage() {
  token.value = localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');
  currentUser.value = rawUser ? JSON.parse(rawUser) : null;
}

// Appel initial
refreshAuthFromStorage();

// Écoute les changements d'authentification
function handleAuthEvent() { 
  refreshAuthFromStorage(); 
}

window.addEventListener('storage', handleAuthEvent);
window.addEventListener('authChange', handleAuthEvent);

// Nettoyage des listeners à la destruction du composant
onBeforeUnmount(() => {
  window.removeEventListener('storage', handleAuthEvent);
  window.removeEventListener('authChange', handleAuthEvent);
});
</script>

<style>
/* Global resets */
* { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0;
}

html, body, #app { 
  height: 100%; 
  width: 100%; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Vous pouvez garder des styles globaux ici si nécessaire */
body {
  background-color: #f5f5f5;
}
</style>