using System;
using System.Collections.Generic;
using System.Text;

namespace FinSim.Core.Contributions
{
    public interface IContribution
    {
        decimal GetContributionAmount(int yearIndex, int weekIndex);
    }
}
