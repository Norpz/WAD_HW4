import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
//import PostPageView from "../views/PostPageView.vue";
import auth from "../auth";




const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: '/post/:postId',
        name: 'PostPageView',
        component: () =>
            import ("../views/PostPageView.vue"),
        props: route => ({
          postId: route.params.postId,
          postContent: route.query.postContent,
          postAuthor: route.query.postAuthor,
          postCreateTime: route.query.postCreateTime,
          postImgUrl: route.query.postImgUrl,
          // pass other props directly if needed
        }),
      },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/contacts",
        name: "ContactsView",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/ContactsView.vue"),
    },
    {
        path: "/addpost",
        name: "AddPostView",
        component: () =>
            import ("../views/AddPostView.vue"),
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;