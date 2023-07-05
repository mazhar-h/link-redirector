import { Component } from '@angular/core';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  generatedUrl: string | undefined;

  constructor(private linkService: LinkService) { }

  generateUrl(inputValue: string) {
    this.linkService.createLink(inputValue)
      .subscribe(response => {
        this.generatedUrl = this.getDomain() + response.code;
      });
  }

  copyToClipboard(): void {
    if (this.generatedUrl)
      navigator.clipboard.writeText(this.generatedUrl);
  }

  getDomain(): string {
    let host = document.location.host;
    let path = document.location.pathname;
    return host + path;
  }

}