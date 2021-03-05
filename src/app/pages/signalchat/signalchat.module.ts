import { NgModule } from '@angular/core';
import { NbCardModule, NbAccordionModule, NbIconModule, NbButtonModule, NbInputModule, NbListModule, NbCheckboxModule, NbStepperModule, NbSelectModule, NbFormFieldModule, NbChatModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { SignalchatComponent } from './signalchat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    FormsModule,    
    ReactiveFormsModule,
    ThemeModule,
    NbAccordionModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,    
    NbCheckboxModule,
    NbListModule,
    NbStepperModule,
    NbChatModule,
    NbSelectModule,
    NbFormFieldModule
  ],
  declarations: [
    SignalchatComponent,
  ],
})
export class SignalchatModule { }
