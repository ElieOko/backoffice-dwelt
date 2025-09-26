export const MainRoutes ={
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/MainScreenView.vue'),
        },
        {
            name: 'agent',
            path: '/agent',
            component: () => import('@/views/service/agent/AgentView.vue')
        },
        {
            name: 'agent_add',
            path: '/agent/add',
            component: () => import('@/views/service/agent/AppendAgentView.vue')
        },

        {
            name: 'maison',
            path: '/maison',
            component: () => import('@/views/service/maison/MaisonView.vue')
        },
        {
            name: 'maison_add',
            path: '/maison/add',
            component: () => import('@/views/service/maison/AppendMaisonView.vue')
        },
        {
            name: 'partenaire',
            path: '/partenaire',
            component: () => import('@/views/service/partenaire/PartenaireView.vue')
        },
        {
            name: 'reservation',
            path: '/reservation',
            component: () => import('@/views/service/reservation/ReservationView.vue')
        },
        {
            name: 'pub',
            path: '/pub',
            component: () => import('@/views/service/pub/PubliciteView.vue')
        },
        {
            name: 'zone',
            path: '/zone',
            component: () => import('@/views/service/zone/ZoneGeographiqueView.vue')
        },
        {
            name: 'setting',
            path: '/setting',
            component: () => import('@/views/service/setting/SettingView.vue')
        },
    ]
}