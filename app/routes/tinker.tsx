import { type FileUpload, parseFormData } from '@mjackson/form-data-parser';
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { fileStorage } from "~/filestorage.server";

export async function loader() {
    return json({ ok: true });
}

export async function action({ request }: ActionFunctionArgs) {
    const uploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === 'my-file') {
            const storageKey = `user-avatar`;
            await fileStorage.set(storageKey, fileUpload);
            return fileStorage.get(storageKey);
        }
    }
    const formData = await parseFormData(request, uploadHandler)
    const file = formData.get('my-file')
    console.log({ file });

    // file has been processed
    return json({ ok: true })
}

export default function Tinker() {
    return <Form method='post' encType='multipart/form-data'>
        <input type='file' name='my-file' />
        <button>Submit</button>
    </Form>
}