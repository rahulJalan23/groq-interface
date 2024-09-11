import { NextResponse } from 'next/server';
import PdfParse from 'pdf-parse';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log(formData);

    const file = formData.get('file') as File;
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const data = await PdfParse(buffer);

    return NextResponse.json({ text: data.text }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 'fail', error: e });
  }
}
