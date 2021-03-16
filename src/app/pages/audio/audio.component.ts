import { Component, HostBinding, OnDestroy } from "@angular/core";
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { PlayerService } from "app/@core/utils";

@Component({
  selector: "ngx-audio",
  styleUrls: ["./audio.component.scss"],
  templateUrl: "./audio.component.html",
})
export class AudioComponent {
  
  @HostBinding('class.expanded')
  private expanded: boolean;

  title = 'micRecorder';
  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;
  isDarkTheme: boolean;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  themeChangeSubscription: any;

  constructor(private domSanitizer: DomSanitizer, private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService, private playerService: PlayerService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });

    this.themeChangeSubscription = this.themeService.onThemeChange()
      .pipe(map(({ name }) => name === 'cosmic' || name === 'dark'))
      .subscribe((isDark: boolean) => this.isDarkTheme = isDark);


  }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
  * Start recording.
  */
  initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
  * Will be called automatically.
  */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 16000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
  * Stop recording.
  */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
    
    var track = {
      name: 'Recording 1',
      artist: 'Admin',
      url: this.url,
      cover: 'assets/images/recording_icon.png',
    }

    this.playerService.createNewTrack(track);

  }
  /**
  * Process Error.
  */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
  ngOnInit() { }


  isCollapsed() {
    return !this.expanded;
  }



}
