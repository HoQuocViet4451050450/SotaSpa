import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponentsComponent } from './components/auth-components/auth-components.component';
import { TrangChuComponentsComponent } from './components/trang-chu-components/trang-chu-components.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponentsComponent } from './components/footer-components/footer-components.component';
import { BlogsComponentsComponent } from './components/blogs-components/blogs-components.component';
import { BookingComponentsComponent } from './components/booking-components/booking-components.component';
import { InfoComponentsComponent } from './components/info-components/info-components.component';
import { ServiceComponentsComponent } from './components/service-components/service-components.component';
import { VisitCounterComponentsComponent } from './components/visit-counter-components/visit-counter-components.component';
import { PromotionComponentsComponent } from './components/promotion-components/promotion-components.component';
import { PageManagerComponentsComponent } from './components/administration/page-manager-components/page-manager-components.component';
import { BlogPageComponentsComponent } from './components/pages/blog-page-components/blog-page-components.component';
import { BlogdetailComponentsComponent } from './components/blogdetail-components/blogdetail-components.component';
import { IntroductionComponentsComponent } from './components/introduction-components/introduction-components.component';
import { MenuComponentsComponent } from './components/menu-components/menu-components.component';
import { HorizontalMenuComponentsComponent } from './components/horizontal-menu-components/horizontal-menu-components.component';
import { PromotionPosterComponentsComponent } from './components/promotion-poster-components/promotion-poster-components.component';
import { HeaderbestComponentsComponent } from './components/headerbest-components/headerbest-components.component';
import { SpaCounterComponentsComponent } from './components/spa-counter-components/spa-counter-components.component';
import { FloatingSocialComponentsComponent } from './components/floating-social-components/floating-social-components.component';
import { HeaderbestGioithieuComponentsComponent } from './components/headerbest-gioithieu-components/headerbest-gioithieu-components.component';
import { HeaderbestDichvuComponentsComponent } from './components/headerbest-dichvu-components/headerbest-dichvu-components.component';
import { HeaderbestKhuyenmaiComponentsComponent } from './components/headerbest-khuyenmai-components/headerbest-khuyenmai-components.component';
import { HeaderbestBlogComponentsComponent } from './components/headerbest-blog-components/headerbest-blog-components.component';
import { LienheComponentsComponent } from './components/lienhe-components/lienhe-components.component';
import { HeaderbestLienheComponentsComponent } from './components/headerbest-lienhe-components/headerbest-lienhe-components.component';
import { HeaderbestDatlichComponentsComponent } from './components/headerbest-datlich-components/headerbest-datlich-components.component';
import { DatlichComponentsComponent } from './components/datlich-components/datlich-components.component';
import { SpaCounterEmployeeComponentsComponent } from './components/spa-counter-employee-components/spa-counter-employee-components.component';
import { CerComponentsComponent } from './components/cer-components/cer-components.component';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
const routes: Routes = [
  { path: '', component: TrangChuComponentsComponent },
  { path: 'auth', component: AuthComponentsComponent },
  { path: 'footerComponents', component: FooterComponentsComponent },
  { path: 'pageManager', component: PageManagerComponentsComponent },
  { path: 'blogPage', component: BlogPageComponentsComponent },
  { path: 'blogdetail/:encodedId', component: BlogdetailComponentsComponent },
  { path: 'introduction', component: IntroductionComponentsComponent },
  { path: 'menu', component: MenuComponentsComponent },
  { path: 'promotionPoster', component: PromotionPosterComponentsComponent },
  { path: 'headerbest', component: HeaderbestComponentsComponent },
  { path: 'lien-he', component: LienheComponentsComponent },
  { path: 'dat-lich', component: DatlichComponentsComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AuthComponentsComponent,
    TrangChuComponentsComponent,
    FooterComponentsComponent,
    BlogsComponentsComponent,
    BookingComponentsComponent,
    InfoComponentsComponent,
    ServiceComponentsComponent,
    VisitCounterComponentsComponent,
    PromotionComponentsComponent,
    PageManagerComponentsComponent,
    BlogPageComponentsComponent,
    BlogdetailComponentsComponent,
    IntroductionComponentsComponent,
    MenuComponentsComponent,
    HorizontalMenuComponentsComponent,
    PromotionPosterComponentsComponent,
    HeaderbestComponentsComponent,
    SpaCounterComponentsComponent,
    FloatingSocialComponentsComponent,
    HeaderbestGioithieuComponentsComponent,
    HeaderbestDichvuComponentsComponent,
    HeaderbestKhuyenmaiComponentsComponent,
    HeaderbestBlogComponentsComponent,
    LienheComponentsComponent,
    HeaderbestLienheComponentsComponent,
    HeaderbestDatlichComponentsComponent,
    DatlichComponentsComponent,
    SpaCounterEmployeeComponentsComponent,
    CerComponentsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
