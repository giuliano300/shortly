import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ShortenerService } from "../../services/shortener.service";
import Papa from "papaparse";

@Component({
    selector: 'app-shortener',
    standalone: true,
    templateUrl: './shortener.component.html',
    imports: [CommonModule, FormsModule]
})
export class ShortenerComponent {
  urlInput = '';
  disabled: boolean = true;
  notLoad: boolean = true;
  justUploaded: boolean = false;
  results: { original: string, shortUrl: string }[] = [];

  constructor(private shortenerService: ShortenerService) {}

  submit() {
    const urls = this.urlInput.split('\n').map(u => u.trim()).filter(u => !!u);
    this.shortenerService.shortenBatch(urls).subscribe(res => {
      this.results = res;
      this.disabled = false;
      this.justUploaded = true;
    });
  }

  downloadCsv() {
    const shortUrls = this.results.map(result => ({ shortUrl: result.shortUrl }));
    const csv = Papa.unparse(shortUrls);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'urls.csv';
    link.click();
  }
}
