import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../services/link.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private linkService: LinkService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        let code = params.get('id');
        if (!code)
          return;
        this.linkService.getLink(code)
          .subscribe({
            next: (response) => { location.replace(response.url); },
            error: (error) => {
              location.replace(this.getDomain(code) + 'not-found')
              //this.router.navigateByUrl('not-found');
            }});
      })
  }

    getDomain(code: string | null) {
      let path = location.pathname;
      let host = location.host;
      let hostname = location.hostname;
      if (hostname == 'localhost')
        host = 'http://' + host;
      path = path.replace(code as string, '');
      return host + path;
    }
}
