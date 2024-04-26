import { updateFile } from "@/util/file-management";

export async function PUT(request) {
    let body = await request.json();
    console.log(body);

    body.map(async (filename, index) => {
        await updateFile(filename, index);
    })
    return Response.json(
        { message: "File uploaded successfully" },
        { status: 200 }
    );
}


