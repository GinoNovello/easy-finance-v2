 
import { revalidateTag } from 'next/cache'
 
export async function GET() {
  revalidateTag('transaccion')

  return Response.json({revalidated: true})
}