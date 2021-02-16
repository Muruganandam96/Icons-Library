import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Icons } from 'src/lib/icon';
import { LibraryDetails } from '../library.model';
import { LibraryService } from '../library.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('searchInput') searchInput: ElementRef;

    transformNav = false;
    scrollPosition = 0;

    searchModel = '';
    private unsubscribe$ = new Subject<void>();

    title = 'iconlibrary';
    showNav: boolean;
    activeLibraryIconsList = [];
    libraries: LibraryDetails[] = [];
    activeFilter: string;
    iconType = [];

    icon = new BehaviorSubject({
        selectedIconLibrary: '',
        selectedFilter: '',
    });

    icon$ = this.icon.asObservable();
    activeLibraryIconName: string[];
    iconsList: any;
    showSearch = false;
    iconPackages = [];
    LibraryIconName: string[];
    noresult = false;
    name = 'Ant Icons';
    libraryName: any;
    libraryFilter: any;

    selectedlibraryDetail: LibraryDetails;
    searchState: boolean;
    showScrollTopButton: boolean;



    @HostListener('window:scroll', ['$event'])
    findScrollPosition(event: Event): void {

        this.transformNav = (window.pageYOffset > 100) && (window.pageYOffset > 0);
        this.showScrollTopButton = window.pageYOffset > 200;
        this.scrollPosition = window.pageYOffset;
    }


    constructor(private librarySevice: LibraryService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.librarySevice.libraryDetails$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(selectedLibrary => {
                this.selectedlibraryDetail = selectedLibrary;
                this.icon.next({
                    selectedIconLibrary: selectedLibrary.name,
                    selectedFilter: [...selectedLibrary.type].shift(),
                });
                this.getIcons();
            });

        this.librarySevice.showSearchBar$.subscribe(state => {
            this.showSearch = state;

            if (this.showSearch) {
                this.iconsList = [];
            }
        });
    }

    getIcons(): void {
        this.icon$.subscribe(data => {
            this.findIcons(this.selectedlibraryDetail, data.selectedFilter);
        });
    }

    ngAfterViewInit(): void {
        this.getIconsPackages();
    }

    getIconsPackages(): void {
        this.librarySevice.getLibraryDetails().subscribe((res: LibraryDetails[]) => {
            this.libraries = res;
            this.libraries.forEach(library => {
                library.type.forEach(iconType => {
                    this.iconPackages.push(library.typeDetail[iconType]);
                });
            });
        });

    }

    findIcons(obj: LibraryDetails, filter: string): void {
        this.activeFilter = obj.typeDetail[filter];
        this.activeLibraryIconsList = [];
        this.iconsList = [];
        this.activeLibraryIconsList = Icons[this.activeFilter];
        this.activeLibraryIconName = [];
        this.activeLibraryIconName = Object.keys(Icons[this.activeFilter]);
        this.activeLibraryIconName.forEach(el => {
            const iconObj = {
                svg: this.activeLibraryIconsList[el],
                name: el
            };
            this.iconsList.push(iconObj);
        }
        );
        this.iconType = [];
        obj.type.forEach(iconType => {
            const data = {
                type: iconType,
                active: false
            };
            data.active = iconType === filter;
            this.iconType.push(data);
        });
    }

    filterIcons(iconType: any): void {
        this.icon.next({
            selectedIconLibrary: this.selectedlibraryDetail.name,
            selectedFilter: iconType,
        });
    }

    getSelectedLibrary(library: LibraryDetails): void {
        this.selectedlibraryDetail.active = false;
        this.icon.next({
            selectedIconLibrary: library.name,
            selectedFilter: [...library.type].shift(),
        });
    }

    hideSearchBar(): void {
        const libraryName = this.route.snapshot.paramMap.get('name');
        const filter = this.route.snapshot.paramMap.get('filter');
        this.icon.next({
            selectedIconLibrary: libraryName,
            selectedFilter: filter
        });
        this.librarySevice.setSearchStatus(false);
    }

    showSearchBar(): void {
        this.librarySevice.setSearchStatus(true);
        this.searchModel = '';
        setTimeout(() => this.searchInput.nativeElement.focus(), 0);
        if (!this.showSearch) {
            this.librarySevice.setNavActiveStatus(false);
            const obj = {
                selectedIconLibrary: '',
                selectedFilter: '',
            };

            this.icon$.subscribe(res => {
                obj.selectedIconLibrary = res.selectedIconLibrary,
                    obj.selectedFilter = res.selectedFilter;
            });

            this.icon.next({
                selectedIconLibrary: obj.selectedIconLibrary,
                selectedFilter: obj.selectedFilter,
            });
        } else {
            this.librarySevice.setNavActiveStatus(false);
        }

    }

    searchIcons(): void {
        if (this.searchModel) {
            this.LibraryIconName = [];
            this.iconsList = [];
            this.iconPackages.forEach(iconPackage => {
                const libraryIconList = Icons[iconPackage];
                this.LibraryIconName = Object.keys(Icons[iconPackage]);
                this.LibraryIconName.forEach(name => {
                    if (name.toLowerCase().includes(this.searchModel.toLowerCase())) {
                        const iconObj = {
                            svg: libraryIconList[name],
                            name: name
                        };
                        this.iconsList.push(iconObj);
                    }
                });
            });

            this.noresult = this.iconsList.length === 0;
        }
    }


    navigateTo(library: LibraryDetails): void {
        this.name = library.name;
        this.router.navigate(['/', this.name, 'Filled']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    goToUrl(externalLibraryLink): void {
        window.open(externalLibraryLink, '_blank')
        console.log(externalLibraryLink);
    }
}
