using System;
using System.Collections.Generic;
using System.Text;

namespace Calculator
{
    internal abstract class Command
    {
        public abstract void Execute();
        public abstract void UnExecute();
    }
}
