import { NgModule } from '@angular/core';
import { NbMenuModule, NbBadgeModule, NbInputModule, NbIconModule, NbTreeGridModule, NbCardModule, NbListModule, NbButtonModule, NbFormFieldModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { BagModule } from './bag/bag.module';
import { HelpModule } from './help/help.module';
import { CategoriesComponent } from './categories/categories.component';
import { TablesRoutingModule } from './tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ConfigComponent } from './config/config.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    BagModule,
    HelpModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    FormsModule,
    QRCodeModule
  ],
  declarations: [
    PagesComponent,
    CategoriesComponent,
    OrdersComponent,
    OrderDetailComponent,
    ConfigComponent,
  ],
})
export class PagesModule {
}
