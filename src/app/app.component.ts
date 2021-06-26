import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    'registerForm': FormGroup;
    submitted = true;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: [
              '', 
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(16),
                Validators.pattern('^[a-zA-Z ]*$')
              ]
            ],
            lastName: [
              '', 
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(16),
                Validators.pattern('^[a-zA-Z ]*$')
              ]
            ],
           

            cNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[7-9][0-9]{0,9}$/)]],
            
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
          validator: MustMatch('password', 'confirmPassword')
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        console.log( JSON.stringify(this.registerForm.value));
        
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
