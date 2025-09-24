import {
  ChangeDetectorRef, Component, DestroyRef, ElementRef, inject,
  signal, viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '@balanz-backoffice/clients';
import { UserService } from '@balanz-backoffice/core';
import { PreLoginData, User } from '@balanz-backoffice/shared';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, FloatLabelModule, IconFieldModule,
    InputIconModule, ButtonModule, InputText,
    NgClass
  ],
})
export class LoginRouteComponent {

  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _cdr = inject(ChangeDetectorRef);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  protected frmLogin = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(5)]),
    pass: new FormControl('', []),
  });
  protected _preLoginSignal = signal<PreLoginData | null>(null);
  protected _showPassword = signal<boolean>(false);
  protected _loading = signal<boolean>(false);
  private _inputPasswordElSignal = viewChild('passInput', { read: ElementRef });

  constructor() {
    this.frmLogin.get('pass')?.disable();
  }

  onSubmit(): void {
    if (this._preLoginSignal() !== null) {
      this._doLogin();
    } else {
      this._doPreLogin();
      this.frmLogin.get('user')?.disable();
    }
  }

  protected _togglePassword = () => {
    this._showPassword.update((v: boolean) => !v)
  }

  protected _resetUser = (): void => {
    this._showPassword.set(false);
    this._preLoginSignal.set(null);
    this.frmLogin.get('user')?.reset();
    this.frmLogin.get('user')?.enable();
    this._cdr.detectChanges();
  }

  private _doLogin(): void {
    const user = this._preLoginSignal()?.user;
    const pass = this.frmLogin.get('pass')?.value;
    const nonce = this._preLoginSignal()?.nonce;
    if (!user || !pass || !nonce) {
      return;
    }
    this._loading.set(true);
    this._authService.logIn(user, pass, nonce)
      .pipe(
        catchError((err: any) => {
          this._loading.set(false);
          return throwError(() => err);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((response: User) => {
        this._userService.setUser(response);
        this._router.navigate(['logged']);
      });
  }

  private _doPreLogin(): void {
    const user = this.frmLogin.get('user')?.value;
    if (!user) {
      return;
    }
    this._loading.set(true);
    this._authService.preLogIn(user)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: PreLoginData) => {
        this._preLoginSignal.set(response);
        this.frmLogin.get('pass')?.enable();
        this.frmLogin.get('pass')?.addValidators([Validators.required, Validators.minLength(5)]);
        this._inputPasswordElSignal()?.nativeElement.focus();
        this._loading.set(false);
        this._cdr.detectChanges();
      });
  }

}
