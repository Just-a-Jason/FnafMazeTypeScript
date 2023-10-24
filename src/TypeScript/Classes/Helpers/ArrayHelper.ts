export abstract class ArrayHelper {
    public static copy(array:Array<any>):Array<any> {
        const arr = new Array();

        for(const element of array) 
            arr.push(element);

        return arr;
    }
}