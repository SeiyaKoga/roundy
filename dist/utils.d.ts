/// <reference types="react" />
import { InternalRoundyProps } from "types";
export declare const valueToAngle: (value: number, props: InternalRoundyProps) => number;
export declare const getArc: (startAngle: number, endAngle: number, props: InternalRoundyProps) => string;
export declare const getCenter: (node: import("react").MutableRefObject<HTMLDivElement>, radius: number) => {
    top: number;
    left: number;
};
export declare const limitValue: (value: number, min: number, max: number) => number;
export declare const getAngle: (y: number, x: number, rotationOffset: number) => number;
export declare const angleToValue: (angle: number, props: InternalRoundyProps) => number;
