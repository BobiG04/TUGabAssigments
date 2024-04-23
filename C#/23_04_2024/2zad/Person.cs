using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2zad
{
	public class Person
	{

		protected string name;
		protected string idNumb;
		protected string idCardNumb;

		public Person()
		{
			name = "";
			idNumb = "";
			idCardNumb = "";
		}

		public Person(string n, string iN, string iCN)
		{
			this.name = n;
			this.idNumb = iN;
			this.idCardNumb = iCN;
		}

		public void Input()
		{
			name = Console.ReadLine();
			idNumb = Console.ReadLine();
			idCardNumb = Console.ReadLine();
		}

		public string Output()
		{
			return String.Join(" ", name, idNumb, idCardNumb);
		}

	}
}
