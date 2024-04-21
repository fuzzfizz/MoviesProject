import { getAllFiles } from "@/util/file-management";

export async function GET() {
 const data = await getAllFiles()
  
  return Response.json(data);
}
