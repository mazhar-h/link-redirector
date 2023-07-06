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

  generateUrl(input: HTMLInputElement) {
    let value = input.value;
    if (!this.isValidUrl(value)) {
      this.generatedUrl = '';
      return;
    }
    value = this.appendProtocol(value);
    this.linkService.createLink(value)
      .subscribe(response => {
        this.generatedUrl = this.getHostUrl() + response.code;
        input.blur();
        input.value = '';
      });
  }

  appendProtocol(value: string) {
    if (!value.startsWith("http://") && !value.startsWith("https://"))
      value = "https://" + value;
    return value;
  }

  isValidUrl(value: string): boolean {
    if (!value.startsWith("http://") && !value.startsWith("https://"))
      value = "https://" + value;
    let urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    try {
      return Boolean(new URL(value)) && urlPattern.test(value);
    }
    catch (e) {
      return false;
    }
  }

  copyToClipboard(): void {
    if (this.generatedUrl)
      navigator.clipboard.writeText(this.generatedUrl);
  }

  getHostUrl(): string {
    let host = document.location.host;
    let path = document.location.pathname;
    return this.appendProtocol(host + path);
  }

}