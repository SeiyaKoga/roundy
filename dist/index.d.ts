import * as React from 'react';
import { InternalRoundyProps } from 'types';
interface StateType {
    value: number;
    angle: number;
}
export declare type MainRoundyProps = Partial<InternalRoundyProps> & {
    render?: (state: StateType, props: InternalRoundyProps) => React.ReactNode;
    onAfterChange?: (state: any, props: any) => void;
    onChange?: (state: any, props: any) => void;
    style?: any;
    allowClick?: boolean;
};
declare function Roundy(optProps: MainRoundyProps): JSX.Element;
export default Roundy;
