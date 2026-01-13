<!-- pages/signin.vue -->
<template>
  <div class="login-page">
    <div class="login-box">
      <div v-if="registeredMessage" class="success-box">{{ registeredMessage }}</div>
      <h1>welcome to cyber park</h1>
      <h2>Sign In</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Se connecter</button>
      </form>
      <router-link to="/register">Don't have an account? Sign up here</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "@/api/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const route = useRoute();

const registeredMessage = computed(() => {
  return route.query.registered === "true"
    ? "Inscription réussie. Veuillez vous connecter."
    : "";
});

const handleLogin = async () => {
    console.log("clicked");
  const res = await login(email.value, password.value);
  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  if (user.role === "ADMIN") router.push("/admin");
  else if (user.role === "COMPANY") router.push("/company");
  else router.push("/profile");
};
</script>
<style scoped>

/* Fond général */
.login-page {
  background: linear-gradient(135deg, #4A9FBF 0%, #2B5F7F 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Effet de fond subtil */
.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/cyberparctn.png') no-repeat center center;
  background-size: cover;
  opacity: 0.1;
  z-index: 0;
}
h1 {
  color: #F5EFE7;
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.4),
               0 1px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5EFE7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

/* Boîte de connexion */
.login-box {
  background: linear-gradient(145deg, rgba(248, 239, 231, 0.95), rgba(255, 255, 255, 0.9));
  padding: 3rem 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  color: #2C2C2C;
  box-shadow: 0 10px 40px rgba(43, 95, 127, 0.25), 0 0 0 1px rgba(74, 159, 191, 0.1);
  text-align: center;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
}

/* Bordure décorative en haut */
.login-box::before {
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

/* Titre */
.login-box h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #2B5F7F;
  letter-spacing: -0.5px;
}

/* Champs de formulaire */
.login-box input {
  width: 100%;
  margin-bottom: 1.25rem;
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 2px solid #E8DCC8;
  background-color: #FAFAFA;
  font-size: 1rem;
  color: #2C2C2C;
  transition: all 0.3s ease;
  outline: none;
}

.login-box input:focus {
  border-color: #4A9FBF;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(74, 159, 191, 0.1);
}

.login-box input::placeholder {
  color: #A4A4A4;
}

/* Bouton */
.login-box button {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #4A9FBF 0%, #2B5F7F 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 159, 191, 0.3);
  margin-top: 0.5rem;
}

.login-box button:hover {
  background: linear-gradient(135deg, #5AACCE 0%, #4A9FBF 100%);
  box-shadow: 0 6px 20px rgba(74, 159, 191, 0.4);
  transform: translateY(-2px);
}

.login-box button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(74, 159, 191, 0.3);
}

/* Liens */
.links {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #E8DCC8;
}

.links a {
  color: #2B5F7F;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
}

.links a:hover {
  color: #4A9FBF;
}

.links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #4A9FBF, #C9A961);
  transition: transform 0.3s ease;
}

.links a:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* Responsive */
@media (max-width: 480px) {
  .login-box {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .login-box h2 {
    font-size: 1.6rem;
  }
}
</style>
