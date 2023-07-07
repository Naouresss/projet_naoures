import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/User';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginUser = {} as LoginUser;
  buttonText: string = "Login";
  type: string ="password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private accountService: AccountService) { 
    this.registerForm = this.formBuilder.group({
    
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buttonText = "Login";
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type="password";
  }
  addUser() {
    this.buttonText = "Loading...";
    if(this.registerForm.valid){
    this.accountService.login(this.form).subscribe(
      (data) => {
        this.accountService.registerToken(data);
        alert("Login is a success !");
        console.log(this.accountService.getCurrentUser());
        if(this.accountService.getCurrentUser().role === 'ROLE_ADMIN'){
        window.location.href = "/homeadmin";
      }
        else{
          window.location.href = "/homeclient";
        }
      },
      (e) => {
        console.log(e);
       
      }
    );
    }
    else{
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
}
