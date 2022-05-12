import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BackendService, Ticket, TicketDetails } from "../backend.service";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"],
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  private stop$: Subject<void> = new Subject<void>();

  ticket: Observable<TicketDetails>;

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.stop$))
      .subscribe(
        (res) => (this.ticket = this.backend.getTicketDetails(res.id))
      );
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
