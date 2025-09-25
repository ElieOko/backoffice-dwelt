interface IAgent{
    id:Number,
    nom? : String
    role? : String
    description?: String
    phone? : String
    email?: String
    image?: String
    created_at: String
    updated_at: String

}

interface IAgentRequest{
    nom? : String
    role? : String
    description?: String
    phone? : String
    email?: String
    image? : String
}