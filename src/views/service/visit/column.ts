import type { Property } from "../maison/IDev";

export const columns = [
  { field: 'id', title: "N°", editable: false, resizable: false, columnMenu: 'myTemplate', headerClassName: 'customMenu' },
  { field: 'property.nom', title: "Maison", filter: 'text', editable: false, resizable: false, },
  { field: 'type_visite', title: "Type de visite", filter: 'text', editable: false, resizable: false, },
  { field: 'nom_complet', title: "Nom complet", filter: 'text', editable: false, resizable: false, },
  { field: 'telephone', title: "Telephone", filter: 'text', editable: false, resizable: false, },
  { field: 'message', title: "Message", filter: 'text', editable: false, resizable: false, },
  { field: 'date', title: "Date", filter: 'text', editable: false, resizable: false, },
  { field: 'heure', title: "Heure", filter: 'text', editable: false, resizable: false, },
];

export interface IVisit {
  id: number;
  maison_id: number;
  type_visite: string;     // Achat, Location, etc.
  date: string;            // format "YYYY-MM-DD"
  heure: string;           // format "HH:mm"
  nom_complet: string;
  telephone: string;
  message?: string | null;
  created_at: string;      // ISO DateTime string
  updated_at: string;
  property:Property
}


