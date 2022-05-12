import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"],
})
export class TicketListComponent implements OnInit {
  tickets = this.backend.tickets();
  users = this.backend.users();

  constructor(private backend: BackendService, private router: Router) {}

  ngOnInit(): void {}

  getDetails(id: string) {
    this.router.navigate(["/ticket/" + id]);
  }
}
