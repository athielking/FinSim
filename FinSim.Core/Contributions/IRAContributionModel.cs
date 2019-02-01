using System;
using System.Collections.Generic;
using System.Text;

namespace FinSim.Core.Contributions
{
    public class IRAContributionModel : IContribution
    {
        private const decimal FedMaximum = 5000m;
        private readonly Frequency _frequency;

        public IRAContributionModel(Frequency frequency)
        {
            _frequency = frequency;
        }

        public decimal GetContributionAmount(int yearIndex, int weekIndex)
        {
            if (weekIndex % (int)_frequency != 0)
                return 0m;

            return FedMaximum / (decimal)(Constants.NumberOfWeeks / (int)_frequency);
        }
    }
}

