#include <iostream>
#include <conio.h>
using namespace std;

void push(string n);
int pop(string& n);

struct elem
{
    string key;
    elem* next;
} *start = NULL;

int main()
{
    string str = " World!"; // bottom
    string str2 = "Hello"; // top
    push(str);
    push(str2);
    while (pop(str)) {
        cout << str;
    }
}

void push(string n)
{
    elem* p = start;
    start = new elem;
    start->key = n;
    start->next = p;
}

int pop(string& n)
{
    if (start)
    {
        n = start->key;
        elem* p = start;
        start = start->next;
        delete p;
        return 1;
    }
    else
        return 0;
}