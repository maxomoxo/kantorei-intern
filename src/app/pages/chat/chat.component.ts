import { Component } from '@angular/core';
import { HttpService } from 'app/@core/utils/http.service';

import { ChatService } from './chat.service';
import { DataService } from '../../@core/utils/data.service';

@Component({
  selector: 'ngx-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ ChatService ],
})
export class ChatComponent {

  messages: any[];

  constructor(protected chatService: ChatService, private http: HttpService, private data: DataService) {
    this.messages = this.chatService.loadMessages();
  }

  refreshList() {    
    this.http.getTeleUpdates().subscribe(data => {this.data.result = data
      console.log(this.data.result);

      for (let dataRow of this.data.result["result"]) {
        console.log("Data Row:" + dataRow);

      }

    });
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

  
    console.log(event.message);

    this.http.sendTeleMessage(event.message).subscribe(() => {
      console.log("sent");      
    });

    this.http.sendTelePhoto(event).subscribe(() => {
      console.log("sent image");      
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'admin',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply); }, 500);
    }
  }
}
