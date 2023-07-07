import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser, LoginUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
// Il est responsable de la gestion 
//de l'authentification de l'utilisateur et de la récupération des informations de l'utilisateur actuel.
export class AccountService {
  // Il s'agit d'une propriété privée qui contient l'URL du point de terminaison de l'API utilisateur.
  private url: string = "http://localhost:8080/api/user";
  // Il s'agit du nom utilisé pour stocker le jeton dans le stockage de session.
  private sessionTokenName = "Token";
  //Le constructeur injecte le HttpClientservice, qui est utilisé pour faire des requêtes HTTP.
  constructor(private http: HttpClient) { }
  //cette méthode stocke le jeton fourni dans le stockage de session en utilisant sessionTokenNamecomme clé.
  registerToken(token: string) {
    sessionStorage.setItem(this.sessionTokenName, token);
  }
  // Cette méthode supprime le jeton du stockage de la session.
  removeToken() {
    sessionStorage.removeItem(this.sessionTokenName);
  }
  // cette méthode envoie une demande POST au point de terminaison de connexion avec les informations d'identification fournies. 
  //Il renvoie un observable auquel on peut s'abonner pour gérer la réponse.
  login(user: LoginUser) {
    return this.http.post(`${this.url}/login`, user, {
      responseType: 'text'
    });
  }
  //cette méthode récupère les informations de l'utilisateur actuel à partir du jeton stocké dans 
  //le stockage de session. Il utilise le JwtHelperServicepackage @auth0/angular-jwtpour décoder 
  //le jeton et extraire les informations utilisateur nécessaires. 
  //Le jeton décodé est ensuite utilisé pour remplir un CurrentUserobjet, qui est renvoyé.
  getCurrentUser() {
    let token: any = sessionStorage.getItem(this.sessionTokenName) || null;
    let currentUser: CurrentUser = {} as CurrentUser;
    if (token != null) {
      let decoder = new JwtHelperService();
      let decodedToken = decoder.decodeToken(token);
      currentUser.email = decodedToken.sub;
      currentUser.firstName = decodedToken.prenom;
      currentUser.lastName = decodedToken.nom;
      currentUser.role = decodedToken.role;
    }
    return currentUser;
    //let user=decoder.getAuthScheme();
  }
  // cette méthode vérifie si le stockage de session contient le jeton de session. 
  //Il retourne truesi le jeton existe et falsesinon.
  isAuthenticated() {
    return sessionStorage.getItem(this.sessionTokenName) != undefined;
  }
  // Cette méthode récupère le jeton de session à partir du stockage de session.
  getToken(){
    return sessionStorage.getItem(this.sessionTokenName);
  }
}
