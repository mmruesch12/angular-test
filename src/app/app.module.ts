import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { RouterModule, Routes } from "@angular/router";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketDetailsComponent } from "./ticket-details/ticket-details.component";

const routes: Routes = [
  {
    path: "",
    // pathMatch: "full",
    // redirectTo: "tickets",
    component: TicketListComponent,
  },
  // {
  //   path: "tickets",
  //   component: TicketListComponent,
  // },
  {
    path: "ticket/:id",
    component: TicketDetailsComponent,
  },
];

@NgModule({
  declarations: [AppComponent, TicketListComponent, TicketDetailsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: "enabled" }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
