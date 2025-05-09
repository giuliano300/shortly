import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Papa from 'papaparse';
import { CommonModule } from '@angular/common';
import { ShortenerService } from '../../../services/shortener.service';

@Component({
    selector: 'app-from-csv',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './from-csv.component.html',
    styleUrl: './from-csv.component.scss'
})
export class FromCsvComponent {
  csvData: any[] = []; // Dati letti dal CSV
  fileToUpload: File | null = null;
  
  isDragging = false;
  justUploaded: boolean = false;

  startAccorcia: boolean = false;

  constructor(private http: HttpClient, private shortenerService: ShortenerService) {}

  // Gestire la selezione del file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      this.readCsv(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        this.onFileSelected({ target: { files: [file] } } as any);
      } else {
        alert('Seleziona un file .csv valido');
      }
    }
  }


  // Leggere il CSV usando PapaParse
  readCsv(file: File): void {
    Papa.parse(file, {
      complete: (result) => {
        this.csvData = result.data;
        console.log('Dati CSV letti:', this.csvData);
      },
      header: true, // Indica che il CSV ha una riga di intestazione
      skipEmptyLines: true, // Ignora le righe vuote
      delimiter: ';'
    });
  }
  
  accorciaUrls(): void {
    const urls = this.csvData.map(row => row.url);
    this.shortenerService.shortenBatch(urls).subscribe(res => {
      this.csvData.forEach((row, index) => {
        row.shortUrl = res[index].shortUrl;
      });
      this.startAccorcia = true; 
      this.justUploaded = true; 
    });
  }


    downloadCsv() {
      const shortUrls = this.csvData.map(result => ({ shortUrl: result.shortUrl }));
      const csv = Papa.unparse(shortUrls);
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'urls.csv';
      link.click();
    }
}
