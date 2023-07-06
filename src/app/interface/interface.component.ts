import { Component } from '@angular/core';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  static readonly PLACEHOLDER1 = 'Your URL here';
  static readonly PLACEHOLDER1INVALID = 'Invalid URL';
  static readonly INPUT1INVALID = 'input-invalid';
  static readonly INPUT1 = 'input-1';
  generatedUrl: string | undefined;

  constructor(private linkService: LinkService) { }

  generateUrl(input: HTMLInputElement) {
    let value = input.value;
    if (!this.isValidUrl(value)) {
      input.className = InterfaceComponent.INPUT1INVALID;
      input.value = '';
      input.placeholder = InterfaceComponent.PLACEHOLDER1INVALID;
      this.generatedUrl = '';
      return;
    }
    value = this.appendProtocol(value);
    this.linkService.createLink(value)
      .subscribe(response => {
        this.generatedUrl = this.getHostUrl() + response.code;
        input.blur();
        input.value = '';
        input.className = InterfaceComponent.INPUT1;
        input.placeholder = InterfaceComponent.PLACEHOLDER1;
      });
  }

  onFocus() {
    this.generatedUrl = '';
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