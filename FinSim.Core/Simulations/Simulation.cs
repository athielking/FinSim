using FinSim.Core.Investments;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FinSim.Core.Simluations
{
    public class Simulation
    {
        private SimulationArguments _args;
        private List<Investment> _investments;
        public IEnumerable<Investment> Investments { get => _investments; }   
            
        public Simulation(SimulationArguments args)
        {
            _args = args;
            _investments = new List<Investment>();

            Initialize();
        }

        public void Initialize()
        {
            foreach (var invArg in _args.Investments)
                _investments.Add(new Investment(invArg));
        }

        public void Run()
        {
            var years = Investments.Max(i => i.NumberOfYears);
            for(int i = 0; i<years; i++)
            {
                var yearlyRate = InvestmentRateGenerator.GetTheoreticalReturnRate();
                foreach(var investment in _investments)
                    investment.CalculateYear(i, yearlyRate);
            }
        }
    }
}
