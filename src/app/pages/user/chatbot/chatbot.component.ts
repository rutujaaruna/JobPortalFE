// import { Component } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';


// @Component({
//   selector: 'app-chatbot',
//   templateUrl: './chatbot.component.html',
//   styleUrls: ['./chatbot.component.css']
// })

// export class ChatbotComponent {
//   userInput: string = ''; // Define userInput property
//   output!: string;

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {}

//   Chatbot(value:string) {
//     console.log('value',value);

//     this.apiService
//       .getApi(`/bot/getBotDataByUserInput?userInput=${value}`)
//       .subscribe((response: any) => {
//         this.output = response.data.bot_output;
//         console.log("response", response.data.bot_output);
//         // Process response here
//       });
//   }
// }


import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
interface Conversation {
  userInput: string;
  botOutput?: string; // Make botOutput optional
}
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = ''; // Define userInput property
  conversations: Conversation[] = []; // Array to store conversations
  @ViewChild('userInputRef') userInputRef!: ElementRef<HTMLInputElement>; 
  constructor(private apiService: ApiService) {}
  
  Chatbot() {
    const userInputValue = this.userInputRef.nativeElement.value; // Access the value of the input field
    if (userInputValue.trim() === '') return; // Don't proceed if input is empty
    this.conversations.push({ userInput: userInputValue }); // Add user input to conversation
    this.apiService
      .getApi(`/bot/getBotDataByUserInput?userInput=${userInputValue}`)
      .subscribe((response: any) => {
        const botResponse = response.data.bot_output; // Get bot response
        this.conversations.push({ userInput: '', botOutput: botResponse }); // Add bot response to conversation
        this.userInput = ''; // Clear input field after sending message
      });
  }
}