using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2zad
{
	public class Student : Person
	{

		protected string speciality;
		protected string group;
		protected string facNumber;

		public Student() {
			speciality = "";
			group = "";
			facNumber = "";
		}

		public Student(string n, string iN, string iCN, string s, string g, string fN) : base(n, iN, iCN)
		{
			this.speciality = s;
			this.group = g;
			this.facNumber = fN;
		}

		public void InputSt()
		{
			speciality = Console.ReadLine();
			group = Console.ReadLine();
			facNumber = Console.ReadLine();
		}

		public string OutputSt()
		{
			return String.Join(" ", speciality, group, facNumber);
		}
	}
}
