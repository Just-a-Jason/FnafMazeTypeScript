export function Clamp(value:number, min:number, max:number): number {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}

export function RandInt(max:number):number {
    return Math.floor(Math.random()*max);
}