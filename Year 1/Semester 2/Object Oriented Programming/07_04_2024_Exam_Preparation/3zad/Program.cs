using System;
using System.Collections.Generic;

namespace _3zad
{
    class Battery
    {
        public string Model { get; set; }
        public double IdleTime { get; set; }
        public double HoursTalk { get; set; }

        public Battery() { }
        public Battery(string model, double idleTime, double hoursTalk)
        {
            Model = model;
            IdleTime = idleTime;
            HoursTalk = hoursTalk;
        }
    }

    class Display
    {
        public double Size { get; set; }
        public string Colors { get; set; } // В условието е дадено като характеристика

        public Display() { }
        public Display(double size, string colors)
        {
            Size = size;
            Colors = colors;
        }
    }

    class MobilePhone
    {
        public string Model { get; set; }
        public string Manufacturer { get; set; }
        public double Price { get; set; }
        public string Owner { get; set; }
        public Battery PhoneBattery { get; set; }
        public Display PhoneDisplay { get; set; }

        private string number;

        // Свойство Номер с валидация за стационарен
        public string Number
        {
            get { return number; }
            set
            {
                number = value;
                // Най-често стационарните номера започват с 02 или са с дължина 9 цифри
                if (number != null && (number.StartsWith("02") || number.Length == 9))
                {
                    Console.WriteLine("Номера който сте избрали е стационарен");
                }
            }
        }

        // Конструктор за частична информация
        public MobilePhone(string model, string manufacturer)
        {
            Model = model;
            Manufacturer = manufacturer;
        }

        // Конструктор за пълна информация
        public MobilePhone(string model, string manufacturer, double price, string owner, Battery battery, Display display)
        {
            Model = model;
            Manufacturer = manufacturer;
            Price = price;
            Owner = owner;
            PhoneBattery = battery;
            PhoneDisplay = display;
        }

        // Статичен метод за история на разговорите
        public static void Calls(List<string> calledNumbers)
        {
            Console.WriteLine("Списък на набраните номера:");
            foreach (var num in calledNumbers)
            {
                Console.WriteLine(num);
            }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            // Демонстрация на функционалностите
            Battery bat = new Battery("Li-Ion", 200, 10);
            Display disp = new Display(6.5, "16M");
            MobilePhone phone = new MobilePhone("Galaxy S21", "Samsung", 1500, "Ivan", bat, disp);

            // Тестване на свойството за стационарен номер
            phone.Number = "028765432"; 

            // Тестване на статичния метод
            List<string> callHistory = new List<string> { "0888123456", "028765432", "0899999999" };
            MobilePhone.Calls(callHistory);
        }
    }
}