var arr = [1, 2, 2, 3, 4, 4, 5];
var nArr = arr.filter(function (v, i) {
	return arr.indexOf(v)==i; 
});
console.log(nArr);