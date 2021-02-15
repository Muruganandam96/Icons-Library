import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LibraryDetails } from '../library.model';
import { LibraryService } from '../library.service';


@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
    libraries: LibraryDetails[] = [];
    libraryName = '';


    @Output() sendSelectedLibraryDetails = new EventEmitter<LibraryDetails>();
    navState: boolean;
    searchState: boolean;
    navActive = false;

    constructor(private librarySevice: LibraryService,
        private router: Router) {
    }


    ngOnInit(): void {
        this.librarySevice.getLibraryDetails().subscribe((res: LibraryDetails[]) => {
            this.libraries = res;
            this.libraries[0].active = true;
        });
        this.getNavState();
        this.librarySevice.showSearchBar$.subscribe(state => this.searchState = state);
    }

    getNavState(): void {
        this.librarySevice.hideNavItemActive$.subscribe(state => {
            this.navState = state;
        });
    }

    setNavState(): void {
        this.librarySevice.setNavActiveStatus(true);
    }


    navigateTo(library: LibraryDetails): void {

        this.sendSelectedLibraryDetails.emit(library);
        this.setNavState();
        this.libraries.find(libraryObj => {
            libraryObj.active = libraryObj.name === library.name;
        });

        this.router.navigate(['/', library.name, 'filled']);
        this.activateNav();
    }

    showSearch(): void {
        this.librarySevice.setSearchStatus(true);
    }

    activateNav(): void {
        this.navActive = !this.navActive;
        const bodyElement = document.getElementsByTagName('body')[0];
        if (this.navActive) {
            bodyElement.style.overflowY = 'hidden';
        } else {
            bodyElement.style.overflowY = 'auto';
        }
    }
}
