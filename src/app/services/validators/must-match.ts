import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(formNewPassword: string, formConfirmPassword: string) {
  return (formGroup: FormGroup) => {
    const newPassword = formGroup.controls[formNewPassword];
    const confirmPassword = formGroup.controls[formConfirmPassword];

    if (confirmPassword.errors && !confirmPassword.errors.mustMatch) {
      // return if another validator has already found an error on the confirmPassword
      return;
    }

    // set error on confirmPassword if validation fails
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mustMatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }
}
