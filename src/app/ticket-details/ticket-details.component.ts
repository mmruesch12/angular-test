import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BackendService, Ticket } from "../backend.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"],
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  private stop$: Subject<void> = new Subject<void>();

  ticket: Ticket;

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.params);
    // this.route.params.pipe(takeUntil(this.stop$)).subscribe(() => {
    //   this.ticket = this.backend.ticket(this.route.params);
    // });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
