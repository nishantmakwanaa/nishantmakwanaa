#include<iostream>

using namespace std;

int main() {

    int x = 10;
    cout << x << endl; //VALUE OF X
    cout << &x << endl; //ADRESS OF X

    int* p = &x;
    cout << p << endl; //ADRESS OF X
    cout << *p << endl; //VALUE OF X

    int& r = x;
    cout << r <<endl; //ALIES TO X

    

}