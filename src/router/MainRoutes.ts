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
            name: 'serveur_collection',
            path: '/serveur/collection',
            component: () => import('@/views/config/serveur/collection/CollectionView.vue')
        },
        {
            name: 'serveur_collection_route',
            path: '/serveur/collection/route',
            component: () => import('@/views/config/serveur/collection/route/RouteView.vue')
        },
        {
            name: 'serveur_protocole',
            path: '/serveur/protocole',
            component: () => import('@/views/config/serveur/ProtocoleView.vue')
        },
        {
            name: 'serveur_test',
            path: '/serveur/test',
            component: () => import('@/views/config/serveur/TestServerView.vue')
        },
        {
            name: 'space_work',
            path: '/space/work',
            component: () => import('@/views/config/space_work/SpaceWorkView.vue')
        },
        {
            name: 'space_work_user',
            path: '/space/work/user',
            component: () => import('@/views/config/space_work/user/UserView.vue')
        },
    ]
}