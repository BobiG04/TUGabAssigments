using System;
using System.Collections.Generic;

namespace Flowers
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter number of gardens: ");
            int arrLength = int.Parse(Console.ReadLine());

            for (int i = 0; i < arrLength; i++)
            {
                Console.Write("Color: ");
                string color = Console.ReadLine();

                Garden? garden = color.ToLower() switch
                {
                    "violet" => new VioletGarden(),
                    "yellow" => new YellowGarden(),
                    "pink" => new PinkGarden(),
                    _ => null
                };

                if (garden == null)
                {
                    Console.WriteLine("No such color garden available.");
                    continue;
                }

                var context = new Context(garden);
                context.CreateGarden();

                Console.WriteLine($"\nGarden #{i + 1} ({color}):");
                var flowers = context.GetGarden().GetFlowers();

                Console.WriteLine("\nOriginal:");
                PrintList(flowers);

                var arr1 = flowers.ToArray();
                InsertionSort(arr1);
                Console.WriteLine("\nAfter InsertionSort:");
                PrintArray(arr1);

                var arr2 = flowers.ToArray();
                SelectionSort(arr2);
                Console.WriteLine("\nAfter SelectionSort:");
                PrintArray(arr2);

                var arr3 = flowers.ToArray();
                BubbleSort(arr3);
                Console.WriteLine("\nAfter BubbleSort:");
                PrintArray(arr3);
            }
        }

        static void PrintList(List<string> list)
        {
            foreach (var s in list)
                Console.WriteLine("  " + s);
        }

        static void PrintArray(string[] arr)
        {
            foreach (var s in arr)
                Console.WriteLine("  " + s);
        }


        static void InsertionSort(string[] arr)
        {
            int n = arr.Length;
            for (int i = 1; i < n; ++i)
            {
                string key = arr[i];
                int j = i - 1;
                while (j >= 0 && string.Compare(arr[j], key, StringComparison.CurrentCulture) > 0)
                {
                    arr[j + 1] = arr[j];
                    j = j - 1;
                }
                arr[j + 1] = key;
            }
        }

        static void BubbleSort(string[] arr)
        {
            int n = arr.Length;
            for (int i = 0; i < n - 1; i++)
            {
                for (int j = 0; j < n - i - 1; j++)
                {
                    if (string.Compare(arr[j], arr[j + 1], StringComparison.CurrentCulture) > 0)
                    {
                        string temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }

        static void SelectionSort(string[] arr)
        {
            int n = arr.Length;
            for (int i = 0; i < n - 1; i++)
            {
                int min_idx = i;
                for (int j = i + 1; j < n; j++)
                    if (string.Compare(arr[j], arr[min_idx], StringComparison.CurrentCulture) < 0)
                        min_idx = j;
                string temp = arr[min_idx];
                arr[min_idx] = arr[i];
                arr[i] = temp;
            }
        }
    }

    public abstract class Garden
    {
        protected List<string> flowers = new List<string>();
        public abstract void CreateGarden();
        public void ShowGarden()
        {
            foreach (var flower in flowers)
            {
                Console.WriteLine(flower);
            }
        }

        public List<string> GetFlowers() => new List<string>(flowers);
    }

    public class VioletGarden : Garden
    {
        public override void CreateGarden()
        {
            flowers.Add("Трителея Koninging fabiola");
            flowers.Add("Гладиол Cote D'azur");
            flowers.Add("Фрезия двойна синя");
            flowers.Add("Гладиол Callianthus");
        }
    }

    public class YellowGarden : Garden
    {
        public override void CreateGarden()
        {
            flowers.Add("Иксия mix");
            flowers.Add("Гладиол жълт");
            flowers.Add("Фрезия");
            flowers.Add("Крокосмия");
        }
    }

    public class PinkGarden : Garden
    {
        public override void CreateGarden()
        {
            flowers.Add("Лилия розова");
            flowers.Add("Фрезия розова");
            flowers.Add("Кала розова");
            flowers.Add("Гладиол розов");
        }
    }

    class Context
    {
        private Garden myGarden;
        public Context(Garden garden)
        {
            myGarden = garden;
        }

        public void ContextInterface()
        {
            myGarden.CreateGarden();
            myGarden.ShowGarden();
        }
        public void CreateGarden() => myGarden.CreateGarden();
        public Garden GetGarden() => myGarden;
    }
}
