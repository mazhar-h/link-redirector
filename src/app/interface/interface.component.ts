import { Component } from '@angular/core';
import { LinkService } from '../services/link.service';
import { LinkResponse } from '../models/link.model';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  static readonly PLACEHOLDER1 = 'Your URL here';
  static readonly PLACEHOLDER1INVALID = 'Invalid URL';
  static readonly INPUT1 = 'form-control input-1';
  static readonly INPUT1INVALID = 'form-control input-invalid';
  generatedUrl: string | undefined;

  constructor(private linkService: LinkService) { }

  generateUrl(input: HTMLInputElement) {
    let inputValue = input.value;
    if (!this.isValidUrl(inputValue)) {
      this.onInvalid(input)
      return;
    }
    inputValue = this.appendProtocol(inputValue);
    this.linkService.createLink(inputValue)
      .subscribe({
        next: response => { this.onValid(input, response) }
      });
  }

  onInvalid(input: HTMLInputElement) {
    input.className = InterfaceComponent.INPUT1INVALID;
    input.value = '';
    input.placeholder = InterfaceComponent.PLACEHOLDER1INVALID;
    this.generatedUrl = '';
  }

  onValid(input: HTMLInputElement, response: LinkResponse) {
    this.generatedUrl = this.getHostUrl() + response.code;
    input.blur();
    input.value = '';
    input.className = InterfaceComponent.INPUT1;
    input.placeholder = InterfaceComponent.PLACEHOLDER1;
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
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    try {
      return Boolean(new URL(value)) && urlPattern.test(value) && !value.includes(location.hostname);
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
    let host = location.host;
    let path = location.pathname;
    return this.appendProtocol(host + path);
  }

}