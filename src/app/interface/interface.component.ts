import { Component } from '@angular/core';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  generatedValue: string | undefined;

  constructor(private linkService: LinkService) { }

  generateUrl(inputValue: string) {
    this.linkService.createLink(inputValue)
    .subscribe(response => {
      this.generatedValue = this.getDomain() + response.code;
    });
  }

  getDomain(): string {
    let host = document.location.host;
    let path = document.location.pathname;
    return host + path;
  }

}