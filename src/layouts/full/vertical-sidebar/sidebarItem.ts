
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
    title: "Agent",
    // subCaption: "",
    icon: 'solar:server-broken',
    BgColor: 'secondary',
    to: '/agent',
  },
  {
    title: 'Maison',
    icon: 'bi:collection',
    BgColor: 'warning',
    to: '/maison',
  },
  {
    title: 'Reservation',
    icon: 'mdi:routes',
    BgColor: 'warning',
    to: '/reservation',
  },
  {
    title: 'Partenaire',
    icon: 'carbon:connection-two-way',
    BgColor: 'warning',
    to: '/partenaire',
  },

  {
    title: 'Zones geographique',
    icon: 'carbon:connection-two-way', // Route::resource('client', C
    BgColor: 'warning',
    to: '/zone', // Route::resource('client', C
  },

  { header: "SpaceWork-Config" },

  {
    title: "Setting",
    // subCaption: "",
    icon: 'carbon:workspace',
    BgColor: 'secondary',
    to: '/setting',
  },
   {
    title: "Publicité",
    // subCaption: "",
    icon: 'carbon:workspace',
    BgColor: 'secondary',
    to: '/pub',
  },

  // {
  //   title: 'User',
  //   icon: 'stash:user-at-light',
  //   BgColor: 'warning',
  //   to: '/space/work/user',
  // },
];

export default sidebarItem;
