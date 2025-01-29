import type { TCell } from "@/components/inventory/types";

export type TSize = 's'| 'm' | 'l' | 'xl'

export interface ICellProps {
    cell: TCell;
    size: TSize;
    detailed?: boolean
}