import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matches :string[];
  isRescording = false;
  status;

  constructor(public navCtrl: NavController, private tts: TextToSpeech,private speechRecognition: SpeechRecognition) {

    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
    if (!hasPermission){
      this.speechRecognition.requestPermission().then(
        () => console.log('granted'),
        () => console.log('Denied')
      )
    }
  });
  }

  speak(){
    if (this.matches[0] == 'hello'){
      this.tts.speak('Hello Derik, How are you doing today?').then(() => 
      console.log('Success')
    ).catch((reason: any) => console.log(reason));
    }

    else if (this.matches[0] == "I am fine thanks and you"){
      this.tts.speak('i am also fine, so what can i help you with today?').then(() => 
      console.log('Success')
    ).catch((reason: any) => console.log(reason));
    
    }

  }

  start(){
    this.speechRecognition.startListening().subscribe(
      (matches: Array<string>) => {
        this.isRescording =  true;
        if (this.isRescording == true){
          this.status =  "danger";
        }
      this.matches =  matches;
      this.isRescording =  true;
      if (this.isRescording == true){
        this.status =  "light";
      }    this.speak();
      console.log(this.matches)
      },
      (onerror) => console.log('error:', onerror)
    )

  }

}
