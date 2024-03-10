namespace _5zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Console.Write("Enter the number of elements in the array: ");
			int n = int.Parse(Console.ReadLine());
			int maxLength = 1;
			int currentLength = 1;
			int endIndex = 0;
			int[] finalNumbers = new int[maxLength];

			int[] numbersArray = new int[n];

			for (int i = 0; i < n; i++)
			{
				Console.Write((i + 1) + ": ");
				numbersArray[i] = int.Parse(Console.ReadLine());
			}

			for (int i = 1; i < n; i++)
			{
				if (numbersArray[i] > numbersArray[i - 1])
				{
					currentLength++;

					if (currentLength > maxLength)
					{
						maxLength = currentLength;
						endIndex = i;
					}
				}
				else
				{
					currentLength = 1;
				}
			}

			for (int i = 0; i < maxLength; i++)
			{
				finalNumbers[i] = numbersArray[endIndex - maxLength + 1 + i];
			}

			Console.Write("The maximum sequence of consecutive increasing elements is:");
			for (int i = 0; i < maxLength; i++)
			{
				Console.Write(finalNumbers[i]);
			}

		}
	}
}
