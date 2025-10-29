export const MainRoutes ={
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'dashboard',
            path: '/',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/dashboard/MainScreenView.vue'),
        },
        {
            name: 'agent',
            path: '/agent',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/agent/AgentView.vue')
        },
        {
            name: 'agent_add',
            path: '/agent/add',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/agent/AppendAgentView.vue')
        },

        {
            name: 'maison',
            path: '/maison',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/maison/MaisonView.vue')
        },
        {
            name: 'maison_all',
            path: '/maison/all',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/maison/MaisonAllDetail.vue')
        },
        {
            name: 'maison_id',
            path: '/maison/:id',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/maison/DetailMaisonView.vue')
        },
        // { path: '/users/:id', component: User },
        {
            name: 'maison_add',
            path: '/maison/add',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/maison/AppendMaisonView.vue')
        },
        {
            name: 'partenaire',
            path: '/partenaire',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/partenaire/PartenaireView.vue')
        },
        {
            name: 'demande',
            path: '/demande',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/demande/DemandeView.vue')
        },
        {
            name: 'visit',
            path: '/visit',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/visit/VisiteView.vue')
        },
        {
            name: 'pub',
            path: '/pub',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/pub/PubliciteView.vue')
        },
        {
            name: 'pub_all',
            path: '/pub/all',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/pub/PubliciteAllView.vue')
        },
        {
            name: 'zone',
            path: '/zone',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/zone/ZoneGeographiqueView.vue')
        },
        {
            name: 'setting',
            path: '/setting',
            meta: { requiresAuth: true, reload: true },
            component: () => import('@/views/service/setting/SettingView.vue')
        },
    ]
}