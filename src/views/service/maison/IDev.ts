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
interface Standar{
     id? : Number
     name: String
     is_active: Boolean
     created_at: String
     updated_at:String
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
  country?: Standar
  city?: Standar
  commune?: Standar
  status_property?: Standar
  agent: Agent
}

 export interface Agent{
     id? : Number
     nom: String
     description: String
     role: String
     phone : String
     email : String
     image: Array<any>
     path : String
     is_active: Boolean
     created_at: String
     updated_at:String
}
