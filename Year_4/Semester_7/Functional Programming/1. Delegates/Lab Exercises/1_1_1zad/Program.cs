namespace _1_1_1zad
{

    class Program
    {
        static void Main(string[] args)
        {
            PointDelegate myPoint = new PointDelegate(2.0, 3.0);

            Console.WriteLine("Starting state:");
            myPoint.Print();

            Transform2D delegateTranslate = myPoint.Translate;
            Transform2D delegateScale = myPoint.Scale;
            Quaternion delegateRotate = myPoint.Rotate;

            delegateTranslate(3.0, 2.0);
            myPoint.Print();

            delegateScale(2.0, 2.0);
            myPoint.Print();

            delegateRotate(90);
            myPoint.Print();

            Transform2D multiTransform = delegateTranslate + delegateScale;

            multiTransform(1.0, 1.0);
            myPoint.Print();
        }
    }
}