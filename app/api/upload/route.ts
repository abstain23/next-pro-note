import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { stat, mkdir, writeFile } from "fs/promises";
import { join, extname } from "path";
import { addNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("e", e);
      return NextResponse.json(
        { error: "Error creating upload directory" },
        { status: 500 },
      );
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${fileName}-${uniqueSuffix}${extname(file.name)}`;
    console.log("uniqueFilename", uniqueFilename);
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    const res = await addNote(
      JSON.stringify({
        title: fileName,
        content: buffer.toString("utf-8"),
      }),
    );

    revalidatePath("/", "layout");
    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
