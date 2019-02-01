using FinSim.Core;
using FinSim.Core.Contributions;
using FinSim.Core.Investments;
using FinSim.Core.Simluations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FinSim.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("-------------- 401k Calculator --------------");
            System.Console.Write("Number of Simulations:");

            var numSims = Int32.Parse(System.Console.ReadLine());
            var simArgs = new SimulationArguments()
            {
                NumberOfRuns = numSims
            };

            simArgs.Investments.Add(new InvestmentArguments()
            {
                Name = "401k",
                NumberOfYears = 30,
                CompoundingFrequency = Frequency.Quarterly,
                Principal = 100000m,
                Contributions = new List<Core.Contributions.IContribution>() {
                    new _401kContributionModel()
                    {
                        AnnualIncrease = 3m,
                        Salary = 100000m,
                        ContributionPercent = 6m,
                        EmployerMatchPercent = 100m,
                        EmployerMatchMax = 6m,
                        PayFrequency = Frequency.BiWeekly,
                        SafeHarbor = true,
                        SafeHarborPercent = 3m,
                    }
                }
                
            });

            simArgs.Investments.Add(new InvestmentArguments()
            {
                Name = "Roth IRA",
                NumberOfYears  = 30,
                Principal = 10000m,
                CompoundingFrequency = Frequency.Quarterly,
                Contributions = new List<IContribution>()
                {
                    new IRAContributionModel(Frequency.BiWeekly)
                }
            });
            
            foreach( var sim in simArgs.CreateSimulations())
            {
                sim.Run();
                System.Console.WriteLine("---- Simulation ----");
                foreach (var investment in sim.Investments)
                {
                    System.Console.WriteLine($"{investment.Name}");
                    System.Console.WriteLine($"Avg Return: {investment.AvgRateOfReturn:N2}%");
                    System.Console.WriteLine($"Starting Balance: {investment.StartingPrincipal:N2}");
                    System.Console.WriteLine($"Ending Balance: {investment.EndingPrincipal:N2}");
                    System.Console.WriteLine();
                }
                System.Console.WriteLine("---------------------");
                System.Console.WriteLine();
            }
            
            System.Console.ReadLine();

        }
    }
}
