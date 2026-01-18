import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/pages/signin.vue";
import Register from "@/pages/register.vue";
import AdminPage from "@/pages/admin.vue";
import CompanyPage from "@/pages/company.vue";
import ProfilePage from "@/pages/profile.vue";

const routes = [
  { path: "/", redirect: "/signin" },
  { path: "/signin", component: SignIn },
  { path: "/register", component: Register },
  { path: "/admin", component: AdminPage, meta: { requiresAuth: true, role: "ADMIN" } },
  { path: "/company", component: CompanyPage, meta: { requiresAuth: true, role: "COMPANY" } },
  { path: "/profile", component: ProfilePage, meta: { requiresAuth: true } },
  {path: '/forum', component: () => import('@/pages/forum.vue'), meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requiresAuth && !token) return next("/signin");
  if (to.meta.role && user?.role !== to.meta.role) return next("/signin");

  next();
});

export default router;
