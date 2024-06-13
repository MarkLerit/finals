import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authGuard.service'; // Adjust the import path as necessary




const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'create', component: PostCreateComponent,canActivate: [AuthGuardService], children: [
     { path: ':pageNumber', component: PostListComponent }
  ]}
 ];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 })

export class AppRoutingModule { }
