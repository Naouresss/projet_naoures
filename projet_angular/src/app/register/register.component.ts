import { Component } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Registerrequest } from '../services/registerrequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  type: string ="password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;
  submitted = false;
  user!: User;
  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthentificationService,private fb: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
 
  }


hideShowPass(){
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type="password";
}

  onSubmit(): void {
    const registerRequest: Registerrequest = {
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
  if(this.registerForm.valid){
    this.authService.register(registerRequest).subscribe(
      (response) => {
              alert('Account added successfully!! :-)\n\n');
              this.gotoList();
        }
        )
      }
      else {
        this.validateAllFormFields(this.registerForm);
        alert("your form is invalid")
      }
      
      
    
  }
private validateAllFormFields(formGroup: FormGroup){
  Object.keys(formGroup.controls).forEach(field=>{
    const control = formGroup.get(field);
    if(control instanceof FormControl){
      control?.markAsDirty({onlySelf:true})
    }else if (control instanceof FormGroup){
      this.validateAllFormFields(control)
    }
  })
}



  gotoList() {
    this.router.navigate(['login']);
  }
}
