import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditListingComponent } from '../edit-listing/edit-listing.component';


@Component({
  selector: 'app-edit-listing-dialog',
  templateUrl: './edit-listing-dialog.component.html',
  styleUrls: ['./edit-listing-dialog.component.css']
})
export class EditListingDialogComponent {
  @Input() booliId: string;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(EditListingComponent, {
      data: {
        id: this.booliId,
      }
    });

  }
}
