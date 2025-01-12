export async function GET(req:any,
    res:any) {

    const message = "Hello World";

    return Response.json({ message });
    
}