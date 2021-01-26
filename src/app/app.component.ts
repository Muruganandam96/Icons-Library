import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icons } from 'src/lib/icon';
import { LibraryDetails } from './library.model';
import { LibraryService } from './library.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild("searchInput") searchInput: ElementRef;

    searchModel: string = '';

    title = 'iconlibrary';
    showNav: boolean;
    activeLibraryIconsList = [];
    libraries: LibraryDetails[] = [];
    activeFilter: string;
    iconType = [];

    icon = new BehaviorSubject({
        selectedIconLibray: '',
        selectedFilter: '',
    });

    icon$ = this.icon.asObservable();
    activeLibraryIconName: string[];
    iconsList: any;
    LibraryObj: LibraryDetails;
    showSearch = false;
    iconPackages = [];
    LibraryIconName: string[];
    noresult = false;


    @HostListener('window:scroll') onScroll(event: Event): void {
        const elem = document.getElementsByTagName('main')[0];
        this.showNav = this.isInViewport(elem);

    }

    constructor(private librarySevice: LibraryService) {

    }

    ngOnInit(): void {
        this.librarySevice.getLibraryDetails().subscribe((res: LibraryDetails[]) => {
            this.libraries = res;
            this.icon.next({
                selectedIconLibray: 'Ant Icons',
                selectedFilter: 'filled',
            })
            this.getIcon();
            this.getIconPackages();
        }
        );
       

    }

    getIconPackages(): void {
        this.libraries.forEach(library => {
            library.type.forEach(iconType => {
                this.iconPackages.push(library.typeDetail[iconType]);
            })
        })
    }

    isInViewport(el): boolean {
        let [top, left, width, height] = [el.offsetTop, el.offsetLeft, el.offsetWidth, el.offsetHeight];

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    };

    getIcon(): void {
        this.icon$.subscribe(data => {
            this.LibraryObj = this.libraries.find(obj => obj.name === data.selectedIconLibray);
            this.LibraryObj.active = true;
            this.findIcons(this.LibraryObj, data.selectedFilter);
        });
    }

    findIcons(obj: LibraryDetails, filter) {
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
            }
            this.iconsList.push(iconObj);
        }
        );
        this.iconType = [];
        obj.type.forEach(iconType => {
            const data = {
                type: iconType,
                active: false
            }
            data.active = iconType === filter;
            this.iconType.push(data);
        })
    }

    filterIcons(iconType): void {
        this.icon.next({
            selectedIconLibray: this.LibraryObj.name,
            selectedFilter: iconType,
        })
    }

    getSelectedLibrary(library: LibraryDetails) {
        this.LibraryObj.active = false;
        this.icon.next({
            selectedIconLibray: library.name,
            selectedFilter: [...library.type].shift(),
        })
    }

    showSearchBar(): void {
        this.showSearch = !this.showSearch;
        this.iconsList = [];
        this.searchModel = '';

        if (!this.showSearch) {

            let obj = {
                selectedIconLibray: '',
                selectedFilter: ''
            }

            this.icon$.subscribe(res => {
                obj.selectedIconLibray = res.selectedIconLibray,
                    obj.selectedFilter = res.selectedFilter
                console.log(obj)
            });

            this.icon.next({
                selectedIconLibray: obj.selectedIconLibray,
                selectedFilter: obj.selectedFilter,
            })
        }

    }

    searchIcon(): void {
        if (this.searchModel) {
            this.LibraryIconName = [];
            this.iconsList = [];
            this.iconPackages.forEach(iconPackage => {
                const libraryIconList = Icons[iconPackage];
                this.LibraryIconName = Object.keys(Icons[iconPackage]);
                console.log(this.LibraryIconName);
                this.LibraryIconName.forEach(name => {
                    if (name.toLowerCase().includes(this.searchModel.toLowerCase())) {
                        const iconObj = {
                            svg: libraryIconList[name],
                            name: name
                        }
                        this.iconsList.push(iconObj);
                    }
                })
            })

            this.noresult = this.iconsList.length === 0;
        }
    }
}

