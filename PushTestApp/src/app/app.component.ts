/// <reference path="services/message.service.ts" />
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '@services/message.service';
import { IMessage } from '@interfaces/IMessage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message: IMessage;
  messageForm: FormGroup;
  submitted = false;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) {
    this.message = <IMessage>{};

    this.messageForm = this.formBuilder.group({
      appKey: ['', Validators.required],
      userKey: ['', Validators.required],
      userMessage: ['', [Validators.required]]
    });
  }
  apiValues: string[] = [];
  ngOnInit() {
  }

  get f() { return this.messageForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.messageForm.invalid) {
      return;
    }

    this.message.AppKey = this.f.appKey.value;
    this.message.UserKey = this.f.userKey.value;
    this.message.Text = this.f.userMessage.value;


    this.messageService.sendMessage(this.message).subscribe(message => this.message = message);
  }
}
