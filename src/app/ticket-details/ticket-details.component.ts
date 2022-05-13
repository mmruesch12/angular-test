import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  BackendService,
  Ticket,
  TicketDetails,
  User,
} from "../backend.service";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"],
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  private stop$: Subject<void> = new Subject<void>();
  users: Observable<User[]> = this.backend.users();

  ticket: Observable<TicketDetails>;

  ticketId: number;

  form = this.formBuilder.group({
    user: new FormControl("", Validators.required),
  });

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.stop$)).subscribe((res) => {
      this.ticketId = res.id;
      this.ticket = this.backend.getTicketDetails(res.id);
    });
  }

  assignTicket() {
    console.log(this.form.controls["user"].value);
    this.ticket.pipe(takeUntil(this.stop$)).subscribe((res) => {
      this.backend
        .assign(res.ticket.id, this.form.controls["user"].value?.id)
        .subscribe((res) => {
          this.ticket = this.backend.getTicketDetails(this.ticketId);
        });
    });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
