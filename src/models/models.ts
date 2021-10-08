export interface Users {
  id: number
  username:  String
  name:      String
  password:  String
  email:     String
  emailVerifiedAt: Date
  isNamePublic:    Boolean
  isEmailPublic:   Boolean
  role:      Role
  createdAt: Date
  updatedAt: Date

}

enum Role {
  USER,
  MODERATOR
}

export interface UserId {
  id: number
}
