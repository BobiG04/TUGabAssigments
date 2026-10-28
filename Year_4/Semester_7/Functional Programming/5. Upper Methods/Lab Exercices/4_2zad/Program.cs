namespace _4_2zad;

class Program
{

    // 1st variant - Func
    static Func<double,double> CreateFuncConversion (double factor)
    {
        return value => value * factor;
    }

    static Func<double, double> metersToKilometersFunc = CreateFuncConversion(1.0 / 1000);
    static Func<double, double> kilometersToMetersFunc = CreateFuncConversion(1000);
    static Func<double, double> minutesToSecondsFunc = CreateFuncConversion(60);
    static Func<double, double> secondsToMinutesFunc = CreateFuncConversion(1.0 / 60);
    static Func<double, double> metersPerSecondToKilometersPerHourFunc = CreateFuncConversion(3.6);
    static Func<double, double> kilometersPerHourToMetersPerSecondFunc = CreateFuncConversion(1.0 / 3.6);
    static Func<double, double> kilometersPerHourToMilesPerHourFunc =
        CreateFuncConversion(1.0 / 1.609344);

    // 2nd variant - delegate
    delegate double DelegateConverter(double value);

    static DelegateConverter CreateDelegateConverter(double factor)
    {
        return value => value * factor;
    }

    static DelegateConverter metersToKilometersDel = CreateDelegateConverter(1.0 / 1000);
    static DelegateConverter kilometersToMetersDel = CreateDelegateConverter(1000);
    static DelegateConverter minutesToSecondsDel = CreateDelegateConverter(60);
    static DelegateConverter secondsToMinutesDel = CreateDelegateConverter(1.0 / 60);
    static DelegateConverter metersPerSecondToKilometersPerHourDel = CreateDelegateConverter(3.6);
    static DelegateConverter kilometersPerHourToMetersPerSecondDel = CreateDelegateConverter(1.0 / 3.6);
    static DelegateConverter kilometersPerHourToMilesPerHourDel =
        CreateDelegateConverter(1.0 / 1.609344);

    // 3rd variant - Function composition
    static Func<double,double> Compose(
        Func<double, double> first,
        Func<double, double> second
    )
    {
        return value => second(first(value));
    }

    static Func<double, double> Identity = value => value;
    static Func<double, double> metersToKilometersComp =
        Compose(Identity, value => value / 1000);
    static Func<double, double> kilometersToMetersComp =
        Compose(Identity, value => value * 1000);
    static Func<double, double> minutesToSecondsComp =
        Compose(Identity, value => value * 60);
    static Func<double, double> secondsToMinutesComp =
        Compose(Identity, value => value / 60);
    static Func<double, double> metersPerSecondToKilometersPerHourComp =
        Compose(Identity, value => value * 3.6);
    static Func<double, double> kilometersPerHourToMetersPerSecondComp =
        Compose(Identity, value => value / 3.6);
    static Func<double, double> kilometersPerHourToMilesPerHourComp =
        Compose(value => value / 1.609344, Identity);

    public static void Main()
    {
        while (true)
        {
            Console.WriteLine("""
                Choose a conversion:
                1. Meters to kilometers
                2. Kilometers to meters
                3. Minutes to seconds
                4. Seconds to minutes
                5. Meters per second to kilometers per hour
                6. Kilometers per hour to meters per second
                7. Kilometers per hour to miles per hour
                8. End
                """);
            Console.Write("Enter a command: ");

            string? command = Console.ReadLine();

            if (command is "8" or "End" or null or "")
            {
                return;
            }

            Func<double, double>? funcConversion;
            DelegateConverter? delegateConversion;
            Func<double, double>? compositionConversion;
            string fromUnit;
            string toUnit;

            switch (command)
            {
                case "1":
                    funcConversion = metersToKilometersFunc;
                    delegateConversion = metersToKilometersDel;
                    compositionConversion = metersToKilometersComp;
                    fromUnit = "m";
                    toUnit = "km";
                    break;
                case "2":
                    funcConversion = kilometersToMetersFunc;
                    delegateConversion = kilometersToMetersDel;
                    compositionConversion = kilometersToMetersComp;
                    fromUnit = "km";
                    toUnit = "m";
                    break;
                case "3":
                    funcConversion = minutesToSecondsFunc;
                    delegateConversion = minutesToSecondsDel;
                    compositionConversion = minutesToSecondsComp;
                    fromUnit = "min";
                    toUnit = "s";
                    break;
                case "4":
                    funcConversion = secondsToMinutesFunc;
                    delegateConversion = secondsToMinutesDel;
                    compositionConversion = secondsToMinutesComp;
                    fromUnit = "s";
                    toUnit = "min";
                    break;
                case "5":
                    funcConversion = metersPerSecondToKilometersPerHourFunc;
                    delegateConversion = metersPerSecondToKilometersPerHourDel;
                    compositionConversion = metersPerSecondToKilometersPerHourComp;
                    fromUnit = "m/s";
                    toUnit = "km/h";
                    break;
                case "6":
                    funcConversion = kilometersPerHourToMetersPerSecondFunc;
                    delegateConversion = kilometersPerHourToMetersPerSecondDel;
                    compositionConversion = kilometersPerHourToMetersPerSecondComp;
                    fromUnit = "km/h";
                    toUnit = "m/s";
                    break;
                case "7":
                    funcConversion = kilometersPerHourToMilesPerHourFunc;
                    delegateConversion = kilometersPerHourToMilesPerHourDel;
                    compositionConversion = kilometersPerHourToMilesPerHourComp;
                    fromUnit = "km/h";
                    toUnit = "mph";
                    break;
                default:
                    Console.WriteLine("Unknown command.\n");
                    continue;
            }

            Console.Write($"Enter a value in {fromUnit}: ");
            if (!double.TryParse(Console.ReadLine(), out double value))
            {
                Console.WriteLine("Please enter a valid number.\n");
                continue;
            }

            double funcResult = funcConversion(value);
            double delegateResult = delegateConversion(value);
            double compositionResult = compositionConversion(value);

            Console.WriteLine($"Using Func: {value} {fromUnit} = {funcResult} {toUnit}");
            Console.WriteLine($"Using delegate: {value} {fromUnit} = {delegateResult} {toUnit}");
            Console.WriteLine($"Using composition: {value} {fromUnit} = {compositionResult} {toUnit}\n");
        }
    }
}