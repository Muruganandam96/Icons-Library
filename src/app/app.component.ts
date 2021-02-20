import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryDetails } from './library.model';
import { LibraryService } from './library.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    selectedLibraryDetails: LibraryDetails;
    searchState: boolean;
    constructor(private router: Router,
                private librarySevice: LibraryService) {
        window.onpopstate =  (e) => { window.history.forward(); }
    }

    ngOnInit(): void {
        this.router.navigate(['/', 'Ant Icons', 'filled']);

        this.librarySevice.showSearchBar$.subscribe(state => this.searchState = state);
    }

    getSelectedLibraryDetails(selectedLibrary: LibraryDetails): void {
        this.librarySevice.selectedLibraryDetails(selectedLibrary);
    }
}

