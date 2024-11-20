// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { StorageService } from '../../../auth/services/storage/storage.service';

// const BASE_URL = "http://localhost:8081";

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {

//   constructor(private http: HttpClient, private storageService: StorageService) { }

//   postCourse(courseData: FormData): Observable<any> {
//     const headers = this.createAuthorizationHeader();
//     console.log("Authorization Header:", headers);
//     return this.http.post(BASE_URL + "/api/admin/course", courseData, { headers });
//   }

//   private createAuthorizationHeader(): HttpHeaders {
//     const token = this.storageService.getToken(); // Now this works with instance method
//     if (!token) {
//       console.error("No token found!");
//       return new HttpHeaders();
//     }
//     console.log('Authorization Token:', token);
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
   
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCourse(courseData: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader();
    console.log("Authorization Header:", headers); // Debugging header content
    return this.http.post(BASE_URL + "/api/admin/course", courseData, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();
    if (!token) {
      console.error("No token found!");
      // Return empty headers if no token (consider handling this in UI)
      return new HttpHeaders();
    }
    console.log('Authorization Token:', token); // Ensure token is correct
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
  
}
