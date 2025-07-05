import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-introduction-components',
  templateUrl: './introduction-components.component.html',
  styleUrls: ['./introduction-components.component.css'],
})
export class IntroductionComponentsComponent implements AfterViewInit {
  isPaused = false;
  private intervalId: any = null;

  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;

  private paddleHeight = 10;
  private paddleWidth = 75;
  private paddleX = 0;

  private ballRadius = 5;
  private x = 0;
  private y = 0;
  private dx = 2;
  private dy = -2;

  private rightPressed = false;
  private leftPressed = false;

  constructor(
    private el: ElementRef,
    private titleService: Title,
    private metaService: Meta
  ) {
    // ✅ Đặt tiêu đề trang
    this.titleService.setTitle(
      'Giới thiệu – Sota Spa & Beauty | Tận tâm & Chuyên nghiệp'
    );

    // ✅ Cập nhật các thẻ meta
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Khám phá hành trình và giá trị của Sota Spa – Spa & Beauty uy tín, nơi mang đến trải nghiệm thư giãn và làm đẹp chuyên biệt.',
      },
      {
        name: 'keywords',
        content:
          'Giới thiệu Sota Spa, Spa uy tín, Chăm sóc sắc đẹp, Liệu trình cao cấp, Dịch vụ spa chuyên nghiệp',
      },
      { name: 'author', content: 'Sota Spa' },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:title', content: 'Giới thiệu – Sota Spa & Beauty' },
      {
        property: 'og:description',
        content:
          'Sota Spa – Địa chỉ chăm sóc sắc đẹp & thư giãn hàng đầu. Tận tâm – Chuyên nghiệp – Đẳng cấp.',
      },
      {
        property: 'og:image',
        content:
          'https://sotaspaofficial.onrender.com/assets/images/LogoNewR.jpg',
      },
      {
        property: 'og:url',
        content: 'https://sotaspaofficial.onrender.com/#/introduction',
      },
      { property: 'og:type', content: 'website' },
    ]);
  }

  ngAfterViewInit(): void {
    this.canvas = this.el.nativeElement.querySelector(
      '#breakoutCanvas'
    ) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resetGame();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') this.rightPressed = true;
      if (e.key === 'Left' || e.key === 'ArrowLeft') this.leftPressed = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight')
        this.rightPressed = false;
      if (e.key === 'Left' || e.key === 'ArrowLeft') this.leftPressed = false;
    });

    this.draw();
  }

  togglePause() {
    if (this.isPaused) {
      this.resetGame(); // Reset bóng & paddle nếu game đang bị "pause" vì game over
    }
    this.isPaused = !this.isPaused;
    if (!this.isPaused) this.draw(); // tiếp tục
  }

  private resetGame() {
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
  }

  private drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.canvas.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawPausedText() {
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'yellow';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Paused', this.canvas.width / 2, this.canvas.height / 2);
  }

  private draw() {
    if (this.isPaused) {
      this.drawPausedText();
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall();
    this.drawPaddle();

    // Va chạm tường
    if (
      this.x + this.dx > this.canvas.width - this.ballRadius ||
      this.x + this.dx < this.ballRadius
    ) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy;
      } else {
        this.isPaused = true;
        this.drawPausedText();
        return;
      }
    }

    // Di chuyển paddle
    if (
      this.rightPressed &&
      this.paddleX < this.canvas.width - this.paddleWidth
    ) {
      this.paddleX += 5;
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 5;
    }

    this.x += this.dx;
    this.y += this.dy;

    requestAnimationFrame(() => this.draw());
  }
  moveLeft() {
    this.leftPressed = true;
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.leftPressed = true;
    }, 10);
  }

  moveRight() {
    this.rightPressed = true;
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.rightPressed = true;
    }, 10);
  }

  stopMove() {
    this.leftPressed = false;
    this.rightPressed = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
