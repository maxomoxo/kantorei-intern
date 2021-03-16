import { NgModule } from '@angular/core';
import { NbCardModule, NbAccordionModule, NbIconModule, NbButtonModule, NbInputModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AudioComponent } from './audio.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule
  ],
  declarations: [
    AudioComponent,    
    PlayerComponent,
  ],
})
export class AudioModule { }
