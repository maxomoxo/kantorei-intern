import { NgModule } from '@angular/core';
import { NbMenuModule, NbBadgeModule, NbInputModule, NbIconModule, NbTreeGridModule, NbCardModule, NbListModule, NbButtonModule, NbFormFieldModule, NbChatModule, NbCalendarRangeModule, NbCalendarModule, NbCalendarKitModule, NbUserModule, NbTableModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HelpModule } from './help/help.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConfigComponent } from './config/config.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { SignalchatComponent } from './signalchat/signalchat.component';
import { SignalchatModule } from './signalchat/signalchat.module';
import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AudioModule } from './audio/audio.module';
import { ContactsComponent } from './config/contacts/contacts.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    HelpModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbListModule,
    NbButtonModule,
    NbChatModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbUserModule,
    NbTabsetModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    FormsModule,
    HelpModule,
    AudioModule,
    SignalchatModule,
    QRCodeModule
  ],
  declarations: [
    PagesComponent,
    ConfigComponent,
    ChatComponent,
    CalendarComponent,
    ContactsComponent
  ],
})
export class PagesModule {
}
