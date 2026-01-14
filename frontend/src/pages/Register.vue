<template>
  <div class="register-page">
    <div class="register-box">
      <h2>Inscription</h2>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Mot de passe" required />
        </div>

        <div class="form-group">
          <select v-model="role">
            <option value="ADMIN">ADMIN</option>
            <option value="COMPANY">Entreprise</option>
          </select>
        </div>

        <transition name="slide-fade">
          <div v-if="role === 'COMPANY'" class="company-fields">
            <div class="form-group">
              <input v-model="companyName" type="text" placeholder="Nom de l'entreprise" />
            </div>
            <div class="form-group">
              <input v-model="companyAddress" type="text" placeholder="Adresse de l'entreprise" />
            </div>
            <div class="form-group">
              <input v-model="companyPhone" type="text" placeholder="Téléphone de l'entreprise" />
            </div>
            <div class="form-group">
              <input v-model="companyContactEmail" type="email" placeholder="Email de contact de l'entreprise (optionnel)" />
            </div>
            <div class="form-group">
              <input v-model="companyWebsite" type="url" placeholder="Site web de l'entreprise" />
            </div>
            <div class="form-group">
              <textarea v-model="companyDescription" placeholder="Description de l'entreprise" rows="3"></textarea>
            </div>
            <div class="form-group">
              <input v-model="companyIndustry" type="text" placeholder="Secteur d'activité" />
            </div>
          </div>
        </transition>

        <button type="submit">S'inscrire</button>
      </form>
      <button @click="goToSignIn" style="margin-top: 10px; background: none; border: none; color: #4A9FBF; cursor: pointer; text-decoration: underline; font-size: 0.9rem;">
        Déjà un compte ? Connectez-vous
      </button>

      <pre v-if="response" class="response-box">{{ response }}</pre>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../api/auth";

const router = useRouter();

const email = ref("");
const password = ref("");
const role = ref("ADMIN");
const companyName = ref("");
const companyAddress = ref("");
const goToSignIn = () => {
  router.push({ path: "/signin" });
};
const companyPhone = ref("");
const companyContactEmail = ref("");
const companyWebsite = ref("");
const companyDescription = ref("");
const companyIndustry = ref("");
const response = ref(null);

const handleRegister = async () => {
  try {
    const res = await register({
      email: email.value,
      password: password.value,
      role: role.value,
      companyName: companyName.value,
      companyAddress: companyAddress.value,
  companyPhone: companyPhone.value,
  companyContactEmail: companyContactEmail.value,
      companyWebsite: companyWebsite.value,
      companyDescription: companyDescription.value,
      companyIndustry: companyIndustry.value,

    });

    response.value = res.data;
    // Redirect to sign-in after successful registration so user can log in.
    // We pass a query param so the sign-in page can optionally show a welcome/confirmation message.
    router.push({ path: "/signin", query: { registered: "true", role: role.value } });
  } catch (err) {
    response.value = err.response?.data || "Erreur inconnue";
  }
};
</script>


<style scoped>
/* Page d'inscription */
.register-page {
  background: linear-gradient(135deg, #4A9FBF 0%, #2B5F7F 100%);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  padding: 2rem 1rem;
  margin: 0;
  position: relative;
  overflow-x: hidden;
}

.register-page::before {
  /* subtle background image overlay that preserves the gradient color */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/cyberparctn.png') no-repeat center center;
  background-size: cover;
  opacity: 0.1; /* tweak this to increase/decrease image visibility */
  pointer-events: none;
  z-index: 0;
}

/* Boîte d'inscription */
.register-box {
  background: linear-gradient(145deg, rgba(248, 239, 231, 0.95), rgba(255, 255, 255, 0.9));
  padding: 3rem 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  color: #2C2C2C;
  box-shadow: 0 10px 40px rgba(43, 95, 127, 0.25), 0 0 0 1px rgba(74, 159, 191, 0.1);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
  margin: 0 auto;
}

/* Bordure décorative en haut */
.register-box::before {
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
.register-box h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #2B5F7F;
  text-align: center;
  letter-spacing: -0.5px;
}

/* Formulaire */
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Groupe de formulaire */
.form-group {
  margin-bottom: 0.75rem;
}

/* Champs de formulaire - Input */
.register-box input,
.register-box select,
.register-box textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 2px solid #E8DCC8;
  background-color: #FAFAFA;
  font-size: 1rem;
  color: #2C2C2C;
  transition: all 0.3s ease;
  outline: none;
  font-family: 'Segoe UI', sans-serif;
}

.register-box input::placeholder,
.register-box textarea::placeholder {
  color: #A4A4A4;
}

/* Focus sur les champs */
.register-box input:focus,
.register-box select:focus,
.register-box textarea:focus {
  border-color: #4A9FBF;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(74, 159, 191, 0.1);
}

/* Select personnalisé */
.register-box select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232B5F7F' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* Textarea */
.register-box textarea {
  resize: vertical;
  min-height: 80px;
}

/* Section des champs entreprise */
.company-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Bouton */
.register-box button {
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
  margin-top: 1rem;
}

.register-box button:hover {
  background: linear-gradient(135deg, #5AACCE 0%, #4A9FBF 100%);
  box-shadow: 0 6px 20px rgba(74, 159, 191, 0.4);
  transform: translateY(-2px);
}

.register-box button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(74, 159, 191, 0.3);
}

/* Boîte de réponse */
.response-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #F5F5F5;
  border-left: 4px solid #4A9FBF;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #2C2C2C;
  overflow-x: auto;
  max-width: 100%;
}

/* Animations de transition */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .register-page {
    padding: 1rem 0.5rem;
  }

  .register-box {
    padding: 2rem 1.5rem;
    max-width: 100%;
  }

  .register-box h2 {
    font-size: 1.6rem;
  }

  .register-box input,
  .register-box select,
  .register-box textarea {
    font-size: 0.95rem;
    padding: 0.8rem 0.9rem;
  }
}

/* Scrollbar personnalisée pour la boîte de réponse */
.response-box::-webkit-scrollbar {
  height: 6px;
}

.response-box::-webkit-scrollbar-track {
  background: #E8DCC8;
  border-radius: 3px;
}

.response-box::-webkit-scrollbar-thumb {
  background: #4A9FBF;
  border-radius: 3px;
}

.response-box::-webkit-scrollbar-thumb:hover {
  background: #2B5F7F;
}
</style>


