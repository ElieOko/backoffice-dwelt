interface IMaison{
    maisonId?: Number
    nom: String
    // piece: Array<IPiece>,
    caracteristique: Array<ICaracteristique>,
    images: Array<IIMage>    
    measure?: String
    agentId: Number | String
    cityId: Number | String
    communeId: Number | String,
    propertyTypeId:  Number | String
    statusPropertyId: Number | String
    isDisponible: Boolean,
    superficie?: String ,
    prix: Number
    partPayed: String
    countryId: Number | String
    codePostal: String
    salleBain?: Number
    cuisine?: Number
    garage?: Number
    chambre? : Number
    
}


interface IStatusProperty{
    name : String
}

interface ICaracteristique{
    nom: String
}
interface IMeasure{
    nombre: Number
    unite : IUniteMeasure
}

interface IMeasureSuperficie{
    nombre: String
    unite : IUniteMeasure
}

interface IIMage{
    nom: String
}

interface IPiece{
    nom: String
    nombre : number
}

interface ITypeProperty{
    name : String
}

interface IUniteMeasure{
    name: String
    code: String
}


interface ICity {
  id: number
  nom: string
  countryId?: number
}

interface ICountry {
  id: number
  nom: string
  cities: ICity[]
}
interface ICommune{
    id?: number
    city : ICity
    nom : String
}