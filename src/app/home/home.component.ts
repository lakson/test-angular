import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data/data.service';
import { User } from './../models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  phoneCode = "+33";
  saved = false;
  saving = false;
  error: any = null;

  constructor(private fb: FormBuilder, public data: DataService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName:  new FormControl('', Validators.required),
      language:  new FormControl('fr', Validators.required),
      phone:  new FormControl('', Validators.required),
      email:  new FormControl('', [Validators.required, Validators.email]),
      message:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      promo:  new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const data: User = {
        firstName: form.value.firstName,
        lastName:  form.value.lastName,
        language: form.value.language,
        phone:  this.phoneCode + form.value.phone,
        email:  form.value.email,
        message:  form.value.message,
        promo:  form.value.promo
      }
      this.saving = true;
      this.data.saveData(data).then(
        (res: any) => {
              this.saved = true;
              this.saving = false;
              this.myForm.reset();
              setTimeout(() => {
                this.saved = false;
              }, 5000);
        },
        (err: any) => {
          this.error = err;
          this.saving = false;
          setTimeout(() => {
            this.error = null;
          }, 5000);
        })

    } else {
      this.error = 'Invalid Form';
      setTimeout(() => {
        this.error = null;
      }, 5000);
    }
  }

  ifError(field: string) {
       return (
               this.myForm.get(field)?.invalid &&
               (this.myForm.get(field)?.dirty || this.myForm.get(field)?.touched)
               );
  }

}
