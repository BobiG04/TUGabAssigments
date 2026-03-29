using System;
using System.Collections.Generic;
using System.Text;

namespace Calculator
{
    internal class CalculatorCommand : Command
    {
        char _operation;
        int _operand;

        Calculator _calculator;

        public CalculatorCommand(Calculator calculator, char operation, int operand)
        {
            _calculator = calculator;
            _operation = operation;
            _operand = operand;
        }

        public override void Execute()
        {
            _calculator.ExecuteOperation(_operation, _operand);
        }

        public override void UnExecute()
        {
            _calculator.ExecuteOperation(Undo(_operation), _operand);
        }

        private char Undo(char operation)
        {
            switch (operation)
            {
                case '+': return '-';
                case '-': return '+';
                case '*': return '/';
                case '/': return '*';
                default: throw new ArgumentException("Invalid operation");
            }
        }
    }
}
