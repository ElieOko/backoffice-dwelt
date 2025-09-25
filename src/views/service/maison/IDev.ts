export interface PropertyImage {
  id: number;
  maison_id: number;
  nom: string;
  path: string;
  created_at: string;
  updated_at: string;
}

export interface Caracteristique {
  nom: string;
}

export interface Property {
  id: number;
  nom: string;
  caracteristique: Caracteristique[] | null;
  measure: string;
  agentId: number;
  cityId: number;
  communeId: number;
  propertyId: number;
  statusPropertyId: number;
  isDisponible: boolean;
  superficie: string;
  prix: string;
  partPayed: string;
  countryId: number;
  codePostal: string;
  salleBain: number | null;
  cuisine: number | null;
  garage: number | null;
  chambre: number | null;
  created_at: string;
  updated_at: string;
  images: PropertyImage[];
}
