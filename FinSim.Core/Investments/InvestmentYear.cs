using FinSim.Core.Contributions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FinSim.Core.Investments
{
    public class InvestmentYear
    {
        public decimal StartingPrincipal
        {
            get;
            private set;
        }

        public decimal EndingPrincipal
        {
            get; set;
        }

        public decimal RateOfReturn
        {
            get;
            private set;
        }

        public Frequency CompoundingFrequency
        {
            get;
            private set;
        }

        public List<IContribution> Contributions { get; set; } = new List<IContribution>();

        public InvestmentYear(decimal startingPrincipal, decimal rateOfReturn, Frequency compoundingFrequency)
        {
            StartingPrincipal = startingPrincipal;
            RateOfReturn = rateOfReturn;
            CompoundingFrequency = compoundingFrequency;
        }

        public void CalculateEndingPrincipal(int yearIndex)
        {
            var n = (Constants.NumberOfWeeks / (int)CompoundingFrequency);
            var rate = (RateOfReturn / n ) / 100m;

            EndingPrincipal = StartingPrincipal;
            for (int i = 1; i <= Constants.NumberOfWeeks; i++)
            {
                var aggregate = 0m;
                if (i % (int)CompoundingFrequency == 0)
                    aggregate = EndingPrincipal * rate;

                aggregate += GetTotalContribution(yearIndex, i);

                EndingPrincipal += aggregate;
            }
        }

        private decimal GetTotalContribution(int year, int week)
        {
            return Contributions.Select(c => c.GetContributionAmount(year, week)).Sum();
        }
    }
}
