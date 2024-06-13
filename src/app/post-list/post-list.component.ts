import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postForm: FormGroup
  posts: Post[] = [];
  
  defaultImageUrl: any;
  postBeingEdited: Post | null = null; // Add this property to track the post being edited
  imageUrlToPreview = '';
imageUrl: any;
currentPageUrl: string = ''; // Add a new property for the current page URL


currentPage = 1;
postsPerPage = 5;
totalPages = 0;

  constructor(private postService: PostService, private cdr: ChangeDetectorRef,public router:Router) {
    this.postForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      content: new FormControl(''),
      imageUrl: new FormControl('')
    });
    
  }

  ngOnInit() {
    this.postService.fetchPosts();
    this.postService.getPostUpdateListener().subscribe(posts => {
       console.log(posts);
       this.posts = posts;
       this.calculateTotalPages(); // Recalculate total pages after posts are updated
       console.log('Total Pages:', this.totalPages);
       console.log('Page Numbers:', this.getPageNumbers());
       this.cdr.detectChanges(); // Manually trigger change detection

    });
   
    this.postForm = new FormGroup({
       id: new FormControl(''),
       title: new FormControl(''),
       content: new FormControl(''),
       imageUrl: new FormControl('')
    });
   }
  handleImageError(event: any) {
    // Check if the error is due to a missing or invalid image URL
    if (event.target.src === '' || event.target.src === this.defaultImageUrl) {
       // If the image URL is missing or invalid, do not log the error
       return;
    }
    // Otherwise, log the error as before
    console.error('Error loading image', event);
    // Handle the error, e.g., show a default image or a message
   }
   editPost(post: Post) {
    console.log('Editing post:', post); // Debugging line
    if (this.postForm) {
       this.postForm.setValue({
         id: post._id,
         title: post.title,
         content: post.content,
         imageUrl: post.imageUrl ? post.imageUrl : ''
       });
       this.postBeingEdited = post;
    } else {
       console.error('postForm is undefined');
    }
   }
   onSubmit(postId: string) {
    const editedPost = this.postForm?.value;
    const { id, title, content, imageUrl } = editedPost;
    const postData = {
       id,
       title,
       content,
       imageUrl: imageUrl || this.defaultImageUrl // Use the default image URL if none is provided
    };
   
    // Now you can use `postData` to update the post in your backend
    // For example, you might call a method from your PostService to update the post
    this.postService.updatePost(postId, postData).subscribe(response => {
       console.log('Post updated successfully', response);
  
       // Optionally, refresh the list of posts or navigate away from the edit form
       this.postBeingEdited = null; // Reset the post being edited
    }, error => {
       console.error('Error updating post', error);
    });
   }

   previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
       const reader = new FileReader();
       reader.onload = (e: any) => {
         this.imageUrlToPreview = e.target.result;
       };
       reader.readAsDataURL(file);
    }
   }
 // Add this method to your existing PostListComponent
 deletePost(postId: string) {
  this.postService.deletePost(postId).subscribe(() => {
    
  }, error => {
     console.error('Error deleting post', error);
  });
 }
 

 calculateTotalPages() {
  console.log('Posts:', this.posts);
  console.log('Posts per page:', this.postsPerPage);
  this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
  console.log('Total Pages:', this.totalPages);
 }
getPostsForCurrentPage() {
  const startIndex = (this.currentPage - 1) * this.postsPerPage;
  const endIndex = startIndex + this.postsPerPage;
  return this.posts.slice(startIndex, endIndex);
}

changePage(pageNumber: number) {
  this.currentPage = pageNumber;
  this.router.navigate(['/create', pageNumber]);
}


 
  getPageNumbers() {
     const pageNumbers: number[] = [];
     for (let i = 1; i <= this.totalPages; i++) {
       pageNumbers.push(i);
     }
     return pageNumbers;
  }
 }

