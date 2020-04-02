import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PatientService } from '../patients.service';
import { Patient } from '../../core/model/patient';
import { EmailMessage } from '../../core/model/emailMessage';
import { MessageTemplate } from '../../core/model/messageTemplate';
import { MessageTemplateService } from '../../core/services/messageTemplate.service';

@Component({
  selector: 'app-automated-message',
  templateUrl: './automated-message.component.html',
  styleUrls: ['./automated-message.component.scss',
  '../../styles.scss']
})
export class AutomatedMessageComponent implements OnInit {

  patient$: Observable<Patient>;
  templates$: Observable<MessageTemplate[]>;
  email: EmailMessage;

  constructor(
    public dialogRef: MatDialogRef<AutomatedMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientsService: PatientService,
    private messageTemplateService: MessageTemplateService) { }

  ngOnInit() {
    this.patient$ = this.patientsService.getPatient(this.data.patientId);
    this.email = <EmailMessage>{};
    this.templates$ = this.messageTemplateService.getMessageTemplates();

    this.templates$.subscribe(data => {
      const templates = data as MessageTemplate[];
      this.email.Subject = templates[0].Name;
      this.email.Message = templates[0].Message;
    });
  }

  sendMessage(emailMessage: EmailMessage) {
    this.patientsService.sendMessage(this.data.patientId, emailMessage);
    this.dialogRef.close();
  }

  onTemplateChange(event): void {
    const newVal = event.target.value;
    this.templates$.subscribe(data => {
      const templates = data as MessageTemplate[];
      const selectedTemplate = templates.find(x => x.Id = newVal);
      this.email.Subject = selectedTemplate.Name;
      this.email.Message = selectedTemplate.Message;
    });

  }

}
