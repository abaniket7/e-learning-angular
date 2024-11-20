import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzSpinModule,
  ],
  templateUrl: './post-course.component.html',
  styleUrls: ['./post-course.component.css']
})
export class PostCourseComponent {
  postCourseForm!: FormGroup;
  isSpinning: boolean = false;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  courseCategory: string = ''; 
  courseLevel: string = '';

  listOfCategories = ['Programming', 'Design', 'Marketing', 'Business'];
  listOfLevels = ['Beginner', 'Intermediate', 'Advanced'];

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, private message: NzMessageService) {}

  ngOnInit(): void {
    this.postCourseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      courseDescription: ['', [Validators.required]],
      courseDuration: ['', [Validators.required]],
      instructorName: ['', [Validators.required]],
      coursePrice: [null, [Validators.required, Validators.min(0)]],
      courseCategory: ['', [Validators.required]],
      courseLevel: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview Image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  postCourse() {
    console.log(this.postCourseForm.value);
  
    this.isSpinning = true;
    // Create a FormData object
    const formData: FormData = new FormData();
  
    // Append form fields to FormData
    formData.append('courseName', this.postCourseForm.get('courseName')?.value);
    formData.append('courseDescription', this.postCourseForm.get('courseDescription')?.value);
    formData.append('courseDuration', this.postCourseForm.get('courseDuration')?.value);
    formData.append('instructorName', this.postCourseForm.get('instructorName')?.value);
    formData.append('coursePrice', this.postCourseForm.get('coursePrice')?.value);
    formData.append('courseCategory', this.postCourseForm.get('courseCategory')?.value);
    formData.append('courseLevel', this.postCourseForm.get('courseLevel')?.value);
  
    // Append the selected file (course thumbnail image) to FormData if it exists
    if (this.selectedFile) {
      formData.append('courseThumbnail', this.selectedFile);
    }
  
    // Log the FormData to check if everything is appended correctly
    console.log('FormData:', formData);
  
    this.adminService.postCourse(formData).subscribe(
      (res: any) => {  // Explicitly type 'res' as 'any' if type is unknown
        this.isSpinning = false;
        this.message.success("Course Posted Successfully.", { nzDuration: 2000 });
        this.router.navigateByUrl("/admin/dashboard");
        console.log(res);
      },
      (error: any) => {  // Explicitly type 'error' as 'any' if type is unknown
        this.isSpinning = false;
        this.message.error("Error While Posting Course.", { nzDuration: 2000 });
        console.error(error);
      }
    );
  }
  
}


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzSpinModule } from 'ng-zorro-antd/spin';
// import { AdminService } from '../../services/admin.service';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-post-course',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     NzFormModule,
//     NzInputModule,
//     NzButtonModule,
//     NzSelectModule,
//     NzSpinModule,
//   ],
//   templateUrl: './post-course.component.html',
//   styleUrls: ['./post-course.component.css']
// })
// export class PostCourseComponent implements OnInit {
//   postCourseForm!: FormGroup;
//   isSpinning: boolean = false;
//   imagePreview: string | null = null;
//   selectedFile: File | null = null;

//   listOfCategories = ['Programming', 'Design', 'Marketing', 'Business'];
//   listOfLevels = ['Beginner', 'Intermediate', 'Advanced'];

//   constructor(
//     private fb: FormBuilder, 
//     private adminService: AdminService, 
//     private router: Router, 
//     private message: NzMessageService
//   ) {}

//   ngOnInit(): void {
//     this.postCourseForm = this.fb.group({
//       courseName: ['', [Validators.required]],
//       courseDescription: ['', [Validators.required]],
//       courseDuration: ['', [Validators.required]],
//       instructorName: ['', [Validators.required]],
//       coursePrice: [null, [Validators.required, Validators.min(0)]],
//       courseCategory: ['', [Validators.required]],
//       courseLevel: ['', [Validators.required]],
//     });
//   }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;

//       // Preview Image
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreview = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   postCourse() {
//     if (this.postCourseForm.invalid) {
//         Object.values(this.postCourseForm.controls).forEach(control => control.markAsTouched());
//         return;
//     }

//     this.isSpinning = true;
//     const formData: FormData = new FormData();

//     formData.append('courseName', this.postCourseForm.get('courseName')?.value);
//     formData.append('courseDescription', this.postCourseForm.get('courseDescription')?.value);
//     formData.append('courseDuration', this.postCourseForm.get('courseDuration')?.value);
//     formData.append('instructorName', this.postCourseForm.get('instructorName')?.value);
//     formData.append('coursePrice', this.postCourseForm.get('coursePrice')?.value);
//     formData.append('courseCategory', this.postCourseForm.get('courseCategory')?.value);
//     formData.append('courseLevel', this.postCourseForm.get('courseLevel')?.value);
    
//     if (this.selectedFile) {
//         formData.append('courseThumbnail', this.selectedFile);
//     }

//     this.adminService.postCourse(formData).subscribe(
//       (res: any) => {
//         this.isSpinning = false;
//         this.message.success("Course Posted Successfully.", { nzDuration: 2000 });
//         this.router.navigateByUrl("/admin/dashboard");
//       },
//       (error: any) => {
//         this.isSpinning = false;
//         this.message.error("Error While Posting Course.", { nzDuration: 2000 });
//         console.error("Error response from backend:", error);
//       }
//     );
//   }
// }

