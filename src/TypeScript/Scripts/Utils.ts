export function Clamp(value:number, min:number, max:number): number {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}

export function RandInt(max:number):number;
export function RandInt(min:number,max:number):number;
export function RandInt(a?:number,b?:number):number {
    if (a) return Math.floor(Math.random()*a);
    return Math.floor(Math.random() * (a! - b! + 1)) + b!;
}