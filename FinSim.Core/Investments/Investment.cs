using FinSim.Core.Contributions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FinSim.Core.Investments
{
    public class Investment
    {
        public string Name { get; set; }
        public Frequency CompoundingFrequency { get; set; }
        public int NumberOfYears { get; set; }
        public decimal StartingPrincipal { get; set; }

        public decimal EndingPrincipal => _years.Last().EndingPrincipal;
        public decimal AvgRateOfReturn => _years.Sum(y => y.RateOfReturn) / _years.Count;

        private List<InvestmentYear> _years = new List<InvestmentYear>();
        public IEnumerable<InvestmentYear> Years
        {
            get => _years;
        }

        private List<IContribution> Contributions { get; set; } = new List<IContribution>();

        public Investment(InvestmentArguments args)
        {
            Name = args.Name;
            CompoundingFrequency = args.CompoundingFrequency;
            NumberOfYears = args.NumberOfYears;
            StartingPrincipal = args.Principal;
            Contributions = args.Contributions;
        }

        public void CalculateYear(int yearIndex, decimal rateOfReturn)
        {
            if (yearIndex >= NumberOfYears)
                return;

            var principal = yearIndex > 0 ?
                _years[yearIndex - 1].EndingPrincipal :
                StartingPrincipal;

            var year = new InvestmentYear(principal, rateOfReturn, CompoundingFrequency);
            year.Contributions = Contributions;
            year.CalculateEndingPrincipal(yearIndex);

            _years.Add(year);
        }
    }
}
