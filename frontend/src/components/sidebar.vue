<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <div class="brand">CyberParc</div>
      <nav class="nav">
        <router-link to="/profile" class="nav-link" @click="closeIfMobile">Profil</router-link>
        <router-link to="/forum" class="nav-link" @click="closeIfMobile">Forum</router-link>
        <router-link :to="dashboardRoute" class="nav-link" @click="closeIfMobile">Dashboard</router-link>
      </nav>
    </div>

    <div class="sidebar-bottom">
      <button class="logout-btn" @click="logout">Se déconnecter</button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Fonction pour lire l'utilisateur courant depuis localStorage
function getCurrentUser() {
  const rawUser = localStorage.getItem('user');
  return rawUser ? JSON.parse(rawUser) : null;
}

const currentUser = ref(getCurrentUser());

// Route du dashboard selon le rôle
const dashboardRoute = computed(() => {
  if (!currentUser.value) return '/signin';
  return currentUser.value.role === 'ADMIN' ? '/admin' : '/company';
});

// Déconnexion
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Émettre l'événement pour notifier App.vue
  window.dispatchEvent(new Event('authChange'));
  router.push('/signin');
}

// Fonction utilitaire pour comportement mobile (à implémenter si nécessaire)
function closeIfMobile() { /* vide pour l'instant */ }
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  background: linear-gradient(180deg, #1f5870 0%, #183f52 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  z-index: 50;
}

.sidebar .brand {
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 1rem;
}

.nav { 
  display: flex; 
  flex-direction: column; 
  gap: 0.6rem;
}

.nav-link {
  color: rgba(255,255,255,0.95);
  text-decoration: none;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  display: inline-block;
  transition: all 0.2s ease;
}

.nav-link.router-link-active, 
.nav-link:hover {
  background: rgba(255,255,255,0.06);
  transform: translateX(4px);
}

.sidebar-bottom { 
  display: flex; 
  justify-content: center; 
}

.logout-btn {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: #e2573e;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.logout-btn:hover { 
  opacity: 0.95;
}

/* Responsive: collapse sidebar on small screens */
@media (max-width: 760px) {
  .sidebar { 
    position: relative; 
    width: 100%; 
    height: auto; 
    flex-direction: row; 
    align-items: center; 
    gap: 1rem; 
    padding: 0.75rem; 
  }
  
  .nav { 
    flex-direction: row; 
    gap: 0.5rem;
  }
  
  .sidebar-bottom { 
    display: none;
  }
}
</style>