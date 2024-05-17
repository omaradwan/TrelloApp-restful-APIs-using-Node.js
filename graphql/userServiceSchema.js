const {buildSchema}=require("graphql")

module.exports=buildSchema(`
 
  type workSpace{
    title:String!
    creator:String!
    members:[String!]!
  }
  
  input userInputData{
    title:String!
    members:[String!]
    boards:[String!]
    admins:[String!]
    isPublic:Boolean
  }

  input InputDataBoard {
    title: String!
    description: [String!]
    list: [String!]
    userWithRoles: [UserWithRoleInput!]!
    creator: String!
    invitationLink: String
    expiryDate: String
  }
  input UserWithRoleInput {
    userId: String!
    role: String!
  }
  input listData{
    title:String!
    tasks:[String!]
    transition:[String!]
    allowedRoles:[String!]
  }
  
  
  type board{
    workSpace:workSpace
    title:String!
    creator:String!
  }
  type InviteResponse{
    success: Boolean!
    message: String
    workSpace:workSpace
  }
  type list{
    title: String!
    allowedRoles: [String]
  }
  
  type rootMutation{
    
    createWorkSpace(userData:userInputData!):workSpace!
    addAdmin(workSpaceId:String!,userTobeAdded:String!):workSpace!
    addUser(userId:String!,workSpaceId:String!):workSpace!
    removeUser(userId:String!,workSpaceId:String!):String!
    inviteUser(email:String!,workSpaceId:String!):String!
    receiveInvitaion(userId:String!,link:String!):InviteResponse!

     
    createBoard(workSpaceId:String!,userData:InputDataBoard!):board!
    createList(inputInfo:listData,workSpaceId:String!,boardId:String):list
    
  }
  type rootQuery{
    getWorkSpace(id:String!):workSpace!
    getMembers(workSpaceId:String!):workSpace!
    getBoards(workSpaceId:String!):[board!]!
    getAllWorkSpaces(id:String!):[workSpace!]!

  }
  schema{
    query:rootQuery
    mutation:rootMutation
  }
`)