const pages = [
    {
        exact: true,
        path: "/login",
        component: Login,
        layout: MainLayout,
    },
    {
        exact: false,
        path: routes.dashboard,
        component: index,
        layout: MinimalLayout,
    },
];
