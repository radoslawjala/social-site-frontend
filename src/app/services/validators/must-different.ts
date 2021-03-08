import {FormGroup} from '@angular/forms';

export function MustDifferent(formOldPassword: string, formNewPassword: string) {
  return (formGroup: FormGroup) => {
    const oldPassword = formGroup.controls[formOldPassword];
    const newPassword = formGroup.controls[formNewPassword];

    if((oldPassword.errors || newPassword.errors) && !newPassword.errors.mustDifferent) {
      // return if another validator has already found an error on the newPassword
      return;
    }

    if(oldPassword.value === newPassword.value) {
      newPassword.setErrors({mustDifferent: true})
    } else {
      newPassword.setErrors(null);
    }
  }
}
