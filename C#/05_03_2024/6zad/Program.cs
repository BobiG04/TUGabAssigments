using System;

namespace _6zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Console.Write("Enter the number of elements in the array: ");
			int n = int.Parse(Console.ReadLine());

			int[] arr = new int[n];

			int[] lis = new int[n];
			int[] prevIndex = new int[n];
			int maxLength = 1;
			int lastIndex = 0;
			int[] resultArray = new int[maxLength];
			int currentIndex = lastIndex;

			for (int i = 0; i < n; i++)
			{
				Console.Write((i + 1) + ": ");
				arr[i] = int.Parse(Console.ReadLine());
			}

			for (int i = 0; i < n; i++)
			{
				lis[i] = 1;
				prevIndex[i] = -1;
			}

			for (int i = 1; i < n; i++)
			{
				for (int j = 0; j < i; j++)
				{
					if (arr[i] > arr[j] && lis[i] < lis[j] + 1)
					{
						lis[i] = lis[j] + 1;
						prevIndex[i] = j;
					}
				}

				if (lis[i] > maxLength)
				{
					maxLength = lis[i];
					lastIndex = i;
				}
			}

			for (int i = maxLength - 1; i >= 0; i--)
			{
				resultArray[i] = arr[currentIndex];
				currentIndex = prevIndex[currentIndex];
			}

			Console.Write("The maximum increasing subsequence is: ");
			for (int i = 0; i < maxLength; i++)
			{
				Console.Write(resultArray[i] + " ");
			}
		}
	}
}
