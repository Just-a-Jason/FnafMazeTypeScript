import { GameObject } from "../Classes/GameObject";

export interface IChaser {
    target?: Nullable<GameObject>;
    maxEscapeZone: number;
    chaseSpeed?: number;
    isChaseing: boolean;
    Chase(): void;
}
