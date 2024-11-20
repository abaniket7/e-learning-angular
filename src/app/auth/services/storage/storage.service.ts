// import { Injectable } from '@angular/core';

// const TOKEN = "token";
// const USER = "user";

// @Injectable({
//   providedIn: 'root'
// })
// export class StorageService {

//   constructor() {}

//   saveToken(token: string): void {
//     window.localStorage.removeItem(TOKEN);
//     window.localStorage.setItem(TOKEN, token);
//   }

//   saveUser(user: any): void {
//     window.localStorage.removeItem(USER);
//     window.localStorage.setItem(USER, JSON.stringify(user));
//   }

//   getToken(): string | null {
//     return window.localStorage.getItem(TOKEN);
//   }

//   getUser(): any | null {
//     const user = localStorage.getItem(USER);
//     return user ? JSON.parse(user) : null;
//   }

//   getUserRole(): string {
//     const user = this.getUser();
//     return user ? user.role : "";
//   }

//   isAdminLoggedIn(): boolean {
//     return this.getToken() !== null && this.getUserRole() === "Admin";
//   }

//   isUserLoggedIn(): boolean {
//     return this.getToken() !== null && this.getUserRole() === "User";
//   }

//   logOut(): void {
//     window.localStorage.removeItem(TOKEN);
//     window.localStorage.removeItem(USER);
//   }
// }

import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor () {}

    static saveToken(token: string): void {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.setItem(TOKEN, token);
    }

    static saveUser(user: any): void {
        window.localStorage.removeItem(USER);
        window.localStorage.setItem(USER, JSON.stringify(user));
    }

    static getToken(): string | null {
        return window.localStorage.getItem(TOKEN);
    }

    static getUser(): any | null {
        const user = localStorage.getItem(USER);
        return user ? JSON.parse(user) : null;
    }

    static getUserRole(): string {
        const user = this.getUser();
        if(user == null) return "";
        return user.role;
    }

    static isAdminLoggedIn(): boolean {
        if(this.getToken() == null) return false;
        const role :string = this.getUserRole();
        return role == "Admin";
    }

    static isUserLoggedIn(): boolean {
        if(this.getToken() == null) return false;
        const role :string = this.getUserRole();
        return role == "User";
    }

    static logOut(): void{
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(USER);
    }
}
