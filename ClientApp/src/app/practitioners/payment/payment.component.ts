import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { NgForm } from '@angular/forms';

declare var Stripe: any;

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
  })
export class PaymentComponent implements AfterViewInit, OnDestroy {
    constructor(private paymentService: PaymentService, private cd: ChangeDetectorRef) { }

  paymentRequest: any;
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  userId: number;
  stripe: any;


  ngAfterViewInit() {
    this.paymentService.getStripePublicKey().subscribe(x => {
      this.stripe = Stripe(x.Value);
      let elements = this.stripe.elements();

      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);

      this.card.addEventListener('change', this.cardHandler);
    });
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      return this.paymentService.paymentRequest(token).subscribe(x => {
          window.location.href = '/api/authorize/success';
      });
    }
  }
}
