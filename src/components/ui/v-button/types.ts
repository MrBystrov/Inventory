export type TButtonColor =  'red' | 'blue' | 'green' | 'white' | 'transparent' ;

export interface IButtonProps {
    color?: TButtonColor,
    loading?: boolean,
    textSize?: number
}

export const defaultProps = {
  color: 'green' as TButtonColor,
  textSize: 16
};