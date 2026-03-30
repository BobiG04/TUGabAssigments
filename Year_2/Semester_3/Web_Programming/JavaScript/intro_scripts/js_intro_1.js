Sum([20, 30, 40]);
console.log("\n");
SUM([20, 30, 40],[10, 17, 22, 33, 40],[11, 58, 69]);

function Sum(str) {
    let a = Number(str[0]);
    let b = str[str.length-1];
    let result = a + b;
    console.log(result);
}

function SUM(str1, str2, str3) {
    let arr=[];
    let array = arr.concat(str1,str2,str3);
    // let num = array.length;
    // console.log(num);
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 20 || array[i] === 22 || array[i] === 69) {
            array.splice(i,1);
        } else {
            console.log(array[i]);
        }
    }
    // console.log(num);
}