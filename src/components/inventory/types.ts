export type TColor = 'red' | 'yellow' | 'blue' | 'green'

export type TCell = {
    item: string | null;
    quantity?: number;
    color?: TColor;
    id?: string;
}

export interface IInventory {
    cells: TCell[] 
}