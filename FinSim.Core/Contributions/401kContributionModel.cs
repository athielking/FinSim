using System;
using System.Collections.Generic;
using System.Text;

namespace FinSim.Core.Contributions
{
    public class _401kContributionModel : IContribution
    {
        public decimal Salary { get; set; }
        public decimal AnnualIncrease { get; set; }
        public decimal ContributionPercent { get; set; }
        public decimal EmployerMatchPercent { get; set; }
        public decimal EmployerMatchMax { get; set; }
        public bool SafeHarbor { get; set; } = false;
        public decimal SafeHarborPercent { get; set; }
        public Frequency PayFrequency { get; set; }

        public decimal GetContributionAmount(int yearIndex, int weekIndex)
        {
            if (weekIndex % (int)PayFrequency != 0)
                return 0;

            var increase = ((AnnualIncrease / 100m) * yearIndex) + 1;
            var salary = Salary * increase;

            var contributionAmount = Math.Min((salary * (ContributionPercent / 100m)), Constants.FederalMaximum401kContribution);
            var employerMatch = (salary * (Math.Min(EmployerMatchMax, ContributionPercent) / 100m)) * (EmployerMatchPercent / 100m);

            var contributionPerPeriod = contributionAmount / (decimal)(Constants.NumberOfWeeks / (int)PayFrequency);
            var matchPerPeriod = employerMatch / (decimal)(Constants.NumberOfWeeks / (int)PayFrequency);

            var totalContrib = contributionPerPeriod + matchPerPeriod;
            if( SafeHarbor && (weekIndex % (int)Frequency.Annually == 0) )
            {
                var safeHarborContrib = salary * (SafeHarborPercent / 100m);
                totalContrib += safeHarborContrib;
            }

            return totalContrib;
        }
    }
}
