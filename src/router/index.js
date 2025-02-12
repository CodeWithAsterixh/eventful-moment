import AddNewEventPage from "@/pages/AddNewEventPage.vue";
import LoginPage from "@/pages/auth/loginPage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";
import DetailsPage from "@/pages/DetailsPage.vue";
import EditPage from "@/pages/EditPage.vue";
import HomePage from "@/pages/HomePage.vue";
import NotFound from "@/pages/NotFound.vue";
import { createMemoryHistory, createRouter } from "vue-router";


const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/auth/login", name: "login", component: LoginPage },
  { path: "/auth/register", name: "register", component: RegisterPage },
  { path: "/moments/item", name: "single-item", component: DetailsPage },
  { path: "/moments/item/edit", name: "single-item-edit", component: EditPage },
  { path: "/add", name: "add-moment", component: AddNewEventPage },
  { path: "/:catchAll(.*)", name: "not-found", component: NotFound },

];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
