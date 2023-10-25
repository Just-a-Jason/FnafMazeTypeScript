export abstract class TryCatchHelper {
    public static execute(func:Function, throwError:boolean = false) {
        try { func(); }
        catch(error) { if(throwError) console.error(error); }
    };
}