import { deleteFile } from "@/util/file-management";

export async function DELETE(request) {
    const filename = request.nextUrl.searchParams.get("name") || null;

    await deleteFile(filename);

    return Response.json(
        { message: "File uploaded successfully" },
        { status: 200 }
    );
}


// export async function DELETE(request) {
//     const filename = request.nextUrl.searchParams.get("name") || null;
//     console.log(filename);
//     try {
//         const del_img = await deleteFile(filename);
//         return Response.json(del_img);
//     } catch (error) {
//         return Response.error("Error deleting file: " + error.message, { status: 500 });
//     }
// }
