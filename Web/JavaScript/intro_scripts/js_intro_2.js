function CreateArray(n, arr) {
    let PrintArray = [];
    let Arr = [];
    for (let i = 0; i < n; i++) {
        PrintArray[i] = Number(arr[i]);
        //console.log(PrintArray[i]);
    }
    for (let j = n; j >= 0; j--) {
        Arr[j] = Number(PrintArray[j]);
        //console.log(Arr[j]);
    }
    for (let k = 0; k < n; k++) {
        console.log(Arr[k]);
    }
}

CreateArray(3,[10,20,30,40,50]);
console.log("\n");
CreateArray(4,[-1,20,99,5]);
console.log("\n");
CreateArray(2,[66,43,75,89,47]);