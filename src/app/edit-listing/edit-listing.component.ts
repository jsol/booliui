import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListingsService, Listing } from '../listings.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface EditData {
  id: string;
}

interface ScoreOption {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})

export class EditListingComponent {
  fetched: Listing
  scoreOptions: ScoreOption[] = [
  ];
  selectedScore: number

  constructor(public dialogRef: MatDialogRef<EditListingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditData, private _listings: ListingsService) {
    this.fetched = <Listing>{}
    this.selectedScore = 0
    _listings.getListing(data.id).subscribe((l: any) => {
      this.fetched = {
        url: l.url,
        id: l.booliId,
        address: l.location.address.streetAddress,
        area: l.location.namedAreas.join("/"),
        rent: l.rent,
        price: l.listPrice,
        floor: l.floor,
        rating: l.score > 0 ? l.score : l.rating
      }
      this.selectedScore =  Math.round(this.fetched.rating)
    })

    for (let i = 10; i >= 0; i--) {
      this.scoreOptions.push({ value: i, viewValue: "" + i })
    }

    this.scoreOptions.push({ value:  -100, viewValue: "Delete" })

    dialogRef.afterClosed().subscribe(result => {
      if (result != "save") {
        return
      }

      if (this.selectedScore != this.fetched.rating) {

        console.log("SAVE ", this.selectedScore, "to", this.fetched.id)
        _listings.scoreListing(this.fetched.id, this.selectedScore)
      } else {
        console.log("No save")
      }
    });
  }


}
