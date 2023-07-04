import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../services/link.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private linkService: LinkService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        let code = params.get('id');
        if (!code)
          return;
        this.linkService.getLink(code)
          .subscribe({
            next: (response) => { location.href = response.url; },
            error: (error) => { location.href = this.getDomain() + "not-found" }});
      })
  }
  getDomain(): string {
    let hostname: string = document.location.hostname;
    let host: string = document.location.host;
    let path: string = document.location.pathname;
    if (hostname === 'localhost')
      return "http://" + host;
    return hostname + path;
  }
}
