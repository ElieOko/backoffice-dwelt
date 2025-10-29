export const columns = [
  { field: 'id', title: "N°", editable: false, resizable: false, columnMenu: 'myTemplate', headerClassName: 'customMenu' },
  { field: 'type_demande', title: "Type de demande", filter: 'text', editable: false, resizable: false, },
  { field: 'me', title: "Civilité", filter: 'text', editable: false, resizable: false, },
  { field: 'lastname', title: "Nom", filter: 'text', editable: false, resizable: false, },
  { field: 'firstname', title: "Prénom", filter: 'text', editable: false, resizable: false, },
  { field: 'email', title: "Email", filter: 'text', editable: false, resizable: false, },
  { field: 'city', title: "Ville", filter: 'text', editable: false, resizable: false, },
  { field: 'code_postal', title: "Code postal", filter: 'text', editable: false, resizable: false, },
  { field: 'type_bien', title: "Type de bien", filter: 'text', editable: false, resizable: false, },
  { field: 'price_max', title: "Prix max", filter: 'number', editable: false, resizable: false, },
  { field: 'room', title: "Chambres", filter: 'number', editable: false, resizable: false, },
  { field: 'surface', title: "Surface (m²)", filter: 'text', editable: false, resizable: false, },
  { field: 'salle_bain', title: "Salles de bain", filter: 'number', editable: false, resizable: false, },
  { field: 'description', title: "Description", filter: 'text', editable: false, resizable: false, },
  { field: 'is_allow', title: "Autorisé ?", filter: 'boolean', editable: false, resizable: false, },
];

export interface IDemande {
  id: number;
  type_demande: string;
  me: string;
  lastname: string;
  firstname: string;
  email: string;
  city: string;
  code_postal: string;
  type_bien: string;
  price_max?: string | null;
  room?: number | null;
  surface?: string | null;
  salle_bain?: number | null;
  description?: string | null;
  is_allow: boolean;
  created_at: string;   // format ISO (ex: "2025-10-01T12:34:56Z")
  updated_at: string;
}

