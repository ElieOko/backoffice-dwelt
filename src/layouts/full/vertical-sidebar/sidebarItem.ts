
export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Accueil' },
  {
    title: "Dashboard",
    icon: 'solar:screencast-2-linear',
    BgColor: 'primary',
    to: "/dashboard",
  },
  { header: "Serveur-Config" },
  {
    title: "Serveur",
    // subCaption: "",
    icon: 'solar:server-broken',
    BgColor: 'secondary',
    to: '/serveur',
  },

  {
    title: 'Collection',
    icon: 'bi:collection',
    BgColor: 'warning',
    to: '/serveur/collection',
  },
  {
    title: 'Routes',
    icon: 'mdi:routes',
    BgColor: 'warning',
    to: '/serveur/collection/route',
  },
  {
    title: 'Protocole',
    icon: 'carbon:connection-two-way',
    BgColor: 'warning',
    to: '/serveur/protocole',
  },
  {
    title: 'Test',
    icon: 'carbon:connection-two-way',
    BgColor: 'warning',
    to: '/serveur/test',
  },
  { header: "SpaceWork-Config" },
  {
    title: "SpaceWork",
    // subCaption: "",
    icon: 'carbon:workspace',
    BgColor: 'secondary',
    to: '/space/work',
  },

  {
    title: 'User',
    icon: 'stash:user-at-light',
    BgColor: 'warning',
    to: '/space/work/user',
  },
];

export default sidebarItem;
