import { getFile } from "@/util/file-management";


export async function GET(request) {

  const filename = request.nextUrl.searchParams.get("filename") || "";
  const file = filename ? await getFile(filename) : null;
  const base64 = file.toString("base64");
  return Response.json(
    {base64:base64,filename:filename} 

  );
} 