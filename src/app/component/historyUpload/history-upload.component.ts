import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryResponse } from '../../Interfaces/HistoryResponse';
import { HttpClient } from '@angular/common/http';
import { ShortenerService } from '../../services/shortener.service';
import { ShortUrlResponse } from '../../Interfaces/ShortUrlResponse';
import Papa from 'papaparse';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-history-upload',
  imports: [CommonModule, ConfirmDialogComponent, NgIf],
  templateUrl: './history-upload.component.html',
  styleUrl: './history-upload.component.scss'
})
export class HistoryUploadComponent {

  constructor(private http: HttpClient, private shortenerService: ShortenerService) {}
  
  historyResponses : HistoryResponse[] | null = null;
  listOflinks: ShortUrlResponse[] | null = null;
  currentHistory: HistoryResponse | null = null;

  showConfirm = false;

  ngOnInit(): void {
    this.getItems();
  }

  downloadList(h:HistoryResponse){
    this.shortenerService.getListOfLinks(h.guid)
    .subscribe(res => {
       const shortUrls = res.map(result => ({ shortUrl: result.shortCode }));
        const csv = Papa.unparse(shortUrls);
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'urls.csv';
        link.click();
    });
  }

  getItems(){
    this.shortenerService.getHistoryUploads()
      .subscribe(res => {
        this.historyResponses = res;
      });
  }

  openDialog(h:HistoryResponse){
    this.showConfirm = true;
    this.currentHistory = h; 
  }

  handleConfirm() {
    this.showConfirm = false;
    this.shortenerService.deleteList(this.currentHistory!.guid)
      .subscribe(res => {
          this.getItems();
      });
  }

  handleCancel() {
    this.showConfirm = false;
  }
}
