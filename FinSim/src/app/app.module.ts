import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { SimulationStore } from './simulation/simulation.store';
import { CalculatorService } from './calculator/calculator.service';
import { ChartStore } from './simulation/chart.store';
import { ChartComponent } from './simulation/chart.component';
import { ContributionPromptComponent } from './setup/contribution-prompt.component';
import { SetupService } from './setup/setup.service';
import { BasicContributionComponent } from './setup/basic-contribution.component';
import { IRAContributionComponent } from './setup/ira-contribution.component';
import { Contribution401kComponent } from './setup/contribution-401k.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulationSetupComponent } from './setup/simulation-setup.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SimulationComponent,
    SimulationSetupComponent,
    ContributionPromptComponent,
    BasicContributionComponent,
    IRAContributionComponent,
    Contribution401kComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [
    SimulationStore,
    CalculatorService,
    ChartStore,
    SetupService
  ],
  entryComponents: [
    ContributionPromptComponent,
    BasicContributionComponent,
    IRAContributionComponent,
    Contribution401kComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
