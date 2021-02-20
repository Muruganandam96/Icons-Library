import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router'; // CLI imports router
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './notfound/notfound.component';




const routes: Routes = [
    {
        path: ':name/:filter',
        component: MainComponent
    },
    {
        path: '404',
        component: NotfoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload',  scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
