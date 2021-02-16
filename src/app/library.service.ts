import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryDetails } from './library.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { state } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    constructor(private httpClient: HttpClient) { }
    readonly url = 'assets/libraries.json';

    defaultLibrary = {
        name: 'Ant Icons',
        type: [
            'filled',
            'outlined',
            'duotoned'
        ],
        typeDetail: {
            filled: 'AntIconFilled',
            outlined: 'AntIconOutlined',
            duotoned: 'AntIconDuotone'
        },
        image: '../assets/logo/ant.svg',
        license: 'MIT',
        link: 'https://github.com/ant-design/ant-design-icons'
    };

    private libraryDetails = new BehaviorSubject<LibraryDetails>(this.defaultLibrary as LibraryDetails);
    private hideNavItemActive = new BehaviorSubject<boolean>(true);

    private showSearchBar = new BehaviorSubject<boolean>(false);



    libraryDetails$ = this.libraryDetails.asObservable();
    hideNavItemActive$ = this.hideNavItemActive.asObservable();
    showSearchBar$ = this.showSearchBar.asObservable();

    selectedLibraryDetails(library: LibraryDetails): void {
        this.libraryDetails.next(library);
    }

    getLibraryDetails(): Observable<any> {
        return this.httpClient.get(this.url);
    }

    setNavActiveStatus(navState: boolean): void {
        this.hideNavItemActive.next(navState);
    }

    setSearchStatus(searchState): void {
        this.showSearchBar.next(searchState);
    }

}
