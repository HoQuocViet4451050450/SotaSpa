import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-trang-chu-components',
  templateUrl: './trang-chu-components.component.html',
  styleUrls: ['./trang-chu-components.component.css'],
})
export class TrangChuComponentsComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.scroll-fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((el: Element) => observer.observe(el));
  }

  currentIndex = 0;
  feedbackList = [
    {
      title: 'Đội ngũ chuyên nghiệp và tận tâm!',
      content:
        'Tôi thật sự hài lòng với dịch vụ tại Spa Sota. Ngay từ khoảnh khắc bước chân vào, tôi đã cảm nhận được sự tiếp đón niềm nở và chuyên nghiệp từ đội ngũ nhân viên. Không chỉ là một buổi spa thông thường, đây còn là khoảng thời gian để tôi thật sự “sống chậm lại” và tận hưởng. Các bạn tư vấn rất kỹ về tình trạng da của tôi, giải thích cặn kẽ từng bước liệu trình. Trong suốt quá trình, tôi cảm thấy hoàn toàn yên tâm và được chăm sóc chu đáo. Mùi hương tinh dầu dịu nhẹ, tiếng nhạc thư giãn cùng không gian ấm cúng đã khiến tôi như được “reset” lại tinh thần. Tôi tin rằng đây không chỉ là một địa điểm làm đẹp mà còn là nơi nuôi dưỡng cảm xúc tích cực sau những ngày làm việc mệt mỏi.',
      avatar: 'assets/images/da.jpg',
      name: 'Nguyễn Minh Hằng',
      position: 'Chuyên viên Marketing',
    },
    {
      title: 'Dịch vụ tuyệt vời, trên cả mong đợi!',
      content:
        'Là người từng trải nghiệm khá nhiều spa tại TP.HCM, tôi có phần dè dặt khi thử một địa điểm mới. Nhưng Spa Sota đã vượt xa kỳ vọng của tôi. Tôi chọn gói chăm sóc da mặt kết hợp massage toàn thân, và chỉ sau một buổi liệu trình, làn da tôi mềm mại, tươi tắn hơn rõ rệt. Cơ thể cũng cảm thấy nhẹ nhàng và linh hoạt hơn hẳn. Nhân viên cực kỳ tận tình, họ lắng nghe rất kỹ nhu cầu của tôi và điều chỉnh thao tác sao cho phù hợp nhất. Tôi đặc biệt đánh giá cao sự sạch sẽ và chỉn chu trong từng chi tiết nhỏ – từ khăn tắm, giường nằm, cho đến từng động tác massage đều thể hiện sự chuyên nghiệp. Đây chắc chắn sẽ là địa chỉ quen thuộc của tôi mỗi khi muốn “reset” lại bản thân.',
      avatar: 'assets/images/user1.jpg',
      name: 'Trần Quốc Bảo',
      position: 'Nhân viên văn phòng',
    },
    {
      title: 'Không gian thư giãn, chất lượng dịch vụ 5 sao!',
      content:
        'Tôi là người khá kỹ tính và đã thử nhiều spa khác nhau, nhưng thật lòng mà nói, Spa Sota là nơi khiến tôi cảm thấy thực sự an tâm và hài lòng. Không gian được bài trí vô cùng sang trọng, tinh tế nhưng vẫn giữ được sự gần gũi, ấm cúng. Từng chi tiết nhỏ đều toát lên sự đầu tư nghiêm túc và chuyên nghiệp. Các bước chăm sóc da được thực hiện rất nhẹ nhàng, không gây kích ứng hay khó chịu như nhiều nơi khác tôi từng trải nghiệm. Điều khiến tôi ấn tượng nhất là sản phẩm sử dụng đều có nguồn gốc rõ ràng và phù hợp với làn da nhạy cảm của tôi. Đây không chỉ là spa, mà là nơi tôi tìm thấy sự thư giãn thật sự giữa nhịp sống hối hả.',
      avatar: 'assets/images/user2.jpg',
      name: 'Lê Thị Mỹ Linh',
      position: 'Doanh nhân',
    },
    {
      title: 'Trải nghiệm tuyệt vời và đáng nhớ!',
      content:
        'Đây là lần đầu tiên tôi ghé thăm Spa Sota, và cũng là lần đầu tôi cảm thấy mình được chăm sóc một cách tận tâm và chỉn chu đến vậy. Ngay từ khi bước vào, tôi đã cảm nhận được sự chuyên nghiệp và thân thiện từ lễ tân cho đến kỹ thuật viên. Tôi chọn liệu trình massage đá nóng – một lựa chọn hoàn toàn đúng đắn! Sau 90 phút, cơ thể tôi như được hồi sinh, các cơ bắp giãn ra hoàn toàn, mọi áp lực như tan biến. Phòng trị liệu yên tĩnh, ấm áp, hương thơm dễ chịu, ánh sáng dịu nhẹ – tất cả tạo nên một trải nghiệm rất riêng biệt. Tôi chắc chắn sẽ quay lại và giới thiệu cho bạn bè, người thân của mình.',
      avatar: 'assets/images/user3.jpg',
      name: 'Phạm Anh Tú',
      position: 'Nhà thiết kế nội thất',
    },
  ];

  next() {
    if (this.currentIndex < this.feedbackList.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.feedbackList.length - 1;
    }
  }
}
