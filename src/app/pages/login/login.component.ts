import {ChangeDetectorRef} from "@angular/core";
import {Router} from "@angular/router";
import * as ɵngcc0 from "@angular/core";
import {NbAuthService, NbAuthSocialLink} from "@nebular/auth";

export declare class NbLoginComponent {
  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;
  protected router: Router;
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;

  constructor(service : NbAuthService, options : {}, cd : ChangeDetectorRef, router : Router);

  login(): void;
  getConfigValue(key : string): any;
  
  static ɵfac: ɵngcc0.ɵɵFactoryDef<NbLoginComponent, never>;
  static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta < NbLoginComponent,
  "nb-login",
  never, {}, {},
  never,
  never >;
}
