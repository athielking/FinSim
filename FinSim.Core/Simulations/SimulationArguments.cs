using FinSim.Core.Investments;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace FinSim.Core.Simluations
{
    public class SimulationArguments
    {
        public string SimulationName { get; set; }
        public int NumberOfRuns { get; set; } = 100;
        
        public List<InvestmentArguments> Investments { get; set; } = new List<InvestmentArguments>();

        public int MaxYears => Investments.Max(i => i.NumberOfYears);

        public IEnumerable<Simulation> CreateSimulations()
        {
            for (int i = 0; i < NumberOfRuns; i++)
                yield return new Simulation(this);
        }
    }
}
