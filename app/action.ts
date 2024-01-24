'use server'

import { redirect } from 'next/navigation'
import {addNote, updateNote, delNote} from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import {z} from "zod";
import {sleep} from "@/lib/utils";


export type FormSate = {
    message: string
    errors?: z.ZodIssue[]
}

const schema = z.object({
    title: z.string().min(1, { message: '标题不能为空' }),
    content: z.string().min(1, { message: '内容不能为空' }).max(100, { message: '内容不能超过1000个字符' })
})

export async function saveNote(prevState: FormSate, formData: FormData) {

    const noteId = formData.get('noteId') as string

    const data ={
        title: formData.get('title'),
        content: formData.get('body'),
        updateTime: new Date()
    }

    const validated = schema.safeParse(data)
    if(!validated.success) {
        return {
            message: '',
            errors: validated.error.issues
        }
    }

    // 为了让效果更明显
    await sleep(2000)

    if (noteId) {
        updateNote(noteId, JSON.stringify(data))
        revalidatePath('/', 'layout')
    } else {
        const res = await addNote(JSON.stringify(data))
        revalidatePath('/', 'layout')
    }
    return { message: `Add Success!` }
}

export async function deleteNote(prevState: FormSate, formData: FormData) {
    const noteId = formData.get('noteId') as string
    delNote(noteId)
    revalidatePath('/', 'layout')
    redirect('/')

    return { message: `Delete Success!`}
}