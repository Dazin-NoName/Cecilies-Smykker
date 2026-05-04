import { NextResponse } from "next/server";
import { uploadToImgbb } from "@/lib/imgbb";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Upload kræver en fil med feltet 'file'." }, { status: 400 });
    }

    const upload = await uploadToImgbb(file);
    return NextResponse.json({ url: upload.data.url, displayUrl: upload.data.display_url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Billedet kunne ikke uploades.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
