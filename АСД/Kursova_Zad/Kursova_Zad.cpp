#include <iostream>
#include <chrono>
using namespace std;
using namespace std::chrono;

// Последователно търсене
int SequenceSearch(int arr[], int key, int n)
{
    int i = 0;
    while ((arr[i] != key) && (i < n)) i++;

    if (arr[i] == key) return 1; // Намерен е елемента
    else return 0; // Не е намерен елемента
}

// Търсене на елемент чрез стъпка
int StepSearch(int arr[], int n, int key, int step) {

    int i, leftBorder, rightBorder;

    for (i = 0; i < n && arr[i] < key; i += step);

    if (i < step)
        leftBorder = 0;
    else
        leftBorder = i + 1 - step;

    if (n < i)
        rightBorder = n - 1;
    else
        rightBorder = i;

    // Функция за последователно търсене
    return SequenceSearch(arr,key,n);
}

// Интерполационно търсене на елемент
int InterSearch(int arr[], int key, int n) {
    
    unsigned leftBorder = 0, rightBorder = n - 1 , m;
    float k;

    while (leftBorder <= rightBorder)
    {
        if (arr[rightBorder] == arr[leftBorder])
            if (arr[leftBorder] == key)
                return leftBorder; // Елементът е намерен
            else
                return 0; // Елементът не е намерен
        k = (float)(key - arr[leftBorder]) / (arr[rightBorder] - arr[leftBorder]);
        if (k < 0 || k>1)
            return 0; m = (unsigned)(leftBorder + k * (rightBorder - leftBorder) + 0.5);
        if (key > arr[m])
            rightBorder = m - 1;
        else if (key > arr[m])
            leftBorder = m + 1;
        else return m;
    }

    return 0;
}

// Функция за сортиране
void SelectionSort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        int min = i;

        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[min])
                min = j;
        }

        if (min != i)
            swap(arr[i], arr[min]);
    }
}

int main()
{
    int arrSize;
    cout << "Enter the size of the array: " << endl;
    cin >> arrSize;

    // Елементи
    int* arr = new int [arrSize];

    // Променливи и Размер на масива
    int stepOfSearch, keyToSearch;

    // Генериране на произволни елементи от  0 до 1000
    for (int i = 0; i < arrSize; i++) {
        arr[i] = rand() % 101;
    }

    // Сортиране
    SelectionSort(arr, arrSize);

    // Принтиране на масива
    cout << endl << "Array elements: " << endl;
    for (int i = 0; i < arrSize; i++)
    {
        cout << arr[i] << " ";
    }

    // Въвеждаме стъпката на търсене
    cout << endl << endl << "Enter the step of which the algorithm will be searching: " << endl;
    cin >> stepOfSearch;

    // Въвеждаме елемента, който търсим
    cout << endl << "Now enter the value we need to search." << endl;
    cin >> keyToSearch;

    // Проследява за колко време ще завърши търсенето
    auto start1 = high_resolution_clock::now();
    int pos1 = StepSearch(arr, arrSize, keyToSearch, stepOfSearch);
    auto stop1 = high_resolution_clock::now();
    auto duration1 = duration_cast<nanoseconds>(stop1 - start1);

    auto start2 = high_resolution_clock::now();
    int pos2 = InterSearch(arr, keyToSearch, arrSize);
    auto stop2 = high_resolution_clock::now();
    auto duration2 = duration_cast<nanoseconds>(stop2 - start2);

    //-------------------------------------------------------

    cout << endl << "Time for finding the element with a step search: " << duration1.count() << " nanoseconds." << endl;
    cout << endl << "Time for finding the element with an interpolation search: " << duration2.count() << " nanoseconds." << endl;

    // Интерполационното търсене е по-бързо, защото извършва по-малко сравнения (Log\/2(Log\/2n) + 1), както при 
    // съвпадение, така и при несъответсвие на търсения елемент, докато при търсенето със стъпка, там ще 
    // трябва да премине през няколко сравнения, което е по-бавно ().
}