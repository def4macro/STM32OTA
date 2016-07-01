function Class1(opt) {
    this.showTxt = function () {
        if (opt === undefined) {
            console.log("showTxt: %s without argument.", this.name);
        } else {
            console.log("showTxt: %s with %s", this.name, opt);
        }
        
    }
}

var obj = new Object();
obj.name = "test1";
Class1.call(obj, "fuck");
obj.showTxt();
console.log("%s", obj.showTxt);

Class1.call(obj);
obj.showTxt();
console.log("%s", obj.showTxt);