import { uploadFile } from "@/util/file-management";

export async function POST(request, response) {
  const file = (await request.formData()).get("file");
  const arrayBuffer = await file.arrayBuffer();
  uploadFile(arrayBuffer, file.name);

  return Response.json(
    { message: "File uploaded successfully" },
    { status: 200 }
  );
}