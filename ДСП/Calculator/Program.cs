namespace Calculator
{
    internal class Program
    {
        static void Main(string[] args)
        {
            User user = new User();

            char operation = ' ';
            int operand = 0;
            int levels = 0;

            do
            {
                Console.Clear();
                Console.WriteLine("Simple Calculator");
                Console.WriteLine("-----------------");
                Console.WriteLine("+  : Add");
                Console.WriteLine("-  : Subtract");
                Console.WriteLine("*  : Multiply");
                Console.WriteLine("/  : Divide");
                Console.WriteLine("u  : Undo (provide number of levels)");
                Console.WriteLine("r  : Redo (provide number of levels)");
                Console.WriteLine("q  : Quit");
                Console.Write("\nEnter command: ");

                var raw = Console.ReadLine();
                if (string.IsNullOrWhiteSpace(raw))
                {
                    continue;
                }

                operation = raw.Trim()[0];

                switch (operation)
                {
                    case '+' or '-' or '*' or '/':
                        while (true)
                        {
                            Console.Write("Enter operand (integer): ");
                            var opRaw = Console.ReadLine();
                            if (int.TryParse(opRaw, out operand))
                            {
                                break;
                            }
                            Console.WriteLine("Invalid number, try again.");
                        }

                        user.Compute(operation, operand);
                        Console.WriteLine("\nPress Enter to continue...");
                        Console.ReadLine();
                        continue;

                    case 'u':
                        while (true)
                        {
                            Console.Write("Enter levels to undo (integer): ");
                            var lvlRaw = Console.ReadLine();
                            if (int.TryParse(lvlRaw, out levels) && levels > 0)
                            {
                                break;
                            }
                            Console.WriteLine("Invalid number, please enter a positive integer.");
                        }

                        user.Undo(levels);
                        Console.WriteLine("\nPress Enter to continue...");
                        Console.ReadLine();
                        continue;

                    case 'r':
                        while (true)
                        {
                            Console.Write("Enter levels to redo (integer): ");
                            var lvlRaw = Console.ReadLine();
                            if (int.TryParse(lvlRaw, out levels) && levels > 0)
                            {
                                break;
                            }
                            Console.WriteLine("Invalid number, please enter a positive integer.");
                        }

                        user.Redo(levels);
                        Console.WriteLine("\nPress Enter to continue...");
                        Console.ReadLine();
                        continue;

                    case 'q':
                        break;

                    default:
                        Console.WriteLine("Unknown command. Press Enter to continue...");
                        Console.ReadLine();
                        break;
                }
            } while (operation != 'q');
        }
    }
}
