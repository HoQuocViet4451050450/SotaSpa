import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion-components',
  templateUrl: './promotion-components.component.html',
  styleUrls: ['./promotion-components.component.scss'],
})
export class PromotionComponentsComponent {
  nhanVoucher() {
    alert('Bạn đã nhận được Voucher 20% – Cảm ơn bạn đã lựa chọn Atona Spa!');
  }
}
