using System;
using System.Collections.Generic;
using System.Text;

namespace Calculator
{
    internal class Calculator
    {

        int curr = 0;

        public void ExecuteOperation(char operation, int operand)
        {
            switch (operation)
            {
                case '+': curr += operand; break;
                case '-': curr -= operand; break;
                case '*': curr *= operand; break;
                case '/': curr /= operand; break;
                default: break;
            }
            Console.WriteLine("Current value = {0} (following {1} {2})", curr, operation, operand);
        }

    }
}
