import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IconGridComponent } from './icon-grid/icon-grid.component';
import { DetailspanelComponent } from './detailspanel/detailspanel.component';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AsideComponent } from './aside/aside.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SortPipe } from './sort.pipe';



@NgModule({
  declarations: [
    AppComponent,
    IconGridComponent,
    DetailspanelComponent,
    DropdownDirective,
    MainComponent,
    AsideComponent,
    SortPipe,

    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule {


}
