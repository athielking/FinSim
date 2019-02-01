using FinSim.Core.Contributions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace FinSim.Core.Investments
{
    public class InvestmentArguments
    {
        public string Name { get; set; }
        public int NumberOfYears { get; set; }
        public decimal Principal { get; set; }
        public Frequency CompoundingFrequency { get; set; }

        public List<IContribution> Contributions { get; set; }
    }
}
