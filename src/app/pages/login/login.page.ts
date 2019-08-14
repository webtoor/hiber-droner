import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  submitted = false;

  constructor(public router : Router, 
    private formBuilder: FormBuilder,  
    public toastController: ToastController,
    public authService: AuthService,) {
    
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });


   }

  ngOnInit() {
   
    if(localStorage.getItem('userProvider') == ''){

    }else{
      this.router.navigate(['/tabs/tab-tawaran']);
    }
  }

 
  onFormSubmit(form: NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loginForm.value['device_token'] = "asdasd"
    console.log(this.loginForm.value)
      this.authService.login( this.loginForm.value, 'login_user')
      .subscribe(res => {
        console.log(res)
        if(res.access_token) {
          localStorage.setItem('userProvider', JSON.stringify(res));
          this.router.navigate(['/tabs/tab-tawaran']);
        }else{
          this.presentToast();
        }
      }, (err) => {
        console.log(err);
      });

}

  get f() { return this.loginForm.controls; }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Anda memasukkan Email dan Password yang salah. Isi dengan data yang benar dan coba lagi',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  login(){
    localStorage.setItem("adminData", 'test');

    this.router.navigate(['/tabs/tab-tawaran']);
  }

}
