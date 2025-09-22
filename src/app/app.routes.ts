import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
    { path: 'campaigns', loadComponent: () => import('./pages/campaigns/campaigns.component').then(m => m.CampaignsComponent) },
    { path: 'campaigns/:id', loadComponent: () => import('./pages/campaign-details/campaign-details.component').then(m => m.CampaignDetailsComponent) },
    { path: 'about-us', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
    { path: 'signin', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
];
