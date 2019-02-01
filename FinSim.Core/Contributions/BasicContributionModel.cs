using System;
using System.Collections.Generic;
using System.Text;

namespace FinSim.Core.Contributions
{
    public class BasicContributionModel : IContribution
    {
        public decimal Amount { get; set; }
        public Frequency Frequency { get; set; }

        public decimal GetContributionAmount(int yearIndex, int weekIndex)
        {
            if (weekIndex % (int)Frequency != 0)
                return 0;

            return Amount;
        }
    }
}
