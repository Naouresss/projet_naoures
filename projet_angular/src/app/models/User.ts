export class User{
    constructor(public id?: number,
                
                public nom?: string,
                public prenom?: string,
                public email?: string,
                public password?: string,
                public role?: string,
               
              
               
                ){
  
    }
  }
  export interface LoginUser{
    email:string;
    password:string;
}
export interface CurrentUser{
    firstName:string;
    lastName:string;
    email:string;
    role:string;
}