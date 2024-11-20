import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCourseComponent } from './components/post-course/post-course.component';

const routes: Routes = [
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'course', component: PostCourseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
