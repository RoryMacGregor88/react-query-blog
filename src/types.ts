import { Dispatch, SetStateAction } from 'react'

export type WellData = { isError: boolean; message: string } | null;

export type SetWellData = Dispatch<SetStateAction<WellData>>