import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HelpComponent } from './help/help.component'
import { ChatComponent } from './chat/chat.component'
import { ConfigComponent } from './config/config.component';
import { NbLoginComponent } from '@nebular/auth';
import { SignalchatComponent } from './signalchat/signalchat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AudioComponent } from './audio/audio.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    
    {
      path: 'help',
      component: HelpComponent,
    },     
    {
      path: 'chat',
      component: ChatComponent,
    },
    {
      path: 'home',
      component: ConfigComponent,
    },
    {
      path: 'kalender',
      component: CalendarComponent,
    },
    {
      path: 'audio',
      component: AudioComponent,
    },
    {
      path: 'signalchat',
      component: SignalchatComponent,
    },   
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
