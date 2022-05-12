import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BackendService } from "../backend.service";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"],
})
export class TicketListComponent implements OnInit {
  tickets = this.backend.tickets();
  users = this.backend.users();

  form = this.formBuilder.group({
    name: new FormControl(""),
    description: new FormControl(""),
  });

  constructor(
    private backend: BackendService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  getDetails(id: string) {
    this.router.navigate(["/ticket/" + id]);
  }

  addTicket() {
    this.backend
      .newTicket({
        // name: this.form.controls["name"].value,
        description: this.form.controls["description"].value,
      })
      .subscribe((res) => {
        this.tickets = this.backend.tickets();
      });
  }
}
