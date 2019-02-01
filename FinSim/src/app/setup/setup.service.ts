import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContributionPromptComponent } from './contribution-prompt.component';
import { ContributionTypes } from '../models/constants';
import { Investment } from '../models/simulation/investment.model';
import { BasicContributionComponent } from './basic-contribution.component';
import { IRAContributionComponent } from './ira-contribution.component';
import { Contribution401kComponent } from './contribution-401k.component';
import { IContribution } from '../models/contributions/contribution.interface';

@Injectable({
    providedIn: 'root'
})
export class SetupService {
    constructor(private dialog: MatDialog) {}

    public showContributionTypePrompt(investment: Investment) {
        const ref = this.dialog.open(ContributionPromptComponent, {
            disableClose: true,
            height: '220px',
            width: '280px'
        });

        ref.afterClosed().subscribe( result => {
            if (!result) {
                return;
            }

            this.openContributionOfType( ref.componentInstance.promptForm.controls['contributionType'].value, investment );
        });
    }

    public openBasicContributionDialog(investment: Investment, editModel?: IContribution) {
        const ref = this.dialog.open(BasicContributionComponent, {
            disableClose: true,
            width: '400px',
            data: {
                investment: investment,
                editModel: editModel
            }
        });
    }

    public openIRAContributionDialog(investment: Investment, editModel?: IContribution) {
        const ref = this.dialog.open(IRAContributionComponent, {
            disableClose: true,
            width: '400px',
            data: {
                investment: investment,
                editModel: editModel
            }
        });
    }

    public open401kContributionDialog(investment: Investment, editModel?: IContribution) {
        const ref = this.dialog.open(Contribution401kComponent, {
            disableClose: true,
            width: '400px',
            data: {
                investment: investment,
                editModel: editModel
            }
        });
    }

    public openContributionOfType(type: string, investment: Investment, editModel?: IContribution) {
        switch (type) {
            case ContributionTypes.Contribution401kType:
                this.open401kContributionDialog(investment, editModel);
            break;
            case ContributionTypes.ContributionIRAType:
                this.openIRAContributionDialog(investment, editModel);
            break;
            case ContributionTypes.ContributionBasicType:
                this.openBasicContributionDialog(investment, editModel);
            break;
        }
    }
}
