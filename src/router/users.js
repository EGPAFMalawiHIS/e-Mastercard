import Store from "@/store";

function authSuperuser(to, from, next) {
    if (Store.getters.userIs('Superuser')) {
      next();
      return;
    }

    next('/');
}

export default [
  {
    path: "/users",
    name: "ListUsers",
    component: () => import("../views/Users/list.vue"),
    beforeEnter: authSuperuser,
  },
  {
    path: "/users/create",
    name: "CreateUser",
    component: () => import("../views/Users/create.vue"),
    beforeEnter: authSuperuser
  },
  {
    path: "/users/edit/:userId",
    name: "EditUser",
    component: () => import("../views/Users/edit.vue"),
    beforeEnter: authSuperuser
  }
];