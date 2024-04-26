import { deleteFile } from "@/util/file-management";

export async function DELETE(request) {
    const filename = request.nextUrl.searchParams.get("name") || null;

    await deleteFile(filename);

    return Response.json(
        { message: "File uploaded successfully" },
        { status: 200 }
    );
}



