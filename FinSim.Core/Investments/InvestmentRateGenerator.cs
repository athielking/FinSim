using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace FinSim.Core.Investments
{ 
    public class InvestmentRateGenerator
    {
        public static decimal GetTheoreticalReturnRate()
        {
            int randomIndex;
            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                byte[] randomBytes = new byte[4];
                rng.GetBytes(randomBytes);
                randomIndex = Math.Abs(BitConverter.ToInt32(randomBytes, 0));
            }

            if (randomIndex > Constants.HistoricalSP500Returns.Count)
                randomIndex = randomIndex % Constants.HistoricalSP500Returns.Count;

            var indexes = new List<int>();
            indexes.Add(randomIndex);
            indexes.Add(randomIndex + 1 >= Constants.HistoricalSP500Returns.Count ? randomIndex - 2 : randomIndex + 1);
            indexes.Add((randomIndex - 1 < 0 ? randomIndex + 2 : randomIndex - 1));

            var rate = 0m;
            foreach(var i in indexes)
                rate += Constants.HistoricalSP500Returns[i];

            rate /= 3m;
            return rate;
        }
    }
}
