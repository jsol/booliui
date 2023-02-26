import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListingsService, Listing } from '../listings.service';

@Component({
  selector: 'app-listings-all',
  templateUrl: './listings-all.component.html',
  styleUrls: ['./listings-all.component.css']
})

export class ListingsAllComponent implements AfterViewInit {
  displayedColumns: string[] = ['url', 'address', 'area', 'rent', 'price', 'floor', 'rating', 'id'];
  dataSource!: MatTableDataSource<Listing>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _listings: ListingsService) {
    this._listings.addObserver(() => {
      this.dataSource = new MatTableDataSource(this._listings.data)
      this.dataSource.sort = this.sort;
    })

    this._listings.getListings()

  }

  @ViewChild(MatSort) sort: MatSort;

  refresh() {
    this._listings.getListings()
  }

  ngAfterViewInit() {

  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
