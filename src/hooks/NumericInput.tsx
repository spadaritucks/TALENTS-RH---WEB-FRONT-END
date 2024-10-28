'use client'

import { ChangeEvent } from "react";


export default function useNumericInput(e: ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, '');
}