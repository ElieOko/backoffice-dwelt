interface IAgent{
    id:number,
    nom : String
    role : String
    description: String
    phone : String
    email: String
    image? : String
}

interface IAgentRequest{
    nom : String
    role : String
    description: String
    phone : String
    email: String
    image? : String
}